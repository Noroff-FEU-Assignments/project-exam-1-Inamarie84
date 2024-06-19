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

// export async function fetchPosts(page, perPage) {
//   const url = `https://inaforseth.no/wp/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${perPage}`;

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch posts. Status: ${response.status}`);
//     }

//     const data = await response.json();
//     const totalPosts = response.headers.get("X-WP-Total");

//     return { data, totalPosts };
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     throw error; // Rethrow the error to be caught in the calling function
//   }
// }
