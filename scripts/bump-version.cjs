const fs = require('node:fs');
const path = require('node:path');

const pkgPath = path.join(process.cwd(), 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const [major, minor, patch] = pkg.version.split('.').map(Number);

let newMinor = minor;
let newPatch = patch + 1;

if (newPatch >= 100) {
  newMinor = minor + 1;
  newPatch = 0;
}

pkg.version = [major, newMinor, newPatch].join('.');
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`bumped → ${pkg.version}`);
