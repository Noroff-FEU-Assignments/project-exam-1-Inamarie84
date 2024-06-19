// displayBlogposts.js
import { fetchPosts } from "../../api/posts/fetchBlogposts.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { renderBlogPosts } from "../../ui/posts/renderBlogPosts.js";

export async function displayBlogPosts() {
  console.log("displayBlogPosts");
  try {
    const page = 1; // Set the initial page number
    const perPage = 10; // Set the number of posts per page
    const { data } = await fetchPosts(page, perPage); // Destructure the data property
    // console.log("Fetched posts:", data); // Log the fetched posts
    renderBlogPosts("#posts-container", data); // Pass the data property to renderBlogPosts
  } catch (error) {
    console.error("Error fetching or rendering posts:", error);
    displayMessage(
      "#posts-container",
      "error",
      "There was an error fetching the blogposts"
    );
  }
}
