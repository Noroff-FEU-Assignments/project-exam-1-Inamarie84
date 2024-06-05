import { displayBlogPosts } from "./events/posts/displayBlogposts.js";

const { pathname } = location;

console.log(pathname);

switch (pathname) {
  case "/":
  case "/index.html":
    displayBlogPosts();
    break;
}
