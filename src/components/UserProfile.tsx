import { User } from "@/data/users";
import { Post } from "@/data/posts";
import { PostCard } from "./PostCard";
import { cn } from "@/lib/utils";
import { ArrowLeft, Download, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

const gradients = [
  "from-violet-500 to-purple-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
];

interface UserProfileProps {
  user: User & { username: string };
  posts: Post[];
  onBack: () => void;
  onPostClick: (post: Post) => void;
  userIndex: number;
  onCrawl?: () => void;
  isCrawling?: boolean;
}

export function UserProfile({ 
  user, 
  posts, 
  onBack, 
  onPostClick, 
  userIndex,
  onCrawl,
  isCrawling 
}: UserProfileProps) {
  return (
    <div className="animate-fade-in">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back
      </Button>

      {/* Profile header */}
      <header className="mb-8">
        <div className="flex items-start gap-5">
          <div
            className={cn(
              "relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl",
              "bg-gradient-to-br text-xl font-bold text-white",
              "ring-2 ring-white/10 ring-offset-4 ring-offset-background",
              "shadow-glow",
              gradients[userIndex % gradients.length]
            )}
          >
            {user.avatar}
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            {user.bio && (
              <p className="mt-3 text-sm text-secondary-foreground/80 leading-relaxed">{user.bio}</p>
            )}
          </div>
        </div>
      </header>

      {/* Separate posts by type */}
      {(() => {
        const videoPosts = posts.filter(p => p.media?.type === "video");
        const otherPosts = posts.filter(p => p.media?.type !== "video");
        
        return (
          <>
            {/* Video Posts Section */}
            {videoPosts.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-foreground">Videos</h2>
                  <span className="text-sm text-muted-foreground">{videoPosts.length} videos</span>
                </div>
                <div className="space-y-3">
                  {videoPosts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onClick={() => onPostClick(post)}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Other Posts Section */}
            {otherPosts.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-foreground">Posts</h2>
                  <span className="text-sm text-muted-foreground">{otherPosts.length} posts</span>
                </div>
                <div className="space-y-3">
                  {otherPosts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onClick={() => onPostClick(post)}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Empty state */}
            {posts.length === 0 && (
              <section>
                <div className="glass rounded-xl p-8 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                    Want to discover more about this influencer? We can fetch their latest content for you.
                  </p>
                  {onCrawl && (
                    <Button
                      onClick={onCrawl}
                      disabled={isCrawling}
                      className={cn(
                        "bg-gradient-to-r from-primary to-accent",
                        "hover:opacity-90 text-white font-medium",
                        "shadow-glow"
                      )}
                    >
                      {isCrawling ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Fetching content...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Fetch Latest Posts
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </section>
            )}
          </>
        );
      })()}
    </div>
  );
}