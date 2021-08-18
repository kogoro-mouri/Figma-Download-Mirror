let fs = require("fs");
let versions = {};
let ls = [{ v: "101", MacOS: "101.5.0" }];

gen("MacOS");
gen("MacOS_ARM");
gen("Windows");

function gen(p = "MacOS") {
  let dir = "./dist/" + p;
  let files = fs.readdirSync(dir).filter((x) => x[0] != ".");

  files.forEach((filename) => {
    let version = /[0-9]+\.[0-9]+\.[0-9]+/.exec(filename)[0];
    console.log("v", dir, filename, version);

    if (!versions[version]) {
      versions[version] = { [p]: version };
    } else {
      versions[version][p] = version;
    }
  });
}

console.log("versions", JSON.stringify(versions, null, 2));

let lines = [];
for (const version in versions) {
  let ob = versions[version];

  console.log("version", version, ob);

  let url = "https://github.com/kogoro-mouri/Figma-Download-Mirror/raw/master/";
  let urlCNPM =
    "https://github.com.cnpmjs.org/kogoro-mouri/Figma-Download-Mirror/raw/master/";

  let line =
    `\`${version}\`` +
    "|" +
    (ob.MacOS
      ? `[MacOS](./dist/MacOS/Figma-${version}.MacOS.zip) ([下载](${url}dist/MacOS/Figma-${version}.MacOS.zip))([下载点 CNPM](${urlCNPM}dist/MacOS/Figma-${version}.MacOS.zip))`
      : "no") +
    "|" +
    (ob.MacOS_ARM
      ? `[MacOS_ARM](./dist/MacOS_ARM/Figma-${version}.MacOS_ARM.zip) ([下载](${url}dist/MacOS_ARM/Figma-${version}.MacOS_ARM.zip))([下载点 CNPM](${urlCNPM}dist/MacOS_ARM/Figma-${version}.MacOS_ARM.zip))`
      : " no ") +
    "|" +
    (ob.Windows
      ? `[Windows](./dist/Windows/Figma-${version}.Windows.zip) ([下载](${url}dist/Windows/Figma-${version}.Windows.zip))([下载点 CNPM](${urlCNPM}dist/Windows/Figma-${version}.Windows.zip))`
      : " no ");

  lines.push({ v: Number.parseFloat(version), line });
}

let text = lines
  .sort((a, b) => b.v - a.v)
  .map((x) => x.line)
  .join("\n");

console.log("text\n\n", text);
