#! /usr/bin/env nix-shell
/*
#! nix-shell -i node -p nodejs_23
*/

import { writeFile, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const games = JSON.parse(
  await readFile(resolve(import.meta.dirname, "games.json"), "utf-8"),
).sort((a, b) => b.rating - a.rating);

const byStatus = {
  Completed: [],
  Playing: [],
};

for (const game of games) {
  if (!byStatus[game.status]) continue;

  if (!byStatus[game.status][game.platform]) {
    byStatus[game.status][game.platform] = [];
  }

  byStatus[game.status][game.platform].push(
    `<li>
      <a href="${game.url}">${game.title}</a>
      <p>${game.hours} hours, ${game.rating}/10</p>
    </li>`,
  );
}

function formatGamesByPlatform(status) {
  return Object.entries(byStatus[status])
    .map(
      ([platform, games]) => `### ${platform}
<ul>
${games.join("\n")} 
</ul>`,
    )
    .join("\n\n");
}

const markdown = `
+++

title = "Games"
description = "A recap of games I played or I'm currently playing."
date = ${new Date().toISOString().split("T")[0]}

[taxonomies]
tags = ["000"]

+++

Obviously incomplete, but enough for most purposes.  

<br />  


## Playing

${formatGamesByPlatform("Playing")}

## Completed 

${formatGamesByPlatform("Completed")}

`;

await writeFile(
  resolve(process.cwd(), "content", "meta", "games.md"),
  markdown,
  "utf-8",
);
