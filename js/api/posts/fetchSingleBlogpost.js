// // fetchSingleBlogPost.js
// export async function fetchSinglePost(postId) {
//   try {
//     const response = await fetch(
//       `https://inaforseth.no/wp/wp-json/wp/v2/posts/${postId}?_embed`
//     );
//     const data = await response.json();
//     console.log("Fetched post data:", data); // Add logging to inspect the data structure
//     return data; // Return the post object directly
//   } catch (error) {
//     console.error("Failed to fetch the single post:", error);
//     throw error;
//   }
// }

import { BASE_URL } from "../../constants/api.js";

// fetchSingleBlogPost.js
export async function fetchSinglePost(postId) {
  try {
    const url = `${BASE_URL}/wp/v2/posts/${postId}?_embed`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch the single post");
    }
    const data = await response.json();
    console.log("Fetched post data:", data); // Add logging to inspect the data structure
    return data; // Return the post object directly
  } catch (error) {
    console.error("Failed to fetch the single post:", error);
    throw error;
  }
}
