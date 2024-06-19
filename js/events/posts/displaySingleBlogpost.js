import { renderSingleBlogPost } from "../../ui/posts/renderSingleBlogPost.js";
import { fetchSinglePost } from "../../api/posts/fetchSingleBlogPost.js"; // Ensure this path is correct

document.addEventListener("DOMContentLoaded", async () => {
  const loadingIndicator = document.getElementById("loading-indicator");
  if (loadingIndicator) loadingIndicator.style.display = "block";

  export async function displaySingleBlogPost() {
    // Get post ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
      console.error("No post ID found in URL");
      return;
    }

    try {
      const post = await fetchSinglePost(postId);
      renderSingleBlogPost("#singlepost-container", post);
    } catch (error) {
      console.error("Failed to load single post:", error);
    } finally {
      if (loadingIndicator) loadingIndicator.style.display = "none";
    }
  }

  //   displaySingleBlogPost();
});
