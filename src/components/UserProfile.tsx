import { User } from "@/data/users";
import { Post } from "@/data/posts";
import { PostCard } from "./PostCard";
import { cn } from "@/lib/utils";
import { ArrowLeft, Download, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

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
  onLoadMore?: (page: number) => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

export function UserProfile({
  user,
  posts,
  onBack,
  onPostClick,
  userIndex,
  onCrawl,
  isCrawling,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false
}: UserProfileProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Setup Intersection Observer for infinite scroll
  useEffect(() => {
    if (!onLoadMore || !hasMore || isLoadingMore) return;

    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoadingMore) {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        onLoadMore(nextPage);
      }
    }, options);

    const currentTrigger = loadMoreTriggerRef.current;
    if (currentTrigger) {
      observerRef.current.observe(currentTrigger);
    }

    return () => {
      if (observerRef.current && currentTrigger) {
        observerRef.current.unobserve(currentTrigger);
      }
    };
  }, [onLoadMore, hasMore, isLoadingMore, currentPage]);

  // Reset page when user changes
  useEffect(() => {
    setCurrentPage(1);
  }, [user.id]);

  return (
    <div className="animate-fade-in" ref={scrollContainerRef}>
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
              "relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full",
              "bg-gradient-to-br text-xl font-bold text-white",
              "ring-2 ring-white/10 ring-offset-4 ring-offset-background",
              "shadow-glow",
              gradients[userIndex % gradients.length]
            )}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="h-full w-full rounded-full object-cover"
            />
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

      {/* Posts section */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-foreground">Posts</h2>
          <span className="text-sm text-muted-foreground">{posts.length} posts</span>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="space-y-3">
              {posts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={() => onPostClick(post)}
                  index={index}
                />
              ))}
            </div>

            {/* Load more trigger */}
            {hasMore && (
              <div ref={loadMoreTriggerRef} className="py-8 flex justify-center">
                {isLoadingMore && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading more posts...</span>
                  </div>
                )}
              </div>
            )}

            {/* End of posts message */}
            {!hasMore && posts.length > 5 && (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  You've reached the end of the posts
                </p>
              </div>
            )}
          </>
        ) : (
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
        )}
      </section>
    </div>
  );
}