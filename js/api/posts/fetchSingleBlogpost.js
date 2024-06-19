import { BASE_URL } from "../../constants/api.js";

export async function fetchSinglePost(id) {
  const url = `${BASE_URL}/posts/${id}`; // Assuming /posts/ is the endpoint for individual blog posts

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch single blog post. Status: ${response.statusText}`
      );
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching single blog post:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
}
