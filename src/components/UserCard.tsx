import { User } from "@/data/users";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

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
        "group cursor-pointer rounded-2xl p-6",
        "glass hover-lift",
        "animate-fade-in",
        "flex flex-col items-center text-center"
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Avatar */}
      <div
        className={cn(
          "relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full mb-4",
          "bg-gradient-to-br text-2xl font-bold text-white",
          "ring-2 ring-white/10 ring-offset-4 ring-offset-background",
          "group-hover:ring-primary/50 group-hover:scale-110 transition-all duration-300",
          "shadow-glow",
          gradients[index % gradients.length]
        )}
      >
        <img
          src={user.avatar}
          className="h-full w-full rounded-full object-cover"
        />
        {/* {user.avatar} */}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="w-full">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1 truncate">
          {user.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 truncate">@{user.username}</p>

        {/* Stats */}

      </div>
    </article>
  );
}