export function renderBlogPosts(targetElement, posts) {
  const element = document.querySelector(targetElement);
  element.innerHTML = "";

  const postHtml = posts.map(function (post) {
    return createHtmlForPost(post);
  });

  console.log(postHtml);
  element.append(...postHtml);
}

function createHtmlForPost(post) {
  const { title, content, id } = post;
  const postItem = document.createElement("div");
  postItem.classList.add("post");

  // Create and append the title
  const titleElement = document.createElement("h4");
  titleElement.innerText = title.rendered;
  postItem.appendChild(titleElement);

  // Create and append the content
  const contentElement = document.createElement("div");
  contentElement.innerHTML = content.rendered;

  // Extract the image URL from the content
  const imageUrl = extractImageUrl(content.rendered);

  // If image URL exists, create and append the image
  if (imageUrl) {
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    postItem.appendChild(imageElement);
  }

  postItem.appendChild(contentElement);

  // Set the href attribute for the post item
  postItem.setAttribute("href", `post.html?id=${id}`);

  return postItem;
}

function extractImageUrl(content) {
  const regex =
    /<figure class="wp-block-gallery[^>]*>\s*<figure class="wp-block-image[^>]*>\s*<img[^>]+src="?([^"\s]+)"?[^>]*>\s*<\/figure>\s*<\/figure>/g;
  const match = regex.exec(content);
  return match ? match[1] : null;
}
