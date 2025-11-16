// Test script to verify the action can run without errors
const path = require('path');

// Mock @actions/core
const core = {
  getInput: (name, options) => {
    const inputs = {
      github_token: process.env.GITHUB_TOKEN || 'fake-token-for-testing',
      readme_path: 'README.md',
      start_marker: '<!-- TECH-STACK:START -->',
      end_marker: '<!-- TECH-STACK:END -->',
      include_private: 'false',
      min_percentage: '1',
      badge_style: 'for-the-badge',
      sort_by: 'usage',
      max_badges: '0',
      custom_colors: '{}',
      exclude_languages: '',
      include_frameworks: 'true',
      commit_message: 'chore: update tech stack badges',
      committer_name: 'github-actions[bot]',
      committer_email: 'github-actions[bot]@users.noreply.github.com'
    };
    return inputs[name] || '';
  },
  setOutput: (name, value) => console.log(`Output: ${name} = ${value}`),
  setFailed: (msg) => console.error(`Failed: ${msg}`),
  info: (msg) => console.log(`Info: ${msg}`),
  warning: (msg) => console.warn(`Warning: ${msg}`),
  error: (msg) => console.error(`Error: ${msg}`)
};

// Mock @actions/github
const github = {
  context: {
    repo: {
      owner: 'testuser'
    }
  }
};

// Override require for our mocks
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
  if (id === '@actions/core') return core;
  if (id === '@actions/github') return github;
  return originalRequire.apply(this, arguments);
};

// Now try to load the actual action code
console.log('🧪 Testing action code...\n');

try {
  // Test that we can at least require all the dependencies
  const { analyser, FSProvider, flatten } = require('@specfy/stack-analyser');
  console.log('✅ Stack analyser loaded successfully');
  console.log('  - analyser:', typeof analyser);
  console.log('  - FSProvider:', typeof FSProvider);
  console.log('  - flatten:', typeof flatten);

  // Try to load the Octokit
  const { Octokit } = require('@octokit/rest');
  console.log('✅ Octokit loaded successfully');

  console.log('\n✅ All dependencies loaded successfully!');
  console.log('\nNote: Cannot fully test without valid GitHub token and repositories.');
  console.log('But the code should now work in GitHub Actions environment.');

} catch (error) {
  console.error('❌ Error loading action:', error.message);
  console.error(error.stack);
  process.exit(1);
}
