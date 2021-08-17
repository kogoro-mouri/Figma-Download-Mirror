const fs = require("fs");
const download = require("download");
const axios = require("axios");
const { join } = require("path");

async function main(p = "mac") {
  console.log(
    "[check]",
    `https://desktop.figma.com/${p}/Figma-99.0.0.zip`,
    await axios.head(`https://desktop.figma.com/${p}/Figma-99.0.0.zip`)
  );

  let ob = [];

  for (let index = 0; index < 101; index++) {
    let mainVersion = 101 - index;
    let subVersion = 0;
    let sub2Version = 0;

    for (let j = 0; j < 10; j++) {
      subVersion = j;
      for (let k = 0; k < 5; k++) {
        sub2Version = k;
        let version = `${mainVersion}.${subVersion}.${sub2Version}`;
        let url = `https://desktop.figma.com/${p}/Figma-${version}.zip`;

        try {
          axios
            .head(url, {
         
            })
            .then((re) => {
              if (re && re.status == 200) {
                ob.push({ version, url });
                fs.writeFileSync(
                  `./download-versions-${p}.json`,
                  JSON.stringify(ob, null, 2)
                );
              }
              console.log("[check] ok", url, re.status);
            })
            .catch((error) => console.log("[check]", url, "error"));
        } catch (error) {
          console.log("[check]", url, "error");
        }
      }
    }
  }
}

main();
