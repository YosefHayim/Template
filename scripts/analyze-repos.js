import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

import { dirname } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const reposFile = join(rootDir, "repos.json");
const analysisDir = join(rootDir, "repos-analysis");
const tempReposDir = join(rootDir, "temp-repos");

// Ensure directories exist
mkdirSync(analysisDir, { recursive: true });
mkdirSync(tempReposDir, { recursive: true });

// Read repositories list
const repos = JSON.parse(readFileSync(reposFile, "utf-8"));

console.log(`Starting analysis of ${repos.length} repositories...`);

const results = [];
const errors = [];

async function analyzeRepos() {
  for (let i = 0; i < repos.length; i++) {
  const repo = repos[i];
  console.log(`[${i + 1}/${repos.length}] Analyzing: ${repo.full_name}`);

  try {
    const repoPath = join(tempReposDir, repo.name);
    const outputPath = join(analysisDir, `${repo.name}.json`);

    // Skip if already analyzed (for re-runs)
    if (existsSync(outputPath)) {
      console.log(`  ⏭️  Skipping (already analyzed)`);
      continue;
    }

    // Clone repository (shallow clone for speed)
    console.log(`  📥 Cloning...`);
    execSync(`git clone --depth 1 --branch ${repo.default_branch} ${repo.clone_url} ${repoPath}`, {
      stdio: "inherit",
      cwd: rootDir,
    });

    // Run stack-analyser
    // Note: stack-analyser requires output path to be relative to current working directory
    console.log(`  🔍 Analyzing tech stack...`);
    try {
      // Use relative paths from rootDir
      const relativeRepoPath = repoPath.replace(rootDir + "/", "");
      const relativeOutputPath = outputPath.replace(rootDir + "/", "");
      
      execSync(`npx -y @specfy/stack-analyser "${relativeRepoPath}" --output "${relativeOutputPath}"`, {
        stdio: "inherit",
        cwd: rootDir,
      });

      // Verify output was created
      if (existsSync(outputPath)) {
        console.log(`  ✅ Analysis complete`);
        results.push({
          repo: repo.full_name,
          status: "success",
          output: outputPath,
        });
      } else {
        throw new Error("Output file was not created");
      }
    } catch (error) {
      console.error(`  ❌ Analysis failed: ${error.message}`);
      errors.push({
        repo: repo.full_name,
        error: error.message,
      });
    }

    // Clean up cloned repository
    execSync(`rm -rf "${repoPath}"`, {
      stdio: "inherit",
      cwd: rootDir,
    });
  } catch (error) {
    console.error(`  ❌ Failed to process ${repo.full_name}: ${error.message}`);
    errors.push({
      repo: repo.full_name,
      error: error.message,
    });
  }

  // Small delay to avoid rate limiting
  if (i < repos.length - 1) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

// Clean up temp directory
execSync(`rm -rf "${tempReposDir}"`, {
  stdio: "inherit",
  cwd: rootDir,
});

console.log(`\n✅ Analysis complete!`);
console.log(`   Success: ${results.length}`);
console.log(`   Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log(`\n⚠️  Errors encountered:`);
  errors.forEach((err) => {
    console.log(`   - ${err.repo}: ${err.error}`);
  });
}

  // Write summary
  writeFileSync(join(analysisDir, "summary.json"), JSON.stringify({ results, errors, timestamp: new Date().toISOString() }, null, 2));
}

// Run the async function
analyzeRepos().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
