import Link from "@/components/Link";

import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import matter from "gray-matter";

const POSTS_DIR = resolve(process.cwd(), "posts");

export default async function Home() {
  const posts = readdirSync(POSTS_DIR).map((file) => {
    const content = readFileSync(resolve(POSTS_DIR, file), "utf-8");
    const { data } = matter(content);

    return {
      meta: data,
      slug: file.replace(/\.mdx$/, ""),
    };
  });

  return (
    <>
      <div>
        <h1>Faye Keller</h1>
        <p>
          Enchantress of <span className="highlight">digital ecosystems</span>
        </p>
        <p>
          <span className="highlight">DevOps</span> sorcery and{" "}
          <span className="highlight">backend</span> wizardry.
        </p>

        <br />

        <p>
          You can contact me on{" "}
          <Link
            href="https://discord.com/users/1057755295574671421"
            text="Discord"
          />
          <br />
          My code is on{" "}
          <Link href="https://github.com/drainpixie" text="Github" />
        </p>
      </div>

      <div>
        <h1>My ravings</h1>
        <p>Some of my thoughts and musings.</p>

        <br />

        <div className="posts">
          {posts.map((post) => (
            <div key={post.slug}>
              <h2>{post.meta.title}</h2>
              <p>
                {post.meta.description
                  .split("*")
                  .map((part: string, index: number) => {
                    if (part === "!break") return <br key={index} />;

                    return (
                      <span
                        key={index}
                        className={index % 2 === 0 ? "" : "highlight"}
                      >
                        {part}
                      </span>
                    );
                  })}
                <br />
                <Link
                  open={false}
                  href={`/posts/${post.slug}`}
                  text="Read more"
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
