import { initPrism } from "./three";

document.addEventListener("DOMContentLoaded", initPrism);

if (import.meta.env.MODE === "development" && location.pathname === "/") {
  const { initPosts } = await import("./fetch.js");
  initPosts();
}

