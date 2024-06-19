// Function to create a post element
export function createPostElement(post) {
  const { title, content, _embedded } = post;
  const postElement = document.createElement("div");
  postElement.classList.add("carousel-post");

  const titleElement = document.createElement("h4");
  titleElement.innerText = title.rendered;
  postElement.appendChild(titleElement);

  const featuredImageUrl = extractFeaturedImageUrl(_embedded);
  if (featuredImageUrl) {
    const imageElement = document.createElement("img");
    imageElement.src = featuredImageUrl;
    postElement.appendChild(imageElement);
  }

  const contentElement = document.createElement("div");
  contentElement.innerHTML = content.rendered;
  postElement.appendChild(contentElement);

  return postElement;
}

// Extract featured image URL function
export function extractFeaturedImageUrl(embedded) {
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
