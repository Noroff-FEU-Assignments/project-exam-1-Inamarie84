import { fetchLatestPosts } from "../../api/posts/fetchLatestPosts.js";
import { renderLatestPosts } from "../../ui/posts/renderLatestPosts.js";

let currentPage = 1;
const postsPerPage = 4;
let totalPosts = 0;

export async function displayLatestPosts(page = 1) {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = "block";

  try {
    const { data, totalPosts: fetchedTotalPosts } = await fetchLatestPosts(
      page,
      postsPerPage
    );
    totalPosts = fetchedTotalPosts;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // Update the data attributes for arrows
    const carouselTrack = document.querySelector(".carousel-track");
    carouselTrack.dataset.currentPage = page;
    carouselTrack.dataset.totalPages = totalPages;

    renderLatestPosts(data);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  } finally {
    loadingIndicator.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".left-arrow").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayLatestPosts(currentPage);
    }
  });

  document.querySelector(".right-arrow").addEventListener("click", () => {
    if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
      currentPage++;
      displayLatestPosts(currentPage);
    }
  });
});
