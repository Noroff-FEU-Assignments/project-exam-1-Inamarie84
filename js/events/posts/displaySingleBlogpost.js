// displaySingleBlogPost.js
import { renderSingleBlogPost } from "../../ui/posts/renderSingleBlogPost.js";
import { fetchSinglePost } from "../../api/posts/fetchSingleBlogPost.js"; // Ensure this path is correct

export async function displaySingleBlogPost() {
  // Get post ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  console.log("URL Params:", urlParams.toString()); // Log URL parameters for debugging
  console.log("Post ID:", postId); // Log the post ID for debugging

  if (!postId) {
    console.error("No post ID found in URL");
    return;
  }

  const loadingIndicator = document.getElementById("loading-indicator");
  if (loadingIndicator) loadingIndicator.style.display = "block";

  try {
    const post = await fetchSinglePost(postId);
    console.log("Fetched single post:", post); // Log the fetched post for debugging
    renderSingleBlogPost("#singlepost-container", post);
  } catch (error) {
    console.error("Failed to load single post:", error);
  } finally {
    if (loadingIndicator) loadingIndicator.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", displaySingleBlogPost);
