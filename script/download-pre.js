let list = require("../download-versions-mac-sort.json");
const download = require("download");
const axios = require("axios");
const fs = require("fs");

console.log("list", list);

let ob = [];
(async () => {
  for (const info of list) {
    let url_macos = `https://desktop.figma.com/mac/Figma-${info.version}.zip`;
    let url_windows = `https://desktop.figma.com/win/Figma-${info.version}-full.nupkg`;
    let url_macos_arm = `https://desktop.figma.com/mac-arm/Figma-${info.version}.zip`;

    await Promise.all([
      dowonloadOne(info, url_macos, `Figma-${info.version}.MacOS.zip`, "MacOS"),
      dowonloadOne(
        info,
        url_macos_arm,
        `Figma-${info.version}.MacOS_ARM.zip`,
        "MacOS_ARM"
      ),
      dowonloadOne(
        info,
        url_windows,
        `Figma-${info.version}.Windows.nupkg.zip`,
        "Windows"
      ),
    ]);

    fs.writeFileSync(
        `./download-versions-pre.json`,
        JSON.stringify(ob, null, 2)
      );
  }
})();

async function dowonloadOne(info, url, name, p) {
  console.log("[download]------ check", url);
  await axios
    .head(url)
    .then(async (re) => {
      if (re && re.status == 200) {
        console.log(" [download] start", url);
        ob.push({ name, url });
      }
    })
    .catch((error) => console.log(" [download] error", url, "error"));
}
