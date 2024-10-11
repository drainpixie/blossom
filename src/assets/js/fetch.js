import { getLanguage } from "./translate";

export const createPostPreview = ({ date, tags, link, title }) => `
    <div> 
				<p><a href="${link}">${title}</a></p>
        <p>${date} ${tags.join(", ")}</p>
    </div>`;

export const filterByLanguage = (posts, lang) =>
  posts.filter((post) => post.link.split(".")[1] === lang);

export async function initPosts() {
  const response = await fetch("/api/posts");

  let posts = await response.json();
  posts = filterByLanguage(posts, getLanguage());

  const container = document.getElementById("posts-container");
  for (const post of posts) {
    const div = document.createElement("div");
    div.innerHTML = createPostPreview(post);
    container.appendChild(div);
  }
}
