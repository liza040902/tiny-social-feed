import { Post } from "@/data/posts";
import { cn } from "@/lib/utils";
import { Calendar, Play, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface PostCardProps {
  post: Post;
  onClick: () => void;
  index: number;
}

export function PostCard({ post, onClick, index }: PostCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // IntersectionObserver to detect when card is in view
  useEffect(() => {
    if (!cardRef.current || post.media?.type !== "video") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [post.media?.type]);

  // Auto-play/pause video based on visibility
  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <article
      ref={cardRef}
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-xl overflow-hidden",
        "glass hover-lift",
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex">
        {/* Media preview */}
        {post.media && (
          <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden bg-muted">
            {post.media.type === "image" ? (
              <img
                src={post.media.url}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="relative h-full w-full">
                <video
                  ref={videoRef}
                  src={post.media.url}
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Video play indicator */}
                {!isInView && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg">
                      <Play className="h-3.5 w-3.5 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(post.createdAt)}</span>
            {post.media && (
              <>
                <span className="text-border">•</span>
                <span className="capitalize text-primary/80">{post.media.type}</span>
              </>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center pr-4">
          <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </article>
  );
}