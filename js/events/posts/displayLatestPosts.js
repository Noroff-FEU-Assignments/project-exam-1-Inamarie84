// displayLatestPost.js
import { fetchLatestPosts } from "../../api/posts/fetchLatestPosts.js";
import { createPostElement } from "../../ui/posts/renderLatestPosts.js";

export async function displayCarousel() {
  const carouselTrack = document.querySelector(".carousel-track");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  let currentIndex = 0;

  if (!carouselTrack || !leftArrow || !rightArrow) {
    console.error("Carousel elements not found");
    return;
  }

  try {
    const { data: posts, totalPosts } = await fetchLatestPosts(1, 20); // Fetching 20 posts as an example

    posts.forEach((post) => {
      const postElement = createPostElement(post);
      carouselTrack.appendChild(postElement);
    });

    function updateCarousel() {
      const carouselWidth = document.querySelector(".carousel").offsetWidth;
      const totalPosts = document.querySelectorAll(".carousel-post").length;
      const visiblePosts = window.innerWidth > 768 ? 4 : 1;
      const maxIndex = totalPosts - visiblePosts;

      if (currentIndex < 0) currentIndex = maxIndex;
      if (currentIndex > maxIndex) currentIndex = 0;

      const offset = -(carouselWidth * currentIndex) / visiblePosts;
      carouselTrack.style.transform = `translateX(${offset}px)`;
    }

    leftArrow.addEventListener("click", () => {
      currentIndex -= 1;
      updateCarousel();
    });

    rightArrow.addEventListener("click", () => {
      currentIndex += 1;
      updateCarousel();
    });

    updateCarousel();
    window.addEventListener("resize", updateCarousel);
  } catch (error) {
    console.error("Failed to load posts:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayCarousel();
});
