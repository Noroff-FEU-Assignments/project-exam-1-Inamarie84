// import { fetchLatestPosts } from "../../api/posts/fetchLatestPosts.js";
// import { renderLatestPosts } from "../../ui/posts/renderLatestPosts.js";

// document.addEventListener("DOMContentLoaded", () => {
//   const carouselContainer = document.querySelector(".carousel-container");
//   if (carouselContainer) {
//     displayLatestPosts();
//   }
// });

// let currentPage = 1;
// const postsPerPage = 4;
// let totalPosts = 0;

// export async function displayLatestPosts(page = 1) {
//   const loadingIndicator = document.getElementById("loading-indicator");
//   if (loadingIndicator) loadingIndicator.style.display = "block";

//   try {
//     const { data, totalPosts: fetchedTotalPosts } = await fetchLatestPosts(
//       page,
//       postsPerPage
//     );
//     totalPosts = fetchedTotalPosts;
//     const totalPages = Math.ceil(totalPosts / postsPerPage);

//     // Update the data attributes for arrows
//     const carouselTrack = document.querySelector(".carousel-track");
//     if (carouselTrack) {
//       carouselTrack.dataset.currentPage = page;
//       carouselTrack.dataset.totalPages = totalPages;
//     }

//     renderLatestPosts(data);
//     currentPage = page; // Update current page after rendering
//   } catch (error) {
//     console.error("Failed to fetch posts:", error);
//   } finally {
//     if (loadingIndicator) loadingIndicator.style.display = "none";
//   }
// }

// // Event listeners for navigation arrows
// document.addEventListener("click", (event) => {
//   if (event.target.classList.contains("left-arrow")) {
//     if (currentPage > 1) {
//       displayLatestPosts(currentPage - 1);
//     }
//   }

//   if (event.target.classList.contains("right-arrow")) {
//     if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
//       displayLatestPosts(currentPage + 1);
//     }
//   }
// });

import { fetchLatestPosts } from "../../api/posts/fetchLatestPosts.js";
import { renderLatestPosts } from "../../ui/posts/renderLatestPosts.js";

let currentPage = 1;
const postsPerPage = 4;
let totalPosts = 0;

export async function displayLatestPosts(page = 1) {
  try {
    const { data, totalPosts: fetchedTotalPosts } = await fetchLatestPosts(
      page,
      postsPerPage
    );
    totalPosts = fetchedTotalPosts;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // Update the data attributes for arrows
    const carouselTrack = document.querySelector(".carousel-track");
    if (carouselTrack) {
      carouselTrack.dataset.currentPage = page;
      carouselTrack.dataset.totalPages = totalPages;
    }

    renderLatestPosts(data);
    currentPage = page; // Update current page after rendering
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
}

// Event listener for navigation arrows
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("left-arrow")) {
    if (currentPage > 1) {
      displayLatestPosts(currentPage - 1);
    }
  }

  if (event.target.classList.contains("right-arrow")) {
    if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
      displayLatestPosts(currentPage + 1);
    }
  }
});

// Initial load of latest posts on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  displayLatestPosts();
});
