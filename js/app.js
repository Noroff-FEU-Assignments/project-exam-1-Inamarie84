import { displayBlogPosts } from "./events/posts/displayBlogPosts.js";

const { pathname } = location;

console.log(pathname);

switch (pathname) {
  case "/":
  case "/index.html":
    displayBlogPosts();
    break;
  case "/blogposts.html":
    displayBlogPosts();
    break;
}
