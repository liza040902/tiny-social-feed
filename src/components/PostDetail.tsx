import { Post } from "@/data/posts";
import { User } from "@/data/users";
import { cn } from "@/lib/utils";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "./ui/button";

const gradients = [
  "from-rose-400 to-orange-300",
  "from-violet-400 to-purple-300",
  "from-cyan-400 to-blue-300",
  "from-emerald-400 to-teal-300",
  "from-amber-400 to-yellow-300",
];

interface PostDetailProps {
  post: Post;
  author: User;
  onBack: () => void;
  authorIndex: number;
}

export function PostDetail({ post, author, onBack, authorIndex }: PostDetailProps) {

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article className="animate-fade-in">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back
      </Button>

      {/* Post header */}
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-medium text-foreground leading-tight text-balance">
          {post.title}
        </h1>
        
        <div className="mt-4 flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
              "bg-gradient-to-br text-sm font-medium text-primary-foreground",
              gradients[authorIndex % gradients.length]
            )}
          >
            {author.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{author.name}</p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Media */}
      {post.media && (
        <div className="mb-6 overflow-hidden rounded-lg">
          {post.media.type === "image" ? (
            <img
              src={post.media.url}
              alt={post.title}
              className="w-full object-cover"
            />
          ) : (
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <video
                src={post.media.url}
                controls
                className="h-full w-full object-contain bg-black"
                poster={post.media.thumbnail}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      )}

      {/* Post content */}
      <div className="prose prose-sm max-w-none">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-secondary-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
