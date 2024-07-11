import { BASE_URL } from "../../constants/api.js";

export async function fetchLatestPosts(page = 1, perPage = 4) {
  const endpoint = "/wp/v2/posts?_embed";
  const url = `${BASE_URL}${endpoint}&page=${page}&per_page=${perPage}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch latest posts");
  }
  const data = await response.json();
  const totalPosts = parseInt(response.headers.get("X-WP-Total"), 10); // Parse as integer
  return { data, totalPosts };
}
