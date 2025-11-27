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

// Read all analysis files
const files = readdirSync(analysisDir).filter(f => f.endsWith('.json') && f !== 'summary.json');

const allTechs = new Set();
const allDependencies = new Set();
const allLanguages = new Map();
const repoTechs = new Map(); // Map of repo -> techs

for (const file of files) {
  try {
    const filePath = join(analysisDir, file);
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    
    // Extract techs from the analysis result
    const extractTechs = (node) => {
      if (node.techs && Array.isArray(node.techs)) {
        node.techs.forEach(tech => {
          if (tech) {
            allTechs.add(tech);
            const repoName = file.replace('.json', '');
            if (!repoTechs.has(repoName)) {
              repoTechs.set(repoName, new Set());
            }
            repoTechs.get(repoName).add(tech);
          }
        });
      }
      
      if (node.tech && node.tech !== null) {
        allTechs.add(node.tech);
        const repoName = file.replace('.json', '');
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
        node.childs.forEach(child => extractTechs(child));
      }
    };
    
    extractTechs(data);
    
  } catch (error) {
    console.error(`Error processing ${file}: ${error.message}`);
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
  totalRepos: files.length,
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
console.log(`   Repositories analyzed: ${files.length}`);

