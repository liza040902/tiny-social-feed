import { useState, useEffect } from "react";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { users as mockUsers, User } from "@/data/users";
import { posts as mockPosts, Post } from "@/data/posts";
import { Influencer, ApiPost } from "@/types/api";
import { searchInfluencers, getAccountPosts } from "@/services/api";
import { UserCard } from "@/components/UserCard";
import { UserProfile } from "@/components/UserProfile";
import { PostDetail } from "@/components/PostDetail";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type View = "users" | "profile" | "post";

const URL_SOURCE = import.meta.env.VITE_URL_SOURCE || "http://localhost:3001/public/";


interface UserWithAccount extends User {
  socialAccountId?: string;
}

// Convert API Influencer to User format
const mapInfluencerToUser = (influencer: Influencer): UserWithAccount => {
  const primaryAccount = influencer.accounts[0];
  return {
    id: influencer.id,
    name: influencer.name,
    username: primaryAccount?.username || influencer.name.toLowerCase().replace(/\s/g, ""),
    avatar: influencer.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(),
    bio: primaryAccount?.bio || "",
    followers: parseInt(primaryAccount?.followersCount || "0"),
    following: parseInt(primaryAccount?.followingCount || "0"),
    socialAccountId: primaryAccount?.id,
  };
};

// Convert API Post to local Post format
const mapApiPostToPost = (apiPost: ApiPost, userId: string): Post => {
  // Check if there's a video file available
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
      url: `${URL_SOURCE}/${apiPost.filePath.replace(/^public[\\/]/, '')}`, // Files in public folder
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all influencers on initial load
  useEffect(() => {
    const fetchInitialInfluencers = async () => {
      setIsLoading(true);
      try {
        const response = await searchInfluencers("");
        const users = response.data.map(mapInfluencerToUser);
        setSearchResults(users);
      } catch (err) {
        console.error("Failed to fetch influencers:", err);
        setSearchResults(mockUsers);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialInfluencers();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Allow empty search to get all influencers

    setIsLoading(true);
    setError(null);

    try {
      const response = await searchInfluencers(username);
      const users = response.data.map(mapInfluencerToUser);
      setSearchResults(users);
      setView("users");
    } catch (err) {
      console.error("Search failed:", err);
      setError("Failed to search. Using mock data instead.");
      setSearchResults(mockUsers);
      setView("users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserClick = async (user: UserWithAccount) => {
    setSelectedUser(user);
    setView("profile");
    setIsLoadingPosts(true);

    try {
      if (user.socialAccountId) {
        const response = await getAccountPosts(user.socialAccountId);
        const posts = response.data.map(p => mapApiPostToPost(p, user.id));
        setUserPosts(posts);
      } else {
        // Fallback to mock posts
        setUserPosts(mockPosts.slice(0, 5));
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setUserPosts(mockPosts.slice(0, 5));
    } finally {
      setIsLoadingPosts(false);
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container py-4">
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-lg font-serif font-medium italic">Pulse</span>
          </button>
        </div>
      </header>

      <main className="container py-8">
        {/* Users List View */}
        {view === "users" && (
          <div className="animate-fade-in">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
                <Input
                  type="text"
                  placeholder="Search influencers..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className={cn(
                    "h-12 pl-12 pr-12 rounded-xl",
                    "bg-card border-border/50 shadow-soft",
                    "focus:shadow-card focus:border-primary/30",
                    "placeholder:text-muted-foreground/60"
                  )}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2",
                    "h-8 px-4 rounded-lg",
                    "bg-primary hover:bg-primary/90 text-primary-foreground"
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

            {/* Results */}
            {searchResults.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-medium text-foreground">
                  {error ? "Featured voices" : username.trim() ? `Results for "${username}"` : "All influencers"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found
                </p>
                {error && (
                  <p className="text-sm text-destructive mt-1">{error}</p>
                )}
              </div>
            )}

            {searchResults.length === 0 && !isLoading ? (
              <div className="text-center py-16 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>No influencers found</p>
              </div>
            ) : isLoading && searchResults.length === 0 ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading influencers...</span>
              </div>
            ) : (
              <div className="space-y-3">
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
            {isLoadingPosts ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading posts...</span>
              </div>
            ) : (
              <UserProfile
                user={selectedUser}
                posts={userPosts}
                onBack={handleBackToUsers}
                onPostClick={handlePostClick}
                userIndex={getUserIndex(selectedUser.id)}
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
