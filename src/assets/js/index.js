import { initPrism } from "./three";
import { initTranslate } from "./translate.js";

document.addEventListener("DOMContentLoaded", async () => {
  await initTranslate();
  initPrism();
});

if (
  import.meta.env.MODE === "development" &&
  ["/", "/index.html"].includes(window.location.pathname)
) {
  const { initPosts } = await import("./fetch.js");
  initPosts();
}
