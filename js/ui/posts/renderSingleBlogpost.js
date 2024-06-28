export function renderSingleBlogPost(targetElement, post) {
  const element = document.querySelector(targetElement);
  if (!element) {
    console.error(`Element with selector ${targetElement} not found`);
    return;
  }

  // Clear previous content
  element.innerHTML = "";

  // Log post object for debugging
  console.log("Post object:", post);

  // Check if post has the required properties
  if (!post || !post.title || !post.content) {
    console.error("Post data is missing required properties");
    return;
  }

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

  // Create and append the back button
  const backButtonContainer = document.createElement("div");
  backButtonContainer.id = "back-button-container";
  const backButton = document.createElement("button");
  backButton.id = "back-button";
  backButton.innerText = "Back";
  backButton.classList.add("custom-back-button"); // Add a class to the button
  backButton.addEventListener("click", () => {
    window.history.back();
  });
  backButtonContainer.appendChild(backButton);
  element.appendChild(backButtonContainer);
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
