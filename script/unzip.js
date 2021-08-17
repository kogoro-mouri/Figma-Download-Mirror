let fs = require("fs");
let archiver = require("archiver");

let dirs = fs.readdirSync("./dist/Windows").filter((x) => x[0] != ".");

for (const dir of dirs) {
  let name = dir.replace(".nupkg", "");
  let path = `./dist/Windows/${dir}/lib/net45/`;
  archiver;
  console.log("unzip", name, "-", path);

  const output = fs.createWriteStream(`./dist/Windows/${name}.zip`);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });
  archive.directory(path, name);
  archive.pipe(output);
  archive.finalize();
  output.on("end", function () {
    console.log("Data has been drained", name);
  });
}
