export function renderLatestPosts(posts) {
  const carouselTrack = document.querySelector(".carousel-track");
  if (!carouselTrack) {
    console.error("Carousel track element not found");
    return;
  }

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
}

function updateArrows() {
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const carouselTrack = document.querySelector(".carousel-track");

  if (!leftArrow || !rightArrow || !carouselTrack) {
    console.error("Arrow or carousel track element not found");
    return;
  }

  const currentPage = parseInt(carouselTrack.dataset.currentPage, 10) || 1;
  const totalPages = parseInt(carouselTrack.dataset.totalPages, 10) || 1;

  leftArrow.disabled = currentPage === 1;
  rightArrow.disabled = currentPage >= totalPages;
}
