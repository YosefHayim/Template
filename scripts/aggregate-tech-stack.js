import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const analysisDir = join(rootDir, 'repos-analysis');
const outputFile = join(rootDir, 'aggregated-tech-stack.json');

console.log('Aggregating tech stack from all repositories...');

const allTechs = new Set();
const allDependencies = new Set();
const allLanguages = new Map();
const repoTechs = new Map(); // Map of repo -> techs

// Check if we have a combined analysis file from GitHub Action
const combinedFile = join(analysisDir, 'combined-analysis.json');
let files = [];

if (existsSync(combinedFile)) {
  // Use the combined analysis from GitHub Action
  console.log('Using combined analysis from GitHub Action...');
  files = [{ path: combinedFile, name: 'combined-analysis.json' }];
} else {
  // Fall back to individual files (for local testing)
  console.log('Using individual analysis files...');
  files = readdirSync(analysisDir)
    .filter(f => f.endsWith('.json') && f !== 'summary.json' && f !== 'combined-analysis.json')
    .map(f => ({ path: join(analysisDir, f), name: f }));
}

// Extract techs from the analysis result
const extractTechs = (node, repoName = 'unknown') => {
      if (node.techs && Array.isArray(node.techs)) {
        node.techs.forEach(tech => {
          if (tech) {
            allTechs.add(tech);
            if (!repoTechs.has(repoName)) {
              repoTechs.set(repoName, new Set());
            }
            repoTechs.get(repoName).add(tech);
          }
        });
      }
      
      if (node.tech && node.tech !== null) {
        allTechs.add(node.tech);
        if (!repoTechs.has(repoName)) {
          repoTechs.set(repoName, new Set());
        }
        repoTechs.get(repoName).add(node.tech);
      }
      
      if (node.dependencies && Array.isArray(node.dependencies)) {
        node.dependencies.forEach(dep => {
          if (Array.isArray(dep) && dep.length >= 2) {
            const depName = dep[1]; // e.g., "react", "fastify"
            allDependencies.add(depName);
          }
        });
      }
      
      if (node.languages && typeof node.languages === 'object') {
        Object.entries(node.languages).forEach(([lang, count]) => {
          const current = allLanguages.get(lang) || 0;
          allLanguages.set(lang, current + count);
        });
      }
      
      if (node.childs && Array.isArray(node.childs)) {
        // Try to determine repo name from node name or path
        const childRepoName = node.name || repoName;
        node.childs.forEach(child => extractTechs(child, childRepoName));
      }
    };

for (const file of files) {
  try {
    const data = JSON.parse(readFileSync(file.path, 'utf-8'));
    
    // If this is a combined analysis, extract repo names from child nodes
    if (file.name === 'combined-analysis.json' && data.childs) {
      // Process each child (each repo) separately
      data.childs.forEach((child) => {
        const repoName = child.name || 'unknown';
        extractTechs(child, repoName);
      });
    } else {
      // Individual file - use filename as repo name
      const repoName = file.name.replace('.json', '');
      extractTechs(data, repoName);
    }
    
  } catch (error) {
    console.error(`Error processing ${file.name}: ${error.message}`);
  }
}

// Convert to sorted arrays
const sortedTechs = Array.from(allTechs).sort();
const sortedDependencies = Array.from(allDependencies).sort();
const sortedLanguages = Array.from(allLanguages.entries())
  .sort((a, b) => b[1] - a[1]) // Sort by count descending
  .map(([lang, count]) => ({ name: lang, count }));

// Create aggregated result
const aggregated = {
  timestamp: new Date().toISOString(),
  totalRepos: repoTechs.size || files.length,
  technologies: sortedTechs,
  dependencies: sortedDependencies,
  languages: sortedLanguages,
  repoBreakdown: Object.fromEntries(
    Array.from(repoTechs.entries()).map(([repo, techs]) => [
      repo,
      Array.from(techs).sort()
    ])
  )
};

// Write aggregated result
writeFileSync(outputFile, JSON.stringify(aggregated, null, 2));

console.log(`✅ Aggregation complete!`);
console.log(`   Technologies found: ${sortedTechs.length}`);
console.log(`   Dependencies found: ${sortedDependencies.length}`);
console.log(`   Languages found: ${sortedLanguages.length}`);
console.log(`   Repositories analyzed: ${repoTechs.size || files.length}`);

