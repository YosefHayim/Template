// Test that the dist/index.js file is valid JavaScript and doesn't have syntax errors
const fs = require('fs');
const vm = require('vm');

console.log('🧪 Testing dist/index.js for syntax errors...\n');

try {
  const code = fs.readFileSync('/home/user/readme-profile-tech-stack-sync/dist/index.js', 'utf8');

  // Try to parse it
  new vm.Script(code);

  console.log('✅ dist/index.js has no syntax errors');
  console.log(`📦 File size: ${(code.length / 1024).toFixed(2)} KB`);

  // Check for any remaining autoload references
  if (code.includes('autoload')) {
    console.log('⚠️  WARNING: Found "autoload" in the compiled dist file');
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      if (line.includes('autoload')) {
        console.log(`   Line ${i + 1}: ${line.trim().substring(0, 100)}`);
      }
    });
  } else {
    console.log('✅ No "autoload" references found');
  }

  // Check that it has the key imports
  const hasAnalyser = code.includes('stack-analyser');
  const hasOctokit = code.includes('octokit');
  const hasCore = code.includes('@actions/core');

  console.log(`✅ Contains stack-analyser: ${hasAnalyser}`);
  console.log(`✅ Contains octokit: ${hasOctokit}`);
  console.log(`✅ Contains @actions/core: ${hasCore}`);

  console.log('\n✅ The dist/index.js file appears to be valid and ready to use!');

} catch (error) {
  console.error('❌ Error in dist/index.js:', error.message);
  process.exit(1);
}
