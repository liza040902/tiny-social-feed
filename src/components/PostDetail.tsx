import { useState } from "react";
import { Post } from "@/data/posts";
import { User } from "@/data/users";
import { cn } from "@/lib/utils";
import { ArrowLeft, Calendar, Image, Play, X } from "lucide-react";
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
  const [showVideo, setShowVideo] = useState(false);

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
            <div className="relative aspect-video bg-muted">
              {showVideo ? (
                <div className="relative h-full w-full">
                  <iframe
                    src={`${post.media.url}?autoplay=1`}
                    title={post.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowVideo(false)}
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-foreground/70 text-background hover:bg-foreground/90"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setShowVideo(true)}
                  className="group relative h-full w-full"
                >
                  {post.media.thumbnail ? (
                    <img
                      src={post.media.thumbnail}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-muted to-secondary" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-colors group-hover:bg-foreground/30">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-7 w-7 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  {/* Video badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md bg-foreground/70 px-2.5 py-1.5 text-sm text-background">
                    <Play className="h-4 w-4" />
                    <span>Watch Video</span>
                  </div>
                </button>
              )}
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
