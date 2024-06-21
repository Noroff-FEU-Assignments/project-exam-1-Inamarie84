// fetchSingleBlogPost.js
export async function fetchSinglePost(postId) {
  try {
    const response = await fetch(
      `https://inaforseth.no/wp/wp-json/wp/v2/posts/${postId}`
    );
    const data = await response.json();
    // Assuming data is an array, return the first item
    if (Array.isArray(data)) {
      return data[0];
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch the single post:", error);
    throw error;
  }
}
