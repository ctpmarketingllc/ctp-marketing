// Remove flat .jpg files in images/queen-tackle/ root — leftovers from the
// pre-subfolder pilot. Keeps subfolders intact.
const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '..', 'images', 'queen-tackle');
let removed = 0;
for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.jpg')) {
    fs.unlinkSync(path.join(dir, entry.name));
    removed++;
  }
}
console.log(`Removed ${removed} orphan files.`);
