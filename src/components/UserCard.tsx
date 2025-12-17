import { User } from "@/data/users";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface UserCardProps {
  user: User;
  onClick: () => void;
  index: number;
}

const gradients = [
  "from-violet-500 to-purple-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
];

export function UserCard({ user, onClick, index }: UserCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-xl p-4",
        "glass hover-lift",
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className={cn(
            "relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full",
            "bg-gradient-to-br text-sm font-semibold text-white",
            "ring-2 ring-white/10 ring-offset-2 ring-offset-background",
            "group-hover:ring-primary/50 transition-all duration-300",
            gradients[index % gradients.length]
          )}
        >
          {user.avatar}
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {user.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
          {user.bio && (
            <p className="mt-1 text-sm text-secondary-foreground/70 line-clamp-1">
              {user.bio}
            </p>
          )}
        </div>

        {/* Arrow */}
        <ChevronRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </article>
  );
}