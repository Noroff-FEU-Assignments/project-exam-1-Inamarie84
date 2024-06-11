// renderBlogposts.js
import { fetchPosts } from "../../api/posts/fetchBlogPosts.js";

let currentPage = 1;
let totalPosts = 0;
let perPage = 10;

async function fetchBlogPosts(page, perPage) {
  const { data, totalPosts: total } = await fetchPosts(page, perPage);
  console.log("Fetched posts:", data);
  totalPosts = total; // Update totalPosts
  return data; // Return data
}

export async function renderBlogPosts(targetElement, posts = []) {
  //   console.log("Posts received:", posts);
  const element = document.querySelector(targetElement);
  if (!element) {
    console.error(`Element with selector ${targetElement} not found`);
    return;
  }
  element.innerHTML = "";

  if (!posts.length) {
    console.error("No posts available to render");
    return;
  }

  const postHtml = posts.map(createHtmlForPost);
  element.append(...postHtml);

  // Display "More Posts" button if there are more posts to load
  const morePostsButton = document.getElementById("more-posts-button");
  if (currentPage * perPage < totalPosts) {
    morePostsButton.style.display = "block";
  } else {
    morePostsButton.style.display = "none";
  }
}

// Rest of the code remains unchanged

function createHtmlForPost(post) {
  const { title, content, id, _embedded } = post;
  const postItem = document.createElement("div");
  postItem.classList.add("post");

  // Create and append the title
  const titleElement = document.createElement("h4");
  titleElement.innerText = title.rendered;
  postItem.appendChild(titleElement);

  // Create and append the content
  const contentElement = document.createElement("div");
  contentElement.innerHTML = content.rendered;
  postItem.appendChild(contentElement);

  // Extract and append the featured image if available
  const featuredImageUrl = extractFeaturedImageUrl(_embedded);
  if (featuredImageUrl) {
    const imageElement = document.createElement("img");
    imageElement.src = featuredImageUrl;
    postItem.appendChild(imageElement);
  }

  // Set the href attribute for the post item
  postItem.setAttribute("href", `post.html?id=${id}`);

  return postItem;
}

function extractFeaturedImageUrl(embedded) {
  if (
    embedded &&
    embedded["wp:featuredmedia"] &&
    embedded["wp:featuredmedia"][0] &&
    embedded["wp:featuredmedia"][0].source_url
  ) {
    return embedded["wp:featuredmedia"][0].source_url;
  }
  return null;
}

// Event listener for "More Posts" button

document
  .getElementById("more-posts-button")
  .addEventListener("click", async () => {
    currentPage += 1;

    try {
      const morePosts = await fetchBlogPosts(currentPage, perPage);
      const element = document.querySelector("#posts-container");

      if (!morePosts.length) {
        console.error("No more posts available");
        return;
      }

      const postHtml = morePosts.map(createHtmlForPost);
      element.append(...postHtml);

      // Hide button if all pages are loaded
      if (currentPage * perPage >= totalPosts) {
        document.getElementById("more-posts-button").style.display = "none";
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  });

// Initial render
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const initialPosts = await fetchBlogPosts(1, perPage);
    renderBlogPosts("#posts-container", initialPosts);
  } catch (error) {
    console.error("Failed to load initial posts:", error);
  }
});
