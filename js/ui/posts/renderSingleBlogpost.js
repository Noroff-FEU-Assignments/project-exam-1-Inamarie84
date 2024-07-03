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

    // Add event listener to open modal on image click
    imageElement.addEventListener("click", () => {
      openModal(featuredImageUrl, ""); // No caption for featured image
    });
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

  // Modal functionality
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const closeModal = document.querySelector(".modal .close");

  function openModal(imageSrc, caption) {
    modal.style.display = "block";
    modalImg.src = imageSrc;
    captionText.innerHTML = caption;
  }

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Add click event listeners to images inside the post content
  const postImages = contentElement.querySelectorAll("img");
  postImages.forEach((img) => {
    img.addEventListener("click", () => {
      openModal(img.src, img.alt);
    });
  });

  // Add click event listeners to images under wp:term if they exist
  const termImages = extractTermImages(_embedded);
  termImages.forEach((imgUrl) => {
    const termImageElement = document.createElement("img");
    termImageElement.src = imgUrl;
    termImageElement.classList.add("term-image");
    element.appendChild(termImageElement);

    termImageElement.addEventListener("click", () => {
      openModal(imgUrl, ""); // No caption for term images
    });
  });
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

// Function to extract image URLs from wp:term object
function extractTermImages(embedded) {
  const images = [];
  if (embedded && embedded["wp:term"]) {
    embedded["wp:term"].forEach((term) => {
      if (term.source_url) {
        images.push(term.source_url);
      }
    });
  }
  return images;
}
