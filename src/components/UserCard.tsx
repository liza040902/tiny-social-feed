import { User } from "@/data/users";
import { cn } from "@/lib/utils";

interface UserCardProps {
  user: User;
  onClick: () => void;
  index: number;
}

const gradients = [
  "from-rose-400 to-orange-300",
  "from-violet-400 to-purple-300",
  "from-cyan-400 to-blue-300",
  "from-emerald-400 to-teal-300",
  "from-amber-400 to-yellow-300",
];

export function UserCard({ user, onClick, index }: UserCardProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <article
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-lg bg-card p-4 shadow-soft",
        "transition-all duration-300 ease-out",
        "hover:shadow-hover hover:-translate-y-0.5",
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={cn(
            "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full",
            "bg-gradient-to-br text-sm font-medium text-primary-foreground",
            gradients[index % gradients.length]
          )}
        >
          {user.avatar}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-medium text-foreground group-hover:text-primary transition-colors">
              {user.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
          <p className="mt-1.5 text-sm text-secondary-foreground line-clamp-2">
            {user.bio}
          </p>
          {/* <p className="mt-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{formatNumber(user.followers)}</span> followers
          </p> */}
        </div>
      </div>
    </article>
  );
}
