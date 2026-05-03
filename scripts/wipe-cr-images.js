const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '..', 'images', 'copperred');
function rm(p) {
  for (const e of fs.readdirSync(p, { withFileTypes: true })) {
    const full = path.join(p, e.name);
    if (e.isDirectory()) { rm(full); fs.rmdirSync(full); }
    else fs.unlinkSync(full);
  }
}
if (fs.existsSync(dir)) { rm(dir); console.log('wiped'); }
