const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');
const fs = require('fs').promises;
const path = require('path');

// Technology color mappings
const TECH_COLORS = {
  // Programming Languages
  'JavaScript': 'F7DF1E',
  'TypeScript': '3178C6',
  'Python': '3776AB',
  'Java': '007396',
  'C': 'A8B9CC',
  'C++': '00599C',
  'C#': '239120',
  'Ruby': 'CC342D',
  'Go': '00ADD8',
  'Rust': '000000',
  'PHP': '777BB4',
  'Swift': 'FA7343',
  'Kotlin': '7F52FF',
  'Scala': 'DC322F',
  'R': '276DC3',
  'Perl': '39457E',
  'Haskell': '5D4F85',
  'Lua': '2C2D72',
  'Dart': '0175C2',
  'Elixir': '4B275F',
  'Clojure': '5881D8',
  'Objective-C': '438EFF',
  'Shell': '89E051',
  'PowerShell': '5391FE',

  // Web Technologies
  'HTML': 'E34F26',
  'CSS': '1572B6',
  'SCSS': 'CC6699',
  'SASS': 'CC6699',
  'Vue': '4FC08D',
  'React': '61DAFB',
  'Angular': 'DD0031',
  'Svelte': 'FF3E00',

  // Frameworks & Libraries
  'Node.js': '339933',
  'Express': '000000',
  'Django': '092E20',
  'Flask': '000000',
  'FastAPI': '009688',
  'Spring': '6DB33F',
  'Laravel': 'FF2D20',
  'Rails': 'CC0000',
  'Next.js': '000000',
  'Nuxt.js': '00DC82',
  'Gatsby': '663399',
  'jQuery': '0769AD',
  'Bootstrap': '7952B3',
  'Tailwind': '06B6D4',
  'Material-UI': '007FFF',

  // Databases
  'MySQL': '4479A1',
  'PostgreSQL': '4169E1',
  'MongoDB': '47A248',
  'Redis': 'DC382D',
  'SQLite': '003B57',
  'MariaDB': '003545',
  'Oracle': 'F80000',
  'Cassandra': '1287B1',
  'Elasticsearch': '005571',
  'Neo4j': '008CC1',

  // Cloud & DevOps
  'Docker': '2496ED',
  'Kubernetes': '326CE5',
  'AWS': 'FF9900',
  'Azure': '0078D4',
  'GCP': '4285F4',
  'Terraform': '7B42BC',
  'Ansible': 'EE0000',
  'Jenkins': 'D24939',
  'GitLab': 'FC6D26',
  'GitHub': '181717',

  // Testing
  'Jest': 'C21325',
  'Mocha': '8D6748',
  'Pytest': '0A9EDC',
  'JUnit': '25A162',
  'Selenium': '43B02A',
  'Cypress': '17202C',

  // Build Tools
  'Webpack': '8DD6F9',
  'Vite': '646CFF',
  'Babel': 'F9DC3E',
  'Rollup': 'EC4A3F',
  'Gradle': '02303A',
  'Maven': 'C71A36',

  // Other
  'Git': 'F05032',
  'GraphQL': 'E10098',
  'REST': '009688',
  'gRPC': '4285F4',
  'WebAssembly': '654FF0',
  'Jupyter': 'F37626',
  'Markdown': '000000',
};

// Framework detection patterns
const FRAMEWORK_PATTERNS = {
  'package.json': {
    'React': ['react'],
    'Vue': ['vue'],
    'Angular': ['@angular/core'],
    'Next.js': ['next'],
    'Nuxt.js': ['nuxt'],
    'Express': ['express'],
    'Nest.js': ['@nestjs/core'],
    'Gatsby': ['gatsby'],
    'Svelte': ['svelte'],
    'jQuery': ['jquery'],
    'Bootstrap': ['bootstrap'],
    'Tailwind': ['tailwindcss'],
    'Material-UI': ['@mui/material', '@material-ui/core'],
    'Jest': ['jest'],
    'Mocha': ['mocha'],
    'Webpack': ['webpack'],
    'Vite': ['vite'],
    'Babel': ['@babel/core'],
    'TypeScript': ['typescript'],
    'GraphQL': ['graphql'],
  },
  'requirements.txt': {
    'Django': ['django'],
    'Flask': ['flask'],
    'FastAPI': ['fastapi'],
    'Pytest': ['pytest'],
    'NumPy': ['numpy'],
    'Pandas': ['pandas'],
    'TensorFlow': ['tensorflow'],
    'PyTorch': ['torch'],
    'Scikit-learn': ['scikit-learn', 'sklearn'],
  },
  'Gemfile': {
    'Rails': ['rails'],
    'Sinatra': ['sinatra'],
    'RSpec': ['rspec'],
  },
  'pom.xml': {
    'Spring': ['spring-boot', 'springframework'],
    'Hibernate': ['hibernate'],
    'JUnit': ['junit'],
  },
  'build.gradle': {
    'Spring': ['spring-boot', 'springframework'],
    'Android': ['com.android'],
    'Kotlin': ['kotlin'],
  },
  'composer.json': {
    'Laravel': ['laravel/framework'],
    'Symfony': ['symfony'],
    'WordPress': ['wordpress'],
  },
  'go.mod': {
    'Gin': ['gin-gonic/gin'],
    'Echo': ['labstack/echo'],
    'Fiber': ['gofiber/fiber'],
  },
  'Cargo.toml': {
    'Actix': ['actix-web'],
    'Rocket': ['rocket'],
    'Tokio': ['tokio'],
  },
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
      .map(lang => lang.trim())
      .filter(lang => lang.length > 0);
    const includeFrameworks = core.getInput('include_frameworks') === 'true';
    const commitMessage = core.getInput('commit_message');
    const committerName = core.getInput('committer_name');
    const committerEmail = core.getInput('committer_email');

    // Merge custom colors with defaults
    const colors = { ...TECH_COLORS, ...customColors };

    core.info('🔍 Starting tech stack scan...');

    const octokit = new Octokit({ auth: token });
    const username = github.context.repo.owner;

    // Fetch all repositories
    core.info(`📦 Fetching repositories for ${username}...`);
    const repos = await fetchAllRepositories(octokit, username, includePrivate);
    core.info(`Found ${repos.length} repositories to scan`);

    // Aggregate language statistics
    const techStack = await aggregateTechStack(octokit, repos, minPercentage, excludeLanguages);

    // Detect frameworks if enabled
    if (includeFrameworks) {
      core.info('🔎 Detecting frameworks and libraries...');
      const frameworks = await detectFrameworks(octokit, repos, username);

      // Add frameworks to tech stack
      for (const [framework, count] of Object.entries(frameworks)) {
        if (!techStack[framework]) {
          techStack[framework] = {
            name: framework,
            percentage: 0,
            repos: count,
            isFramework: true
          };
        }
      }
    }

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

    repos.push(...data.filter(repo => !repo.fork && !repo.archived));

    if (data.length < perPage) break;
    page++;
  }

  return repos;
}

async function aggregateTechStack(octokit, repos, minPercentage, excludeLanguages) {
  const languageStats = {};
  let totalBytes = 0;

  for (const repo of repos) {
    try {
      const { data: languages } = await octokit.repos.listLanguages({
        owner: repo.owner.login,
        repo: repo.name,
      });

      for (const [language, bytes] of Object.entries(languages)) {
        if (excludeLanguages.includes(language)) continue;

        if (!languageStats[language]) {
          languageStats[language] = { bytes: 0, repos: new Set() };
        }
        languageStats[language].bytes += bytes;
        languageStats[language].repos.add(repo.name);
        totalBytes += bytes;
      }
    } catch (error) {
      core.warning(`Failed to fetch languages for ${repo.name}: ${error.message}`);
    }
  }

  // Convert to percentage
  const techStack = {};
  for (const [language, stats] of Object.entries(languageStats)) {
    const percentage = (stats.bytes / totalBytes) * 100;
    if (percentage >= minPercentage) {
      techStack[language] = {
        name: language,
        percentage: parseFloat(percentage.toFixed(2)),
        repos: stats.repos.size,
        isFramework: false
      };
    }
  }

  return techStack;
}

async function detectFrameworks(octokit, repos, username) {
  const frameworks = {};

  for (const repo of repos) {
    for (const [filename, patterns] of Object.entries(FRAMEWORK_PATTERNS)) {
      try {
        const { data: content } = await octokit.repos.getContent({
          owner: username,
          repo: repo.name,
          path: filename,
        });

        if (content.type === 'file') {
          const fileContent = Buffer.from(content.content, 'base64').toString('utf-8');

          for (const [framework, keywords] of Object.entries(patterns)) {
            for (const keyword of keywords) {
              if (fileContent.includes(keyword)) {
                frameworks[framework] = (frameworks[framework] || 0) + 1;
                break;
              }
            }
          }
        }
      } catch (error) {
        // File doesn't exist or can't be read, skip
        continue;
      }
    }
  }

  return frameworks;
}

function sortTechnologies(techStack, sortBy) {
  const techs = Object.values(techStack);

  if (sortBy === 'usage') {
    return techs.sort((a, b) => {
      if (a.isFramework !== b.isFramework) {
        return a.isFramework ? 1 : -1; // Languages first
      }
      return b.percentage - a.percentage || b.repos - a.repos;
    });
  } else {
    return techs.sort((a, b) => a.name.localeCompare(b.name));
  }
}

function generateBadges(technologies, style, colors) {
  const badgeLines = [];

  for (const tech of technologies) {
    const encodedName = encodeURIComponent(tech.name);
    const color = colors[tech.name] || '000000';
    const label = tech.isFramework ? `${tech.name}` : tech.name;

    const badge = `![${tech.name}](https://img.shields.io/badge/${encodedName}-${color}?style=${style}&logo=${encodedName.toLowerCase()}&logoColor=white)`;
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
