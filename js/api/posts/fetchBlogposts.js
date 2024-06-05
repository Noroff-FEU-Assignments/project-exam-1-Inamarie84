import { BASE_URL } from "../../constants/api.js";

export async function fetchBlogPosts() {
  const url = BASE_URL; // Just use the BASE_URL directly
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  return json;
}
