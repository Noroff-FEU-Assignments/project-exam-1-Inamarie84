// Function to fetch post titles from the REST API
async function fetchPostTitles() {
  try {
    const response = await fetch(
      "https://inaforseth.no/wp/wp-json/wp/v2/posts?_embed"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const posts = await response.json();

    // Extract titles from the posts
    const titles = posts.map((post) => post.title.rendered);

    // Display titles in the about-container
    displayTitles(titles);
  } catch (error) {
    console.error("Error fetching post titles:", error);
  }
}

// Function to display titles in the about-container
function displayTitles(titles) {
  const container = document.querySelector(".about-container");
  if (!container) {
    console.error("about-container not found");
    return;
  }

  const list = document.createElement("ul");
  titles.forEach((title) => {
    const listItem = document.createElement("li");
    listItem.textContent = title;
    list.appendChild(listItem);
  });

  container.appendChild(list);
}

// Function to add images to the about-images section
function addImages() {
  const aboutImagesSection = document.querySelector(".about-images");

  if (!aboutImagesSection) {
    console.error("about-images section not found");
    return;
  }

  const images = [
    {
      src: "images/femalerunnerhill_11zon.jpg",
      alt: "female runner on a hill looking into the horizon",
    },
    {
      src: "images/planning.jpg",
      alt: "map, camera and passport - person planning a trip",
    },
    { src: "images/runnerstairs_11zon.jpg", alt: "person running up stairs" },
  ];

  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    aboutImagesSection.appendChild(imgElement);
  });
}

// Call the functions to fetch and display post titles and add images
document.addEventListener("DOMContentLoaded", () => {
  fetchPostTitles();
  addImages();
});
