import { InfluencersResponse, PostsResponse } from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v1";

export async function searchInfluencers(query: string): Promise<InfluencersResponse> {
  const response = await fetch(
    `${API_BASE_URL}/influencers?search=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function getAccountPosts(
  socialAccountId: string,
  page: number = 1,
  limit: number = 10
): Promise<PostsResponse> {
  const response = await fetch(
    `${API_BASE_URL}/accounts/${socialAccountId}/posts?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export interface CrawlResponse {
  success: boolean;
  message?: string;
}

export async function crawlInfluencer(
  username: string,
  maxCollectCount: number = 10
): Promise<CrawlResponse> {
  const response = await fetch(`${API_BASE_URL}/crawl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, maxCollectCount }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
