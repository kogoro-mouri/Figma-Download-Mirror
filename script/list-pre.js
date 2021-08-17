const fs = require("fs");
const list = require("../download-versions-pre.json");

fs.writeFileSync(
  "./download-pre.text",
  list.map((x) => `${x.name} | [${x.url}](${x.url})`).join("\n")
);
