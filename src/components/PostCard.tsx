import { Post } from "@/data/posts";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

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
        "group cursor-pointer rounded-lg bg-card p-4 shadow-soft",
        "transition-all duration-300 ease-out",
        "hover:shadow-hover hover:-translate-y-0.5",
        "animate-fade-in border border-border/50"
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
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
    </article>
  );
}
