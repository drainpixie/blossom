#! /usr/bin/env nix-shell
/*
#! nix-shell -i node -p nodejs
*/

/**
 * @typedef {Object} BookParts
 * @property {string} slug
 * @property {string} title
 * @property {string} cover
 * @property {string} description
 * @property {Array<{name: string}>} authors
 */

/**
 * @typedef {Object} ReadingState
 * @property {BookParts} book
 * @property {'WANTS_TO_READ' | 'IS_READING' | 'FINISHED' | 'DROPPED' | 'NONE'} status
 * @property {string} createDate
 */

import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const url = "https://literal.club/graphql";
const username = "nullptr";

const query = `
query getBooks($username: String) {
  profile(where: { handle: $username }) {
    readingStates(first: 100, orderBy: { createdAt: desc }) {
      createdAt
      status
      book {
				slug
        title
				cover
				description	

        authors {
          name
        }
      }
    }
  }
}
`;

const response = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query,
    variables: { username },
    operationName: "getBooks",
  }),
});

const result = await response.json();

/**
 * @type {ReadingState[]}
 */
const readingStates = result?.data?.profile?.readingStates || [];
const byStatus = {
  read: [],
  toRead: [],
  reading: [],
  uncategorised: [],
};

for (const state of readingStates) {
  const { status, book } = state;
  const resolve = (book) =>
    `- [${book.title}](${`https://www.goodreads.com/book/${book.slug}`}) by ${book.authors.map((a) => a.name).join(", ")}`;

  switch (status) {
    case "FINISHED":
      byStatus.read.push(resolve(book));
      break;
    case "IS_READING":
      byStatus.reading.push(resolve(book));
      break;
    case "WANTS_TO_READ":
      byStatus.toRead.push(resolve(book));
      break;
    default:
      byStatus.uncategorised.push(resolve(book));
      break;
  }
}

const markdown = `
+++

title = "Books"
description = "A recap of books, I own, read, or want to read."
date = ${new Date().toISOString().split("T")[0]}

[taxonomies]
tags = ["000", "productivity"]

+++

For more detailed reviews, I have a [literal.club](https://literal.club/${username}) account.  
The following data is fetched from the aforementioned website every CI run.  
<br />


## Read

${byStatus.read.join("\n")}

## Reading

${byStatus.reading.join("\n")}

## To Read

${byStatus.toRead.join("\n")}

## Uncategorised 

${byStatus.uncategorised.join("\n")}
`;

await writeFile(
  resolve(process.cwd(), "content", "meta", "books.md"),
  markdown,
  "utf-8",
);
