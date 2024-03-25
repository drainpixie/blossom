import { marked } from "marked";
import { default as matter } from "gray-matter";

import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { POST_TEMPLATE } from "./templates.mjs";

const ROOT = resolve(import.meta.dirname, "..", "posts");
const DIST = resolve(import.meta.dirname, "..", "dist");
const DIST_POSTS = resolve(DIST, "posts");

function toSlug(title) {
  return title.toLowerCase().replace(/\s/g, "-");
}

readdirSync(ROOT)
  .map((file) => {
    const { data, content } = matter.read(resolve(ROOT, file));
    return { ...data, slug: toSlug(data.title), content: marked(content) };
  })
  .sort((a, b) => a.date - b.date)
  .forEach((post) => {
    mkdirSync(DIST_POSTS, { recursive: true });

    const html = POST_TEMPLATE.replace(/{{title}}/g, post.title)
      .replace(/{{date}}/g, post.date)
      .replace(/{{content}}/g, post.content);

    writeFileSync(resolve(DIST_POSTS, `${post.slug}.html`), html);
  });
