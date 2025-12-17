import { User } from "@/data/users";
import { Post } from "@/data/posts";
import { PostCard } from "./PostCard";
import { cn } from "@/lib/utils";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "./ui/button";

const gradients = [
  "from-rose-400 to-orange-300",
  "from-violet-400 to-purple-300",
  "from-cyan-400 to-blue-300",
  "from-emerald-400 to-teal-300",
  "from-amber-400 to-yellow-300",
];

interface UserProfileProps {
  user: User;
  posts: Post[];
  onBack: () => void;
  onPostClick: (post: Post) => void;
  userIndex: number;
}

export function UserProfile({ user, posts, onBack, onPostClick, userIndex }: UserProfileProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="animate-fade-in">
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

      {/* Profile header */}
      <header className="mb-6">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full",
              "bg-gradient-to-br text-lg font-medium text-primary-foreground",
              gradients[userIndex % gradients.length]
            )}
          >
            {user.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-medium text-foreground">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="mt-2 text-sm text-secondary-foreground">{user.bio}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-6 text-sm">
          {/* <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">{formatNumber(user.followers)}</span>
            <span className="text-muted-foreground">followers</span>
          </div> */}
          {/* <div>
            <span className="font-medium text-foreground">{formatNumber(user.following)}</span>
            <span className="text-muted-foreground ml-1">following</span>
          </div> */}
        </div>
      </header>

      {/* Posts section */}
      <section>
        <h2 className="text-lg font-medium text-foreground mb-4">Posts</h2>
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
      </section>
    </div>
  );
}
