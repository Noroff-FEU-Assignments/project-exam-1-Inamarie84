export function renderPostTitles(titles) {
  const container = document.querySelector(".about-container");
  if (!container) {
    console.error("about-container not found");
    return;
  }

  container.innerHTML = ""; // Clear any existing content

  const list = document.createElement("ul");
  titles.forEach((title) => {
    const listItem = document.createElement("li");
    listItem.textContent = title;
    list.appendChild(listItem);
  });

  container.appendChild(list);

  // Create and add the "Read More" button
  const readMoreButton = document.createElement("a");
  readMoreButton.href = "blogposts.html";
  readMoreButton.textContent = "Read More";
  readMoreButton.classList.add("read-more-button"); // Optional: Add a class for styling
  container.appendChild(readMoreButton);
}

export function renderImages(images) {
  const aboutImagesSection = document.querySelector(".about-images");

  if (!aboutImagesSection) {
    console.error("about-images section not found");
    return;
  }

  aboutImagesSection.innerHTML = ""; // Clear any existing content

  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    aboutImagesSection.appendChild(imgElement);
  });
}
