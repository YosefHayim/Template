import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const readmePath = join(rootDir, 'README.md');
const aggregatedFile = join(rootDir, 'aggregated-tech-stack.json');

if (!existsSync(aggregatedFile)) {
  console.error('❌ aggregated-tech-stack.json not found. Run aggregate-tech-stack.js first.');
  process.exit(1);
}

const aggregated = JSON.parse(readFileSync(aggregatedFile, 'utf-8'));

// Read existing README
let readmeContent = '';
if (existsSync(readmePath)) {
  readmeContent = readFileSync(readmePath, 'utf-8');
} else {
  // Create a basic README if it doesn't exist
  readmeContent = `# ${process.env.GITHUB_REPOSITORY?.split('/')[1] || 'Profile'}

<!-- TECH_STACK_START -->
<!-- TECH_STACK_END -->

## About

This profile is automatically updated with tech stacks from all my public repositories.

Last updated: ${new Date().toISOString()}
`;
}

// Generate tech stack section
const techStackSection = generateTechStackSection(aggregated);

// Update README with tech stack
const startMarker = '<!-- TECH_STACK_START -->';
const endMarker = '<!-- TECH_STACK_END -->';

let updatedContent;
let changed = false;

if (readmeContent.includes(startMarker) && readmeContent.includes(endMarker)) {
  // Replace existing section
  const regex = new RegExp(
    `${startMarker}[\\s\\S]*?${endMarker}`,
    'g'
  );
  const newSection = `${startMarker}\n${techStackSection}\n${endMarker}`;
  updatedContent = readmeContent.replace(regex, newSection);
  changed = readmeContent !== updatedContent;
} else {
  // Append at the end
  updatedContent = readmeContent + '\n\n' + startMarker + '\n' + techStackSection + '\n' + endMarker;
  changed = true;
}

if (changed) {
  writeFileSync(readmePath, updatedContent);
  console.log('✅ README.md updated successfully!');
  // Output for GitHub Actions (new format)
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `changed=true\n`);
  }
} else {
  console.log('ℹ️  No changes to README.md');
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `changed=false\n`);
  }
}

function generateTechStackSection(data) {
  const sections = [];
  
  // Technologies section
  if (data.technologies && data.technologies.length > 0) {
    sections.push('### 🛠️ Technologies');
    sections.push('');
    sections.push('Technologies I use across my projects:');
    sections.push('');
    const techBadges = data.technologies.map(tech => {
      // Create a badge-like format
      return `- \`${tech}\``;
    });
    sections.push(techBadges.join('\n'));
    sections.push('');
  }
  
  // Top languages section
  if (data.languages && data.languages.length > 0) {
    sections.push('### 💻 Languages');
    sections.push('');
    sections.push('Programming languages I work with:');
    sections.push('');
    const topLanguages = data.languages.slice(0, 10); // Top 10
    const langList = topLanguages.map(lang => {
      return `- \`${lang.name}\` (${lang.count} files)`;
    });
    sections.push(langList.join('\n'));
    sections.push('');
  }
  
  // Stats section
  sections.push('### 📊 Stats');
  sections.push('');
  sections.push(`- **Repositories analyzed:** ${data.totalRepos}`);
  sections.push(`- **Technologies detected:** ${data.technologies?.length || 0}`);
  sections.push(`- **Dependencies found:** ${data.dependencies?.length || 0}`);
  sections.push(`- **Last updated:** ${new Date(data.timestamp).toLocaleString()}`);
  sections.push('');
  
  // Footer note
  sections.push('> 💡 This section is automatically updated by [GitHub Actions](.github/workflows/tech-stack-sync.yml) using [stack-analyser](https://github.com/specfy/stack-analyser)');
  
  return sections.join('\n');
}

