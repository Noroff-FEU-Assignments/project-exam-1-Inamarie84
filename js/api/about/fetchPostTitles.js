import { BASE_URL } from "../../constants/api.js";

export async function fetchPostTitles() {
  const response = await fetch(`${BASE_URL}/wp/v2/posts?_embed`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const posts = await response.json();
  return posts.map((post) => post.title.rendered);
}

export async function fetchImages() {
  // If you have a specific API endpoint for images, use it here
  // For now, let's return a hardcoded list of images
  return [
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
}
