import { InfluencersResponse } from "@/types/api";

const API_BASE_URL = "http://localhost:3001/api/v1";

export async function searchInfluencers(query: string): Promise<InfluencersResponse> {
  const response = await fetch(
    `${API_BASE_URL}/influencers?search=${encodeURIComponent(query)}`
  );
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}
