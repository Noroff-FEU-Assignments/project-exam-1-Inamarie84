import { fetchPosts } from "../../api/posts/fetchBlogPosts.js";

// Global variables
let currentPage = 1;
let totalPosts = 0;
let perPage = 10;
let additionalPosts = []; // To keep track of additional posts

// Function to fetch blog posts from the API
async function fetchBlogPosts(page, perPage) {
  try {
    const { data, totalPosts: total } = await fetchPosts(page, perPage);
    console.log("Fetched posts:", data);
    totalPosts = total; // Update totalPosts
    return data; // Return fetched posts
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
}

// Function to render blog posts to the DOM
export async function renderBlogPosts(targetElement, posts = []) {
  const element = document.querySelector(targetElement);
  if (!element) {
    // console.error(`Element with selector ${targetElement} not found`);
    return;
  }
  element.innerHTML = ""; // Clear previous posts

  if (!posts.length) {
    console.error("No posts available to render");
    return;
  }

  // Create HTML for each post and append to the container
  const postHtml = posts.map(createHtmlForPost);
  element.append(...postHtml);

  // Display "More Posts" button if there are more posts to load
  const morePostsButton = document.getElementById("more-posts-button");
  if (morePostsButton) {
    if (currentPage * perPage < totalPosts) {
      morePostsButton.style.display = "block";
    } else {
      morePostsButton.style.display = "none";
    }
  }
}

// Function to create HTML structure for a single post
function createHtmlForPost(post) {
  const { title, content, id, _embedded } = post;

  const postContainer = document.createElement("div");
  postContainer.classList.add("post");

  // Create and append the title
  const titleElement = document.createElement("h4");
  titleElement.innerText = title.rendered;
  postContainer.appendChild(titleElement);

  // Extract and append the featured image if available
  const featuredImageUrl = extractFeaturedImageUrl(_embedded);
  if (featuredImageUrl) {
    const imageElement = document.createElement("img");
    imageElement.src = featuredImageUrl;
    imageElement.classList.add("featured-image"); // Add class to the image element
    postContainer.appendChild(imageElement);
  }

  // Create and append the content
  const contentElement = document.createElement("div");
  contentElement.innerHTML = removeImagesAndFigcaptionsFromContent(
    content.rendered
  );
  postContainer.appendChild(contentElement);

  // Create a link/button to view the full post
  const readMoreLink = document.createElement("a");
  readMoreLink.href = `singleblogpost.html?id=${id}`; // Adjust URL as per your route
  readMoreLink.textContent = "Read More";
  readMoreLink.classList.add("read-more-link"); // Add class for styling if needed
  postContainer.appendChild(readMoreLink);

  return postContainer;
}

// Function to extract featured image URL from _embedded object
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

// Function to remove images and figcaptions from content
function removeImagesAndFigcaptionsFromContent(content) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content;

  const images = tempDiv.querySelectorAll("img");
  images.forEach((img) => img.remove());

  const figcaptions = tempDiv.querySelectorAll("figcaption");
  figcaptions.forEach((figcaption) => figcaption.remove());

  return tempDiv.innerHTML;
}

// Event listener for "More Posts" button
document.addEventListener("DOMContentLoaded", async () => {
  const morePostsButton = document.getElementById("more-posts-button");
  const hidePostsButton = document.getElementById("hide-posts-button");
  const backToTopButton = document.getElementById("back-to-top-button");
  const postsContainer = document.getElementById("posts-container");

  // Initial load of posts
  try {
    const posts = await fetchBlogPosts(currentPage, perPage);
    await renderBlogPosts("#posts-container", posts);
  } catch (error) {
    console.error("Error during initial load of posts:", error);
  }

  if (morePostsButton) {
    morePostsButton.addEventListener("click", async () => {
      currentPage += 1;

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
        if (hidePostsButton) hidePostsButton.style.display = "block";

        // Hide button if all pages are loaded
        if (currentPage * perPage >= totalPosts) {
          morePostsButton.style.display = "none";
          // Show the "Back to Top" button when all posts are loaded
          if (backToTopButton) backToTopButton.style.display = "block";
        }
      } catch (error) {
        console.error("Error fetching more posts:", error);
      }
    });
  }

  // Event listener for "Hide Posts" button
  if (hidePostsButton) {
    hidePostsButton.addEventListener("click", () => {
      const element = document.querySelector("#posts-container");

      // Remove additional posts from the DOM
      additionalPosts.forEach((postElement) => {
        element.removeChild(postElement);
      });

      // Clear the additional posts array
      additionalPosts = [];

      // Hide the "Hide Posts" button
      hidePostsButton.style.display = "none";

      // Show the "More Posts" button again
      if (morePostsButton) morePostsButton.style.display = "block";

      // Reset currentPage to load the correct next page when "More Posts" is clicked again
      currentPage -= 1;
    });
  }

  // Event listener for "Back to Top" button
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Show "Back to Top" button when scrolling to the bottom
  window.addEventListener("scroll", () => {
    if (backToTopButton) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        backToTopButton.style.display = "block";
      }
    }
  });

  // Initial render
  fetchBlogPosts(1, perPage)
    .then((initialPosts) => {
      renderBlogPosts("#posts-container", initialPosts);
    })
    .catch((error) => {
      console.error("Failed to load initial posts:", error);
      // Handle error - you might want to display a message to the user
    })
    .finally(() => {
      if (morePostsButton) {
        if (currentPage * perPage < totalPosts) {
          morePostsButton.style.display = "block";
        }
      }
    });
});
