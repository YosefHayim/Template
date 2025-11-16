// Post-build script to fix import.meta references in dist/index.js
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist', 'index.js');

console.log('🔧 Fixing import.meta references in dist/index.js...');

try {
  let content = fs.readFileSync(distPath, 'utf8');

  // Count occurrences before fix
  const before = (content.match(/import\.meta/g) || []).length;
  console.log(`Found ${before} import.meta references`);

  // Replace import.meta.env with undefined
  // This is safe because the code has fallbacks: process.env || import.meta.env || Deno.env || ...
  content = content.replace(/import\.meta\.env/g, 'undefined');
  content = content.replace(/import\.meta/g, 'undefined');

  // Count occurrences after fix
  const after = (content.match(/import\.meta/g) || []).length;

  if (after === 0) {
    fs.writeFileSync(distPath, content, 'utf8');
    console.log(`✅ Fixed ${before} import.meta references`);
    console.log('✅ dist/index.js is now compatible with Node.js');
  } else {
    console.log(`⚠️  Still ${after} import.meta references remaining`);
  }

} catch (error) {
  console.error('❌ Error fixing dist/index.js:', error.message);
  process.exit(1);
}
