import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";
import { createPostPreview } from "../src/assets/js/fetch";
import matter from "gray-matter";
import markdown from "markdown-it";
import markdownAttrs from "markdown-it-attrs";
import markdownItBracketedSpans from "markdown-it-bracketed-spans";

const md = new markdown({
  html: true,
  linkify: true,
  typographer: true,
});

md.use(markdownItBracketedSpans).use(markdownAttrs);

const defaultLinkOpen =
  md.renderer.rules.link_open ??
  ((tokens, idx, options, _, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.link_open ??= (tokens, idx, options, env, self) => {
  const token = tokens[idx];

  token.attrSet("target", "_blank");
  token.attrSet("rel", "noopener noreferrer");

  return defaultLinkOpen(tokens, idx, options, env, self);
};

// A "typographical widow" is a single word on a line by itself.
// This rule prevents typographical widows by adding a non-breaking space.
md.core.ruler.after("inline", "avoid_widows", (state) => {
  for (const token of state.tokens) {
    if (token.type !== "inline") continue;
    if (!token.content) continue;

    const words = token.content.trim().split(" ");
    const last = words.splice(words.length - 2, 2);

    token.content = words.join(" ") + "&nbsp;" + last.join(" ");
  }
});

const getDirectories = (cwd) => ({
  posts: resolve(cwd, "src", "posts"),
  output: resolve(cwd, "dist", "posts"),
});

const createHTML = ({ title, date, tags, content, description }) => `
<html>
    <head>
        <title>${title}</title>
        <link rel="stylesheet" href="/assets/css/post.css" />
        
        <meta charset="UTF-8">
        <meta name="date" content="${date}" />
        <meta name="tags" content="${tags.join(", ")}" />
        <meta name="description" content="${description}" />
        <meta name="keywords" content="${tags.join(", ")}" />
        
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://drainpixie.me/">
        <meta property="og:title" content="Faye Keller">
        <meta property="og:description" content="${description}">   
    
        <meta property="twitter:url" content="https://drainpixie.me/">
        <meta property="twitter:title" content="Faye Keller">
        <meta property="twitter:description" content="${description}">
        
        <link rel="apple-touch-icon" sizes="57x57" href="/assets/icons/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/icons/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/icons/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/icons/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/icons/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/icons/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/icons/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/assets/icons/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png">
        <meta name="msapplication-TileImage" content="/assets/icons/ms-icon-144x144.png">
        <meta name="msapplication-TileColor" content="#e9eb93">
        <meta name="theme-color" content="#e9eb93">    
        <link rel="manifest" href="/assets/icons/manifest.json">
    </head>
    <body>
        <div class="canvas-container">
            <canvas id="three-canvas"></canvas>
        </div>
        <h1><a class="back" href="/">${title}</a></h1>
        ${content}
    </body>
    <script type="module" src="/assets/js/index.js"></script>
</html>`;

const readMarkdownFile = async (filePath) => {
  const content = await readFile(filePath, "utf-8");
  return matter(content);
};

const createPostLink = (filePath) => `/posts/${basename(filePath, ".md")}.html`;

const processPost = async (filePath) => {
  const { data, content } = await readMarkdownFile(filePath);

  return {
    ...data,
    pin: data.pin ?? false,
    filePath,
    link: createPostLink(filePath),
    content: md.render(content),
  };
};

const comparePostsByDate = (a, b) => {
  if (a.pin !== b.pin) return b.pin ? 1 : -1;
  const numA = parseInt(basename(a.filePath, ".md"));
  const numB = parseInt(basename(b.filePath, ".md"));
  return numB - numA;
};

const getMarkdownFiles = async (dir) => {
  const files = await readdir(dir);

  return files
    .filter((file) => extname(file) === ".md")
    .map((file) => join(dir, file));
};

const processPosts = async (postsDir) => {
  const files = await getMarkdownFiles(postsDir);
  const posts = await Promise.all(files.map(processPost));
  return posts.sort(comparePostsByDate);
};

const writePostHTML = async (post, outDir) => {
  const htmlContent = createHTML({
    title: post.title,
    date: post.date,
    tags: post.tags,
    content: post.content,
    description: post.description,
  });

  await writeFile(
    join(outDir, basename(post.filePath, ".md") + ".html"),
    htmlContent,
    "utf-8",
  );

  console.log(`✔ Generated ${post.title}`);

  return post;
};

const injectPostsIntoIndex = async (posts, cwd) => {
  const indexPath = resolve(cwd, "dist", "index.html");
  const indexContent = await readFile(indexPath, "utf-8");
  const postsHTML = posts.map(createPostPreview).join("");

  return indexContent.replace(
    '<div id="posts-container"></div>',
    `<div id="posts-container">${postsHTML}</div>`,
  );
};

const createPostsMiddleware = (postsDir) => async (req, res, next) => {
  try {
    if (req.url === "/api/posts") {
      const posts = await processPosts(postsDir);
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(posts));
    }

    if (req.url.startsWith("/posts/")) {
      const file = req.url.replace("/posts/", "").replace(".html", ".md");
      const post = await processPost(join(postsDir, file));
      res.setHeader("Content-Type", "text/html");
      return res.end(createHTML(post));
    }

    next();
  } catch (error) {
    console.error("Error processing request:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
};

export function blogPlugin() {
  let dirs;

  return {
    name: "blog",
    configureServer(server) {
      dirs = getDirectories(process.cwd());
      server.middlewares.use(createPostsMiddleware(dirs.posts));
    },
    async closeBundle() {
      dirs ??= getDirectories(process.cwd());
      await mkdir(dirs.output, { recursive: true });

      const posts = await processPosts(dirs.posts);
      await Promise.all(posts.map((post) => writePostHTML(post, dirs.output)));

      const index = await injectPostsIntoIndex(posts, process.cwd());
      await writeFile(resolve(process.cwd(), "dist", "index.html"), index);

      await Promise.all(
        posts.map(async (post) =>
          writeFile(
            resolve(dirs.output, basename(post.filePath, ".md") + ".html"),
            Object.entries(
              JSON.parse(
                await readFile(
                  resolve(process.cwd(), "dist", ".vite", "manifest.json"),
                  "utf-8",
                ),
              ),
            )
              .filter((x) => x[0].startsWith("assets"))
              .map((x) => ({ lookup: x[0], replace: x[1].file }))
              .reduce(
                (content, x) => content.replace(x.lookup, x.replace),
                await readFile(
                  resolve(
                    dirs.output,
                    basename(post.filePath, ".md") + ".html",
                  ),
                  "utf-8",
                ),
              ),
            "utf-8",
          ),
        ),
      );

      console.log("✔ Generated posts");
    },
  };
}
