import { useState, useEffect } from "react";
import { Search, Loader2, Zap } from "lucide-react";
import { User } from "@/data/users";
import { Post } from "@/data/posts";
import { Influencer, ApiPost } from "@/types/api";
import { searchInfluencers, getAccountPosts, crawlInfluencer } from "@/services/api";
import { UserCard } from "@/components/UserCard";
import { UserProfile } from "@/components/UserProfile";
import { PostDetail } from "@/components/PostDetail";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type View = "users" | "profile" | "post";

const URL_SOURCE = import.meta.env.VITE_URL_SOURCE || "http://localhost:3001/public/";

interface UserWithAccount extends User {
  socialAccountId?: string;
  username: string;
}

// Convert API Influencer to User format
const mapInfluencerToUser = (influencer: Influencer): UserWithAccount => {
  const primaryAccount = influencer.accounts[0];
  return {
    id: influencer.id,
    name: influencer.name,
    username: primaryAccount?.username || influencer.name.toLowerCase().replace(/\s/g, ""),
    avatar: primaryAccount?.avatar || "https://pbs.twimg.com/profile_images/1908645510853844992/Kr7fu9HW_200x200.jpg",
    bio: primaryAccount?.bio || "",
    followers: parseInt(primaryAccount?.followersCount || "0"),
    following: parseInt(primaryAccount?.followingCount || "0"),
    socialAccountId: primaryAccount?.id,
  };
};

// Convert API Post to local Post format
const mapApiPostToPost = (apiPost: ApiPost, userId: string): Post => {
  const hasVideo = apiPost.filePath && apiPost.isDownloaded;

  return {
    id: apiPost.id,
    userId: userId,
    title: apiPost.title.slice(0, 100) + (apiPost.title.length > 100 ? "..." : ""),
    excerpt: apiPost.title.slice(0, 150) + (apiPost.title.length > 150 ? "..." : ""),
    content: apiPost.title,
    createdAt: apiPost.postedAt,
    media: hasVideo ? {
      type: "video",
      url: `${URL_SOURCE}/${apiPost.filePath.replace(/^public[\\/]/, '')}`,
    } : undefined,
  };
};

const Index = () => {
  const [view, setView] = useState<View>("users");
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserWithAccount | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchResults, setSearchResults] = useState<UserWithAccount[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch all influencers on initial load
  useEffect(() => {
    const fetchInitialInfluencers = async () => {
      setIsLoading(true);
      try {
        const response = await searchInfluencers("");
        const users = response.data.map(mapInfluencerToUser);
        setSearchResults(users);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch influencers:", err);
        setSearchResults([]);
        setError("Không thể kết nối đến server. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialInfluencers();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await searchInfluencers(username);
      const users = response.data.map(mapInfluencerToUser);
      setSearchResults(users);
      setError(null);
      setView("users");
    } catch (err) {
      console.error("Search failed:", err);
      setError("Không thể tìm kiếm. Vui lòng thử lại sau.");
      setSearchResults([]);
      setView("users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserClick = async (user: UserWithAccount) => {
    setSelectedUser(user);
    setView("profile");
    setIsLoadingPosts(true);
    setHasMore(true);

    try {
      if (user.socialAccountId) {
        const response = await getAccountPosts(user.socialAccountId, 1, 10);
        const posts = response.data.map(p => mapApiPostToPost(p, user.id));
        if (posts.length < 10) {
          setHasMore(false);
        }
        setUserPosts(posts);
        setTotalPosts(response.meta?.totalItems);
      } else {
        setUserPosts([]);
        setTotalPosts(0);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setUserPosts([]);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const handleLoadMore = async (page: number) => {
    if (!selectedUser?.socialAccountId || isLoadingPosts || !hasMore) return;

    setIsLoadingPosts(true);
    try {
      const response = await getAccountPosts(selectedUser.socialAccountId, page, 10);
      const newPosts = response.data.map(p => mapApiPostToPost(p, selectedUser.id));

      // Append new posts to existing ones
      if (newPosts.length < 10) {
        setHasMore(false);
      }
      setUserPosts(prevPosts => [...prevPosts, ...newPosts]);
    } catch (err) {
      console.error("Failed to load more posts:", err);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const handleCrawl = async (count: number) => {
    if (!selectedUser) return;

    setIsCrawling(true);
    try {
      await crawlInfluencer(selectedUser.username, count);
      toast({
        title: "Crawl started!",
        description: `Fetching latest posts for @${selectedUser.username}. This may take a moment.`,
      });

      // Refetch posts after a delay
      setTimeout(async () => {
        if (selectedUser.socialAccountId) {
          try {
            const response = await getAccountPosts(selectedUser.socialAccountId);
            const posts = response.data.map(p => mapApiPostToPost(p, selectedUser.id));
            setUserPosts(posts);
          } catch (err) {
            console.error("Failed to refetch posts:", err);
          }
        }
        setIsCrawling(false);
      }, 5000);
    } catch (err) {
      console.error("Crawl failed:", err);
      toast({
        title: "Crawl failed",
        description: "Could not fetch posts. Please try again later.",
        variant: "destructive",
      });
      setIsCrawling(false);
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setView("post");
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
    setUserPosts([]);
    setView("users");
  };

  const handleBackToProfile = () => {
    setSelectedPost(null);
    setView("profile");
  };

  const handleBackToHome = () => {
    setView("users");
    setUsername("");
    setSelectedUser(null);
    setSelectedPost(null);
    setSearchResults([]);
    setUserPosts([]);
    setError(null);
  };

  const getUserIndex = (userId: string) => {
    return searchResults.findIndex(u => u.id === userId);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/30 glass">
        <div className="container py-4">
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2.5 text-foreground hover:text-primary transition-colors group"
          >
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-accent group-hover:shadow-glow transition-shadow">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">Pulse</span>
          </button>
        </div>
      </header>

      <main className="container py-8">
        {/* Users List View */}
        {view === "users" && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Discover <span className="gradient-text">Influencers</span>
              </h1>
              <p className="text-muted-foreground">
                Search and explore top social media creators
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
                <Input
                  type="text"
                  placeholder="Search by name..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className={cn(
                    "h-12 pl-12 pr-28 rounded-xl",
                    "glass border-border/50",
                    "focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
                    "placeholder:text-muted-foreground/50"
                  )}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2",
                    "h-8 px-4 rounded-lg",
                    "bg-gradient-to-r from-primary to-accent",
                    "hover:opacity-90 text-white font-medium"
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </form>

            {/* Results Header */}
            {searchResults.length > 0 && !error && (
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {username.trim() ? `Results for "${username}"` : "All Influencers"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {searchResults.length} {searchResults.length === 1 ? "creator" : "creators"} found
                  </p>
                </div>
              </div>
            )}

            {/* Results Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Đang tải...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-destructive/50" />
                </div>
                <p className="text-destructive font-medium mb-2">{error}</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-20">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground">Không tìm thấy influencer nào</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {searchResults.map((user, index) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onClick={() => handleUserClick(user)}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* User Profile View */}
        {view === "profile" && selectedUser && (
          <div>
            {isLoadingPosts && userPosts.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading posts...</span>
              </div>
            ) : (
              <UserProfile
                user={selectedUser}
                posts={userPosts}
                onBack={handleBackToUsers}
                onPostClick={handlePostClick}
                userIndex={getUserIndex(selectedUser.id)}
                onCrawl={handleCrawl}
                isCrawling={isCrawling}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                isLoadingMore={isLoadingPosts}
                totalPosts={totalPosts}
              />
            )}
          </div>
        )}

        {/* Post Detail View */}
        {view === "post" && selectedPost && selectedUser && (
          <PostDetail
            post={selectedPost}
            author={selectedUser}
            onBack={handleBackToProfile}
            authorIndex={getUserIndex(selectedUser.id)}
          />
        )}
      </main>
    </div>
  );
};

export default Index;