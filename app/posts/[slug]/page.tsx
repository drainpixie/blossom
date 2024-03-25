import { readdirSync } from "node:fs";
import { resolve } from "node:path";

import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

import styles from "./page.module.css";

const POSTS_DIR = resolve(process.cwd(), "posts");

export async function generateStaticParams() {
  return readdirSync(POSTS_DIR).map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

function getPost({ slug }: { slug: string }) {
  const { data, content: body } = matter.read(
    resolve(POSTS_DIR, `${slug}.mdx`)
  );

  return {
    meta: data,
    body,
  };
}

export default function Post({ params }: { params: any }) {
  const { meta, body } = getPost(params);

  return (
    <div>
      <div className={styles.header}>
        <h1>{meta.title}</h1>
        <p>{new Date(meta.date).toDateString()}</p>
      </div>

      <div className={styles.content}>
        <MDXRemote source={body} />
      </div>
    </div>
  );
}
