import { BASE_URL } from "../../constants/api.js";

// fetchBlogposts.js
export async function fetchPosts(page, perPage) {
  const response = await fetch(`${BASE_URL}&page=${page}&per_page=${perPage}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  const totalPosts = parseInt(response.headers.get("X-WP-Total"), 10); // Parse as integer
  return { data, totalPosts };
}
