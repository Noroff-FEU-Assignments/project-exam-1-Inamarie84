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

// Call the function to fetch and display post titles
fetchPostTitles();
