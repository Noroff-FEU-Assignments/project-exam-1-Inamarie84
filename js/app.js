import { displayBlogPosts } from "./events/posts/displayBlogPosts.js";
import { displaySingleBlogPost } from "./events/posts/displaySingleBlogPost.js";

const { pathname } = location;

console.log("Current pathname:", pathname); // Log the pathname for debugging

switch (pathname) {
  case "/":
  case "/index.html":
    // Add the function to be called on the home page
    break;
  case "/blogposts.html":
    displayBlogPosts();
    break;
  case "/singleblogpost.html":
    displaySingleBlogPost();
    break;
  default:
    console.log("No matching route found"); // Handle cases where the path does not match any expected route
}
