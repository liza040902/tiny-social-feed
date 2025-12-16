import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { users, User } from "@/data/users";
import { posts, Post } from "@/data/posts";
import { UserCard } from "@/components/UserCard";
import { UserProfile } from "@/components/UserProfile";
import { PostDetail } from "@/components/PostDetail";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type View = "home" | "users" | "profile" | "post";

const Index = () => {
  const [view, setView] = useState<View>("home");
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setView("users");
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setView("profile");
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setView("post");
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
    setView("users");
  };

  const handleBackToProfile = () => {
    setSelectedPost(null);
    setView("profile");
  };

  const handleBackToHome = () => {
    setView("home");
    setUsername("");
    setSelectedUser(null);
    setSelectedPost(null);
  };

  const getUserPosts = (userId: string) => {
    return posts.filter(post => post.userId === userId);
  };

  const getUserIndex = (userId: string) => {
    return users.findIndex(u => u.id === userId);
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
        {/* Home View */}
        {view === "home" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-serif italic text-foreground mb-3">
                Discover voices
              </h1>
              <p className="text-muted-foreground max-w-md">
                Explore posts from thought leaders and influential voices
              </p>
            </div>

            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter username to explore..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={cn(
                    "h-12 pl-4 pr-12 rounded-full",
                    "bg-card border-border/50 shadow-soft",
                    "focus:shadow-card focus:border-primary/30",
                    "placeholder:text-muted-foreground/60"
                  )}
                />
                <Button
                  type="submit"
                  size="icon"
                  className={cn(
                    "absolute right-1.5 top-1/2 -translate-y-1/2",
                    "h-9 w-9 rounded-full",
                    "bg-primary hover:bg-primary/90 text-primary-foreground"
                  )}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <p className="mt-6 text-xs text-muted-foreground">
              Try any username to discover featured voices
            </p>
          </div>
        )}

        {/* Users List View */}
        {view === "users" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl font-serif italic text-foreground">Featured voices</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {users.length} thought leaders to follow
              </p>
            </div>

            <div className="space-y-3">
              {users.map((user, index) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onClick={() => handleUserClick(user)}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* User Profile View */}
        {view === "profile" && selectedUser && (
          <UserProfile
            user={selectedUser}
            posts={getUserPosts(selectedUser.id)}
            onBack={handleBackToUsers}
            onPostClick={handlePostClick}
            userIndex={getUserIndex(selectedUser.id)}
          />
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
