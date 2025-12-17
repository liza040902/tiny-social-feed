export interface ApiMeta {
  code: number;
  message: string;
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Social {
  id: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  influencerId: string;
  socialId: string;
  username: string;
  platformUserId: string;
  bio: string;
  followingCount: string;
  followersCount: string;
  joinDate: string;
  social: Social;
  createdAt: string;
  updatedAt: string;
}

export interface Influencer {
  id: string;
  name: string;
  accounts: Account[];
  createdAt: string;
  updatedAt: string;
}

export interface InfluencersResponse {
  meta: ApiMeta;
  data: Influencer[];
}

// Posts API types
export interface ApiPost {
  id: string;
  url: string;
  tweetId: string;
  title: string;
  hashtags: string[];
  postedAt: string;
  socialAccountId: string;
  isDownloaded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostsResponse {
  meta: ApiMeta;
  data: ApiPost[];
}
