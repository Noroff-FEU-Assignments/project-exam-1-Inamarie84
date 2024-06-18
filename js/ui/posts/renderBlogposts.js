import { fetchPosts } from "../../api/posts/fetchBlogPosts.js";

let currentPage = 1;
let totalPosts = 0;
let perPage = 10;
let additionalPosts = []; // To keep track of additional posts

async function fetchBlogPosts(page, perPage) {
  try {
    const { data, totalPosts: total } = await fetchPosts(page, perPage);
    console.log("Fetched posts:", data);
    totalPosts = total; // Update totalPosts
    return data; // Return data
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
}

export async function renderBlogPosts(targetElement, posts = []) {
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

function createHtmlForPost(post) {
  const { title, content, id, _embedded } = post;

  const postText = document.createElement("div");
  postText.classList.add("post-text");

  // Create and append the title
  const titleElement = document.createElement("h4");
  titleElement.innerText = title.rendered;
  postText.appendChild(titleElement);

  // Create and append the content
  const contentElement = document.createElement("div");
  contentElement.innerHTML = content.rendered;
  postText.appendChild(contentElement);

  const postImage = document.createElement("div");
  postImage.classList.add("post-image");

  // Extract and append the featured image if available
  const featuredImageUrl = extractFeaturedImageUrl(_embedded);
  if (featuredImageUrl) {
    const imageElement = document.createElement("img");
    imageElement.src = featuredImageUrl;
    imageElement.classList.add("featured-image"); // Add class to the image element
    postImage.appendChild(imageElement);
  }

  // Container to hold the three columns
  const postContainer = document.createElement("div");
  postContainer.classList.add("post");
  postContainer.appendChild(postText);
  postContainer.appendChild(postImage);

  return postContainer;
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

document
  .getElementById("more-posts-button")
  .addEventListener("click", async () => {
    currentPage += 1;

    // Show the loading indicator
    const loadingIndicator = document.getElementById("loading-indicator");
    loadingIndicator.style.display = "block";

    try {
      const morePosts = await fetchBlogPosts(currentPage, perPage);
      const element = document.querySelector("#posts-container");

      if (!morePosts.length) {
        console.error("No more posts available");
        return;
      }

      const postHtml = morePosts.map(createHtmlForPost);
      postHtml.forEach((postElement) => {
        additionalPosts.push(postElement);
        element.appendChild(postElement);
      });

      // Show the "Hide Posts" button
      document.getElementById("hide-posts-button").style.display = "block";

      // Hide button if all pages are loaded
      if (currentPage * perPage >= totalPosts) {
        document.getElementById("more-posts-button").style.display = "none";
        // Show the "Back to Top" button when all posts are loaded
        const backToTopButton = document.getElementById("back-to-top-button");
        backToTopButton.style.display = "block";
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    } finally {
      // Hide the loading indicator
      loadingIndicator.style.display = "none";
    }
  });

// Event listener for "Hide Posts" button
document.getElementById("hide-posts-button").addEventListener("click", () => {
  const element = document.querySelector("#posts-container");

  // Remove additional posts from the DOM
  additionalPosts.forEach((postElement) => {
    element.removeChild(postElement);
  });

  // Clear the additional posts array
  additionalPosts = [];

  // Hide the "Hide Posts" button
  const hidePostsButton = document.getElementById("hide-posts-button");
  hidePostsButton.style.display = "none";

  // Show the "More Posts" button again
  const morePostsButton = document.getElementById("more-posts-button");
  morePostsButton.style.display = "block";

  // Reset currentPage to load the correct next page when "More Posts" is clicked again
  currentPage -= 1;
});

// Event listener for "Back to Top" button
document.getElementById("back-to-top-button").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Show "Back to Top" button when scrolling to the bottom
window.addEventListener("scroll", () => {
  const backToTopButton = document.getElementById("back-to-top-button");
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    backToTopButton.style.display = "block";
  }
});

// Initial render
document.addEventListener("DOMContentLoaded", async () => {
  // Show the loading indicator
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = "block";

  try {
    const initialPosts = await fetchBlogPosts(1, perPage);
    renderBlogPosts("#posts-container", initialPosts);
  } catch (error) {
    console.error("Failed to load initial posts:", error);
  } finally {
    // Hide the loading indicator and show the more-posts button
    loadingIndicator.style.display = "none";

    // Display the "More Posts" button if there are more posts to load
    const morePostsButton = document.getElementById("more-posts-button");
    if (currentPage * perPage < totalPosts) {
      morePostsButton.style.display = "block";
    }
  }
});
