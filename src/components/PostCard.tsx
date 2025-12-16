import { Post } from "@/data/posts";
import { cn } from "@/lib/utils";
import { Calendar, Image, Play } from "lucide-react";

interface PostCardProps {
  post: Post;
  onClick: () => void;
  index: number;
}

export function PostCard({ post, onClick, index }: PostCardProps) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-lg bg-card overflow-hidden shadow-soft",
        "transition-all duration-300 ease-out",
        "hover:shadow-hover hover:-translate-y-0.5",
        "animate-fade-in border border-border/50"
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Media preview */}
      {post.media && (
        <div className="relative aspect-video overflow-hidden bg-muted">
          {post.media.type === "image" ? (
            <img
              src={post.media.url}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="relative h-full w-full">
              {post.media.thumbnail ? (
                <img
                  src={post.media.thumbnail}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-muted to-secondary" />
              )}
              {/* Video play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>
          )}

          {/* Media type badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-foreground/70 px-2 py-1 text-xs text-background">
            {post.media.type === "image" ? (
              <Image className="h-3 w-3" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            <span className="capitalize">{post.media.type}</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>
    </article>
  );
}
