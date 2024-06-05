import { fetchBlogPosts } from "../../api/posts/fetchBlogposts.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { renderBlogPosts } from "../../ui/posts/renderBlogposts.js";

export async function displayBlogPosts() {
  console.log("displayBlogPosts");
  try {
    const posts = await fetchBlogPosts();
    console.log(posts);
    renderBlogPosts("#blogposts-container", posts);
  } catch (error) {
    console.log(error);
    displayMessage(
      "#blogposts-container",
      "error",
      "There was an error fetching the blogposts"
    );
  }
}
