// renderSingleBlogPost.js
export function renderSingleBlogPost(targetElement, post) {
  const element = document.querySelector(targetElement);
  if (!element) {
    console.error(`Element with selector ${targetElement} not found`);
    return;
  }

  // Clear previous content
  element.innerHTML = "";

  // Destructure the post object
  const { title, content, _embedded } = post;

  // Create and append the title element
  const titleElement = document.createElement("h1");
  titleElement.innerText = title.rendered;
  element.appendChild(titleElement);

  // Extract and append the featured image if available
  const featuredImageUrl = extractFeaturedImageUrl(_embedded);
  if (featuredImageUrl) {
    const imageElement = document.createElement("img");
    imageElement.src = featuredImageUrl;
    imageElement.classList.add("featured-image");
    element.appendChild(imageElement);
  }

  // Create and append the content element
  const contentElement = document.createElement("div");
  contentElement.innerHTML = content.rendered;
  element.appendChild(contentElement);
}

// Function to extract featured image URL from _embedded object
function extractFeaturedImageUrl(embedded) {
  if (
    embedded &&
    embedded["wp:featuredmedia"] &&
    embedded["wp:featuredmedia"][0] &&
    embedded["wp:featuredmedia"][0].source_url
  ) {
    return embedded["wp:featuredmedia"][0].source_url;
  }
  return null;
}
