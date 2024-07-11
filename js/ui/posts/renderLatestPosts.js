export function renderLatestPosts(posts) {
  const carouselTrack = document.querySelector(".carousel-track");
  if (!carouselTrack) return; // Exit if carousel track is not found

  // Clear previous content
  carouselTrack.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("carousel-item");

    const featuredMedia = post._embedded["wp:featuredmedia"];
    const imageUrl =
      featuredMedia && featuredMedia[0] && featuredMedia[0].source_url
        ? featuredMedia[0].source_url
        : "default-image-url.jpg";

    postElement.innerHTML = `
        <img src="${imageUrl}" alt="${post.title.rendered}">
        <h3>${post.title.rendered}</h3>
      `;

    carouselTrack.appendChild(postElement);
  });

  updateArrows();

  // Remove loading indicator after content is loaded
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.parentElement.classList.add("loaded");
}

function updateArrows() {
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  if (!leftArrow || !rightArrow) return; // Exit if arrows are not found

  const currentPage = parseInt(
    document.querySelector(".carousel-track").dataset.currentPage,
    10
  );
  const totalPages = parseInt(
    document.querySelector(".carousel-track").dataset.totalPages,
    10
  );

  leftArrow.disabled = currentPage === 1;
  rightArrow.disabled = currentPage >= totalPages;
}
