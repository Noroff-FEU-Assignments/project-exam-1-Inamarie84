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

// import { displayLatestPosts } from "../../events/posts/displayLatestPosts.js";

// export function renderLatestPosts(
//   posts,
//   totalPosts,
//   currentPage,
//   postsPerPage
// ) {
//   const carouselContainer = document.querySelector(".carousel-container");
//   if (!carouselContainer) return; // Exit if carouselContainer is not found

//   // Clear previous content
//   carouselContainer.innerHTML = "";

//   // Add the header
//   const headingElement = document.createElement("h2");
//   headingElement.classList.add("carousel-heading");
//   headingElement.innerText = "Latest Posts";
//   carouselContainer.appendChild(headingElement);

//   // Create the carousel track
//   const carouselTrack = document.createElement("div");
//   carouselTrack.classList.add("carousel-track");
//   carouselContainer.appendChild(carouselTrack);

//   posts.forEach((post) => {
//     const postElement = document.createElement("div");
//     postElement.classList.add("carousel-item");

//     const featuredMedia = post._embedded["wp:featuredmedia"];
//     const imageUrl =
//       featuredMedia && featuredMedia[0] && featuredMedia[0].source_url
//         ? featuredMedia[0].source_url
//         : "default-image-url.jpg";

//     postElement.innerHTML = `
//         <img src="${imageUrl}" alt="${post.title.rendered}">
//         <h3>${post.title.rendered}</h3>
//       `;

//     carouselTrack.appendChild(postElement);
//   });

//   // Add the arrows to the DOM
//   const leftArrow = document.createElement("button");
//   leftArrow.classList.add("carousel-arrow", "left-arrow");
//   leftArrow.innerText = "<";
//   carouselContainer.appendChild(leftArrow);

//   const rightArrow = document.createElement("button");
//   rightArrow.classList.add("carousel-arrow", "right-arrow");
//   rightArrow.innerText = ">";
//   carouselContainer.appendChild(rightArrow);

//   // Add event listeners for the arrows
//   leftArrow.addEventListener("click", () => {
//     if (currentPage > 1) {
//       currentPage--;
//       displayLatestPosts(currentPage);
//     }
//   });

//   rightArrow.addEventListener("click", () => {
//     if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
//       currentPage++;
//       displayLatestPosts(currentPage);
//     }
//   });

//   updateArrows();

//   function updateArrows() {
//     const leftArrow = document.querySelector(".left-arrow");
//     const rightArrow = document.querySelector(".right-arrow");
//     if (!leftArrow || !rightArrow) return; // Exit if arrows are not found

//     leftArrow.disabled = currentPage === 1;
//     rightArrow.disabled = currentPage >= Math.ceil(totalPosts / postsPerPage);
//   }
// }
