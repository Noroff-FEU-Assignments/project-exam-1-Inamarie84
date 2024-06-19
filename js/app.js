import { displayBlogPosts } from "./events/posts/displayBlogPosts.js";
import { displayCarousel } from "./events/posts/displayLatestPosts.js";

const { pathname } = location;

console.log(pathname);

switch (pathname) {
  case "/":
  case "/index.html":
    displayCarousel();
    break;
  case "/blogposts.html":
    displayBlogPosts();
    break;
}
