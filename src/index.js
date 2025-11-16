const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');
const { analyser, FSProvider, flatten } = require('@specfy/stack-analyser');
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// Load stack-analyser rules
require('@specfy/stack-analyser/dist/autoload');

// Technology color mappings for badges
const TECH_COLORS = {
  // Programming Languages
  'javascript': 'F7DF1E',
  'typescript': '3178C6',
  'python': '3776AB',
  'java': '007396',
  'c': 'A8B9CC',
  'cpp': '00599C',
  'csharp': '239120',
  'ruby': 'CC342D',
  'go': '00ADD8',
  'golang': '00ADD8',
  'rust': '000000',
  'php': '777BB4',
  'swift': 'FA7343',
  'kotlin': '7F52FF',
  'scala': 'DC322F',
  'r': '276DC3',
  'perl': '39457E',
  'haskell': '5D4F85',
  'lua': '2C2D72',
  'dart': '0175C2',
  'elixir': '4B275F',
  'clojure': '5881D8',
  'objectivec': '438EFF',
  'shell': '89E051',
  'bash': '89E051',
  'powershell': '5391FE',
  'zig': 'F7A41D',

  // Web Technologies
  'html': 'E34F26',
  'css': '1572B6',
  'scss': 'CC6699',
  'sass': 'CC6699',
  'vue': '4FC08D',
  'react': '61DAFB',
  'angular': 'DD0031',
  'svelte': 'FF3E00',

  // Frameworks & Libraries
  'nodejs': '339933',
  'node': '339933',
  'express': '000000',
  'django': '092E20',
  'flask': '000000',
  'fastapi': '009688',
  'spring': '6DB33F',
  'laravel': 'FF2D20',
  'rails': 'CC0000',
  'nextjs': '000000',
  'nuxtjs': '00DC82',
  'gatsby': '663399',
  'jquery': '0769AD',
  'bootstrap': '7952B3',
  'tailwind': '06B6D4',
  'tailwindcss': '06B6D4',
  'materialui': '007FFF',
  'vite': '646CFF',
  'webpack': '8DD6F9',
  'nestjs': 'E0234E',
  'fastify': '000000',

  // Databases
  'mysql': '4479A1',
  'postgresql': '4169E1',
  'postgres': '4169E1',
  'mongodb': '47A248',
  'redis': 'DC382D',
  'sqlite': '003B57',
  'mariadb': '003545',
  'oracle': 'F80000',
  'cassandra': '1287B1',
  'elasticsearch': '005571',
  'neo4j': '008CC1',
  'dynamodb': '4053D6',
  'firestore': 'FFCA28',
  'supabase': '3ECF8E',
  'prisma': '2D3748',

  // Cloud & DevOps
  'docker': '2496ED',
  'kubernetes': '326CE5',
  'aws': 'FF9900',
  'azure': '0078D4',
  'gcp': '4285F4',
  'googlecloud': '4285F4',
  'terraform': '7B42BC',
  'ansible': 'EE0000',
  'jenkins': 'D24939',
  'gitlab': 'FC6D26',
  'github': '181717',
  'githubactions': '2088FF',
  'circleci': '343434',
  'travisci': '3EAAAF',
  'vercel': '000000',
  'netlify': '00C7B7',
  'heroku': '430098',
  'digitalocean': '0080FF',

  // Monitoring & Analytics
  'datadog': '632CA6',
  'newrelic': '008C99',
  'sentry': 'FB4226',
  'grafana': 'F46800',
  'prometheus': 'E6522C',

  // Testing
  'jest': 'C21325',
  'mocha': '8D6748',
  'pytest': '0A9EDC',
  'junit': '25A162',
  'selenium': '43B02A',
  'cypress': '17202C',
  'playwright': '2EAD33',
  'vitest': '6E9F18',

  // Build Tools
  'babel': 'F9DC3E',
  'rollup': 'EC4A3F',
  'gradle': '02303A',
  'maven': 'C71A36',
  'npm': 'CB3837',
  'yarn': '2C8EBB',
  'pnpm': 'F69220',

  // Other
  'git': 'F05032',
  'graphql': 'E10098',
  'rest': '009688',
  'grpc': '4285F4',
  'webassembly': '654FF0',
  'jupyter': 'F37626',
  'markdown': '000000',
  'eslint': '4B32C3',
  'prettier': 'F7B93E',
  'storybook': 'FF4785',
};

async function run() {
  try {
    // Get inputs
    const token = core.getInput('github_token', { required: true });
    const readmePath = core.getInput('readme_path');
    const startMarker = core.getInput('start_marker');
    const endMarker = core.getInput('end_marker');
    const includePrivate = core.getInput('include_private') === 'true';
    const minPercentage = parseFloat(core.getInput('min_percentage'));
    const badgeStyle = core.getInput('badge_style');
    const sortBy = core.getInput('sort_by');
    const maxBadges = parseInt(core.getInput('max_badges'));
    const customColors = JSON.parse(core.getInput('custom_colors') || '{}');
    const excludeLanguages = core.getInput('exclude_languages')
      .split(',')
      .map(lang => lang.trim().toLowerCase())
      .filter(lang => lang.length > 0);
    const includeFrameworks = core.getInput('include_frameworks') === 'true';
    const commitMessage = core.getInput('commit_message');
    const committerName = core.getInput('committer_name');
    const committerEmail = core.getInput('committer_email');

    // Merge custom colors with defaults
    const colors = { ...TECH_COLORS, ...customColors };

    core.info('🔍 Starting tech stack scan with @specfy/stack-analyser...');

    const octokit = new Octokit({ auth: token });
    const username = github.context.repo.owner;

    // Fetch all repositories
    core.info(`📦 Fetching repositories for ${username}...`);
    const repos = await fetchAllRepositories(octokit, username, includePrivate);
    core.info(`Found ${repos.length} repositories to scan`);

    // Analyze repositories and aggregate technologies
    core.info('🔬 Analyzing repositories with stack-analyser...');
    const techStack = await analyzeRepositories(
      repos,
      username,
      token,
      excludeLanguages,
      includeFrameworks,
      minPercentage
    );

    // Sort technologies
    const sortedTechs = sortTechnologies(techStack, sortBy);

    // Apply max badges limit
    const limitedTechs = maxBadges > 0 ? sortedTechs.slice(0, maxBadges) : sortedTechs;

    core.info(`✨ Found ${limitedTechs.length} technologies`);

    // Generate badges
    const badges = generateBadges(limitedTechs, badgeStyle, colors);

    // Update README
    core.info(`📝 Updating ${readmePath}...`);
    const updated = await updateReadme(
      readmePath,
      badges,
      startMarker,
      endMarker,
      commitMessage,
      committerName,
      committerEmail,
      octokit,
      username
    );

    // Set outputs
    core.setOutput('technologies_found', JSON.stringify(limitedTechs));
    core.setOutput('badges_updated', updated);
    core.setOutput('total_repos_scanned', repos.length);

    if (updated) {
      core.info('✅ README updated successfully!');
    } else {
      core.info('ℹ️ No changes needed - README is already up to date');
    }

  } catch (error) {
    core.setFailed(`❌ Action failed: ${error.message}`);
  }
}

async function fetchAllRepositories(octokit, username, includePrivate) {
  const repos = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const { data } = await octokit.repos.listForUser({
      username,
      type: includePrivate ? 'all' : 'public',
      per_page: perPage,
      page,
    });

    if (data.length === 0) break;

    // Filter out forks and archived repos
    repos.push(...data.filter(repo => !repo.fork && !repo.archived));

    if (data.length < perPage) break;
    page++;
  }

  return repos;
}

async function analyzeRepositories(repos, username, token, excludeLanguages, includeFrameworks, minPercentage) {
  const techCounts = new Map();
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'stack-analyser-'));

  try {
    // Analyze each repository
    for (const repo of repos) {
      try {
        core.info(`  Analyzing ${repo.name}...`);

        // Clone repository to temp directory
        const repoPath = path.join(tempDir, repo.name);
        const cloneUrl = `https://x-access-token:${token}@github.com/${username}/${repo.name}.git`;

        try {
          execSync(`git clone --depth 1 --quiet "${cloneUrl}" "${repoPath}"`, {
            stdio: 'pipe',
            timeout: 60000, // 1 minute timeout
          });
        } catch (cloneError) {
          core.warning(`  Failed to clone ${repo.name}: ${cloneError.message}`);
          continue;
        }

        // Run stack-analyser
        let result;
        try {
          result = await analyser({
            provider: new FSProvider({
              path: repoPath,
            }),
          });
        } catch (analyseError) {
          core.warning(`  Failed to analyze ${repo.name}: ${analyseError.message}`);
          // Clean up repo directory
          await fs.rm(repoPath, { recursive: true, force: true });
          continue;
        }

        // Extract technologies
        const flat = flatten(result);
        const json = flat.toJson();

        // Process all detected techs
        if (json.techs && json.techs.length > 0) {
          for (const tech of json.techs) {
            const techName = tech.toLowerCase();

            // Skip excluded languages
            if (excludeLanguages.includes(techName)) {
              continue;
            }

            if (!techCounts.has(techName)) {
              techCounts.set(techName, {
                name: tech,
                count: 0,
                repos: new Set(),
              });
            }

            const techData = techCounts.get(techName);
            techData.count++;
            techData.repos.add(repo.name);
          }
        }

        // Process languages
        if (json.languages && Object.keys(json.languages).length > 0) {
          for (const lang of Object.keys(json.languages)) {
            const langName = lang.toLowerCase();

            // Skip excluded languages
            if (excludeLanguages.includes(langName)) {
              continue;
            }

            if (!techCounts.has(langName)) {
              techCounts.set(langName, {
                name: lang,
                count: 0,
                repos: new Set(),
              });
            }

            const techData = techCounts.get(langName);
            techData.count++;
            techData.repos.add(repo.name);
          }
        }

        // Clean up repo directory
        await fs.rm(repoPath, { recursive: true, force: true });

      } catch (error) {
        core.warning(`  Error processing ${repo.name}: ${error.message}`);
      }
    }
  } finally {
    // Clean up temp directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (error) {
      core.warning(`Failed to clean up temp directory: ${error.message}`);
    }
  }

  // Convert to array and calculate percentages
  const techStack = [];
  const totalRepos = repos.length;

  for (const [techName, data] of techCounts.entries()) {
    const percentage = (data.repos.size / totalRepos) * 100;

    // Apply minimum percentage filter
    if (percentage >= minPercentage) {
      techStack.push({
        name: data.name,
        count: data.count,
        repos: data.repos.size,
        percentage: parseFloat(percentage.toFixed(2)),
      });
    }
  }

  return techStack;
}

function sortTechnologies(techStack, sortBy) {
  if (sortBy === 'usage') {
    return techStack.sort((a, b) => {
      // Sort by number of repos, then by count
      return b.repos - a.repos || b.count - a.count;
    });
  } else {
    return techStack.sort((a, b) => a.name.localeCompare(b.name));
  }
}

function generateBadges(technologies, style, colors) {
  const badgeLines = [];

  for (const tech of technologies) {
    const techLower = tech.name.toLowerCase();
    const encodedName = encodeURIComponent(tech.name);
    const color = colors[techLower] || colors[tech.name] || '000000';

    // Try to get a logo name (remove special characters and spaces)
    const logoName = techLower.replace(/[.\s]/g, '');

    const badge = `![${tech.name}](https://img.shields.io/badge/${encodedName}-${color}?style=${style}&logo=${logoName}&logoColor=white)`;
    badgeLines.push(badge);
  }

  return badgeLines.join(' ');
}

async function updateReadme(
  readmePath,
  badges,
  startMarker,
  endMarker,
  commitMessage,
  committerName,
  committerEmail,
  octokit,
  username
) {
  try {
    // Read the README file
    let readmeContent;
    let sha;

    try {
      const { data } = await octokit.repos.getContent({
        owner: username,
        repo: username,
        path: readmePath,
      });

      readmeContent = Buffer.from(data.content, 'base64').toString('utf-8');
      sha = data.sha;
    } catch (error) {
      core.warning(`Could not read README at ${readmePath}: ${error.message}`);
      return false;
    }

    // Find markers
    const startIndex = readmeContent.indexOf(startMarker);
    const endIndex = readmeContent.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
      core.warning(`Could not find markers in README. Please add:\n${startMarker}\n${endMarker}`);
      return false;
    }

    // Extract content between markers
    const beforeMarker = readmeContent.substring(0, startIndex + startMarker.length);
    const afterMarker = readmeContent.substring(endIndex);

    const newContent = `${beforeMarker}\n\n${badges}\n\n${afterMarker}`;

    // Check if content changed
    if (newContent === readmeContent) {
      return false; // No changes needed
    }

    // Update the file
    await octokit.repos.createOrUpdateFileContents({
      owner: username,
      repo: username,
      path: readmePath,
      message: commitMessage,
      content: Buffer.from(newContent).toString('base64'),
      sha,
      committer: {
        name: committerName,
        email: committerEmail,
      },
    });

    return true;
  } catch (error) {
    core.error(`Failed to update README: ${error.message}`);
    throw error;
  }
}

run();
