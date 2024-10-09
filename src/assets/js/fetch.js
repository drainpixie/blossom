export const createPostPreview = ({ date, tags, link, title }) => `
    <div> 
        <p><span class="highlight">${date}</span> ${tags.join(", ")}</p>
        <p><a class="lowkey" href="${link}">${title}</a></p>
    </div>`;

export async function initPosts() {
  const response = await fetch("/api/posts");
  const posts = await response.json();

  const container = document.getElementById("posts-container");
  for (const post of posts) {
    const div = document.createElement("div");
    div.innerHTML = createPostPreview(post);
    container.appendChild(div);
  }
}
