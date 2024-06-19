import { displayBlogPosts } from "./events/posts/displayBlogPosts.js";
import { displaySingleBlogPost } from "./events/posts/displaySingleBlogpost.js";

const { pathname } = location;

console.log(pathname);

switch (pathname) {
  // case "/":
  // case "/index.html":
  //   displayCarousel();
  //   break;
  case "/blogposts.html":
    displayBlogPosts();
    break;
  case "/singleblogpost.html":
    displaySingleBlogPost();
    break;
}
