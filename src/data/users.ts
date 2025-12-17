export interface User {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
}

export const users: User[] = [
  {
    id: "1",
    name: "Marcus Sterling",
    username: "marcussterling",
    bio: "Tech visionary. Building the future of sustainable energy. CEO @StellarTech",
    avatar: "https://pbs.twimg.com/profile_images/1908645510853844992/Kr7fu9HW_200x200.jpg",
    followers: 12500000,
    following: 234,
  },
  {
    id: "2",
    name: "Elena Voss",
    username: "elenavoss",
    bio: "Award-winning author & philosopher. Exploring consciousness and creativity.",
    avatar: "https://pbs.twimg.com/profile_images/1908645510853844992/Kr7fu9HW_200x200.jpg",
    followers: 4200000,
    following: 892,
  },
  {
    id: "3",
    name: "James Chen",
    username: "jameschen",
    bio: "Venture capitalist. Early investor in 50+ unicorns. Building tomorrow's giants.",
    avatar: "https://pbs.twimg.com/profile_images/1908645510853844992/Kr7fu9HW_200x200.jpg",
    followers: 3800000,
    following: 1205,
  },
  {
    id: "4",
    name: "Sofia Rodriguez",
    username: "sofiarodriguez",
    bio: "Astrophysicist at NASA. Searching for life beyond Earth. Science communicator.",
    avatar: "https://pbs.twimg.com/profile_images/1908645510853844992/Kr7fu9HW_200x200.jpg",
    followers: 2100000,
    following: 445,
  },
  {
    id: "5",
    name: "David Park",
    username: "davidpark",
    bio: "Founder @NeuralMind. AI researcher. Making machines understand humans.",
    avatar: "https://pbs.twimg.com/profile_images/1908645510853844992/Kr7fu9HW_200x200.jpg",
    followers: 5600000,
    following: 178,
  },
];
