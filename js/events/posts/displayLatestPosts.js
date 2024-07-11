// import { fetchLatestPosts } from "../../api/posts/fetchLatestPosts.js";
// import { renderLatestPosts } from "../../ui/posts/renderLatestPosts.js";

// let currentPage = 1;
// const postsPerPage = 4;
// let totalPosts = 0;

// export async function displayLatestPosts(page = 1) {
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
//   }
// }

// // Event listener for navigation arrows
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

// // Initial load of latest posts on DOMContentLoaded
// document.addEventListener("DOMContentLoaded", () => {
//   // displayLatestPosts();
// });

import { fetchLatestPosts } from "../../api/posts/fetchLatestPosts.js";
import { renderLatestPosts } from "../../ui/posts/renderLatestPosts.js";

let currentPage = 1;
let totalPosts = 0;
let postsPerPage = 4; // Default value

// Function to dynamically update postsPerPage based on screen size
function updatePostsPerPage() {
  if (window.innerWidth < 480) {
    postsPerPage = 1; // 1 post per page for very small screens
  } else if (window.innerWidth < 768) {
    postsPerPage = 2; // 2 posts per page for small screens
  } else if (window.innerWidth < 1024) {
    postsPerPage = 3; // 3 posts per page for medium-sized screens
  } else {
    postsPerPage = 4; // 4 posts per page for larger screens
  }
}

// Function to display latest posts
export async function displayLatestPosts(page = 1) {
  updatePostsPerPage(); // Update postsPerPage on initial load
  try {
    const { data, totalPosts: fetchedTotalPosts } = await fetchLatestPosts(
      page,
      postsPerPage
    );
    totalPosts = fetchedTotalPosts;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const carouselTrack = document.querySelector(".carousel-track");
    if (carouselTrack) {
      carouselTrack.dataset.currentPage = page;
      carouselTrack.dataset.totalPages = totalPages;
    }

    renderLatestPosts(data);
    currentPage = page;
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

// Update postsPerPage on window resize
window.addEventListener("resize", () => {
  updatePostsPerPage();
});
