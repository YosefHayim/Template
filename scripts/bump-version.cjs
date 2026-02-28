const fs = require("fs");
const path = require("path");

const pkgPath = path.join(process.cwd(), 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const [major, minor, patch] = pkg.version.split('.').map(Number);
pkg.version = [major, minor + 1, patch].join('.');
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
