import { fetchLatestPosts } from "../../api/posts/fetchLatestPosts.js";
import { renderLatestPosts } from "../../ui/posts/renderLatestPosts.js";

let currentPage = 1;
const postsPerPage = 4;
let totalPosts = 0;

export async function displayLatestPosts() {
  const loadingIndicator = document.getElementById("loading-indicator");
  if (!loadingIndicator) {
    console.error("Loading indicator element not found");
    return;
  }

  loadingIndicator.style.display = "block";

  try {
    const { data, totalPosts: fetchedTotalPosts } = await fetchLatestPosts(
      currentPage,
      postsPerPage
    );
    totalPosts = fetchedTotalPosts;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const carouselTrack = document.querySelector(".carousel-track");
    if (!carouselTrack) {
      console.error("Carousel track element not found");
      return;
    }

    carouselTrack.dataset.currentPage = currentPage;
    carouselTrack.dataset.totalPages = totalPages;

    renderLatestPosts(data);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  } finally {
    loadingIndicator.style.display = "none";
  }
}

document.querySelector(".left-arrow").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayLatestPosts();
  }
});

document.querySelector(".right-arrow").addEventListener("click", () => {
  if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
    currentPage++;
    displayLatestPosts();
  }
});
