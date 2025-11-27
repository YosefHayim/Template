import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

console.log("🧪 Starting test...\n");

// Step 1: Create a test repos.json with a known public repo
console.log("📝 Step 1: Creating test repos.json...");
const testRepos = [
  {
    name: "stack-analyser",
    full_name: "specfy/stack-analyser",
    clone_url: "https://github.com/specfy/stack-analyser.git",
    default_branch: "main",
  },
];

writeFileSync(join(rootDir, "repos.json"), JSON.stringify(testRepos, null, 2));
console.log("✅ Created repos.json with test repository\n");

// Step 2: Test analyze-repos.js
console.log("🔍 Step 2: Testing analyze-repos.js...");
try {
  execSync("node scripts/analyze-repos.js", {
    stdio: "inherit",
    cwd: rootDir,
  });
  console.log("✅ analyze-repos.js completed successfully\n");
} catch (error) {
  console.error("❌ analyze-repos.js failed:", error.message);
  process.exit(1);
}

// Step 3: Verify analysis output exists
console.log("📊 Step 3: Verifying analysis output...");
const analysisDir = join(rootDir, "repos-analysis");
const expectedOutput = join(analysisDir, "stack-analyser.json");

if (existsSync(expectedOutput)) {
  const analysisData = JSON.parse(readFileSync(expectedOutput, "utf-8"));
  console.log("✅ Analysis output file exists");
  console.log(`   Found ${JSON.stringify(analysisData).length} bytes of data`);
  
  // Check if it has expected structure
  if (analysisData.id && (analysisData.techs || analysisData.childs)) {
    console.log("✅ Analysis output has expected structure\n");
  } else {
    console.log("⚠️  Analysis output structure may be unexpected\n");
  }
} else {
  console.error("❌ Analysis output file not found!");
  process.exit(1);
}

// Step 4: Test aggregate-tech-stack.js
console.log("📦 Step 4: Testing aggregate-tech-stack.js...");
try {
  execSync("node scripts/aggregate-tech-stack.js", {
    stdio: "inherit",
    cwd: rootDir,
  });
  console.log("✅ aggregate-tech-stack.js completed successfully\n");
} catch (error) {
  console.error("❌ aggregate-tech-stack.js failed:", error.message);
  process.exit(1);
}

// Step 5: Verify aggregated output
console.log("📈 Step 5: Verifying aggregated output...");
const aggregatedFile = join(rootDir, "aggregated-tech-stack.json");

if (existsSync(aggregatedFile)) {
  const aggregated = JSON.parse(readFileSync(aggregatedFile, "utf-8"));
  console.log("✅ Aggregated output file exists");
  console.log(`   Technologies: ${aggregated.technologies?.length || 0}`);
  console.log(`   Dependencies: ${aggregated.dependencies?.length || 0}`);
  console.log(`   Languages: ${aggregated.languages?.length || 0}`);
  console.log(`   Repositories: ${aggregated.totalRepos}`);
  
  if (aggregated.technologies && aggregated.technologies.length > 0) {
    console.log(`   Sample technologies: ${aggregated.technologies.slice(0, 5).join(", ")}`);
  }
  console.log();
} else {
  console.error("❌ Aggregated output file not found!");
  process.exit(1);
}

// Step 6: Test update-readme.js
console.log("📝 Step 6: Testing update-readme.js...");
try {
  execSync("node scripts/update-readme.js", {
    stdio: "inherit",
    cwd: rootDir,
  });
  console.log("✅ update-readme.js completed successfully\n");
} catch (error) {
  console.error("❌ update-readme.js failed:", error.message);
  process.exit(1);
}

// Step 7: Verify README was updated
console.log("📖 Step 7: Verifying README.md...");
const readmePath = join(rootDir, "README.md");

if (existsSync(readmePath)) {
  const readmeContent = readFileSync(readmePath, "utf-8");
  if (readmeContent.includes("<!-- TECH_STACK_START -->") && 
      readmeContent.includes("<!-- TECH_STACK_END -->")) {
    console.log("✅ README.md contains tech stack markers");
    
    if (readmeContent.includes("🛠️ Technologies") || readmeContent.includes("Technologies")) {
      console.log("✅ README.md contains tech stack content");
    }
    console.log();
  } else {
    console.error("❌ README.md missing tech stack markers!");
    process.exit(1);
  }
} else {
  console.error("❌ README.md not found!");
  process.exit(1);
}

console.log("🎉 All tests passed! ✅");
console.log("\n📋 Summary:");
console.log("   - Repository analysis: ✅");
console.log("   - Tech stack aggregation: ✅");
console.log("   - README update: ✅");
console.log("\n💡 You can now check the generated files:");
console.log(`   - ${aggregatedFile}`);
console.log(`   - ${readmePath}`);

