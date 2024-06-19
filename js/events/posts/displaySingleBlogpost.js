// import { fetchSingleBlogPost } from "../../api/posts/fetchSingleBlogpost.js";
// import { displayMessage } from "../../ui/shared/displayMessage.js";
// import { renderSingleBlogPost } from "../../ui/posts/renderSingleBlogpost.js";

// export async function displaySingleBlogPost() {
//   // get id from the query string
//   const search = window.location.search;
//   const params = new URLSearchParams(search);
//   const id = params.get("id");

//   if (!id) {
//     return (location.href = "/");
//   }

//   try {
//     const singlePost = await fetchSingleBlogPost(id);
//     console.log(singlePost);
//     renderProduct("#singlepost-container", singlePost);
//   } catch (error) {
//     // display error to the user
//     console.error(error);
//     displayMessage(
//       "#singlepost-container",
//       "error",
//       "There was an error fetching the blogpost"
//     );
//   }
// }
