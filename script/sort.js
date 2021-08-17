let list = require("../download-versions-mac.json");
const fs = require("fs");
fs.writeFileSync(`./download-versions-mac-sort.json`, JSON.stringify(list.sort((a,b)=>{

return Number.parseInt(b.version) - Number.parseInt(a.version)

}), null, 2));
