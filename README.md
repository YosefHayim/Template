# 🚀 README Profile Tech Stack Sync

[![GitHub Release](https://img.shields.io/github/v/release/YosefHayim/readme-profile-tech-stack-sync?style=for-the-badge)](https://github.com/YosefHayim/readme-profile-tech-stack-sync/releases)
[![License](https://img.shields.io/github/license/YosefHayim/readme-profile-tech-stack-sync?style=for-the-badge)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/YosefHayim/readme-profile-tech-stack-sync?style=for-the-badge)](https://github.com/YosefHayim/readme-profile-tech-stack-sync/stargazers)

> **Automatically sync your tech stack badges in your GitHub profile README based on technologies detected across all your repositories.**

This GitHub Action scans all your repositories (public and optionally private), detects the programming languages, frameworks, and tools you use, and automatically updates your profile README with beautiful badges - all on autopilot!

## ✨ Features

- 🔄 **Automatic Scanning**: Runs every 12 hours (customizable) to keep your tech stack up-to-date
- 🎯 **Smart Detection**: Uses GitHub's Linguist data to accurately detect programming languages
- 🔍 **Framework Recognition**: Detects popular frameworks and libraries from dependency files
- 🎨 **Beautiful Badges**: Generates shields.io badges with customizable styles and colors
- 🔒 **Private Repo Support**: Optionally scan private repositories with proper authentication
- ⚙️ **Highly Configurable**: Control minimum percentages, badge limits, exclusions, and more
- 📊 **Sorting Options**: Sort by usage percentage or alphabetically
- 🎭 **Custom Colors**: Override default badge colors for any technology
- 📝 **Seamless Updates**: Updates your README between custom markers without affecting other content

## 🎬 Quick Start

### 1. Add Markers to Your README

Add these HTML comments to your profile README where you want the badges to appear:

```markdown
# Hi, I'm Your Name 👋

## 🛠️ Tech Stack

<!-- TECH-STACK:START -->
<!-- This section will be automatically updated -->
<!-- TECH-STACK:END -->

## 📫 Contact Me
...
```

### 2. Create Workflow File

Create `.github/workflows/tech-stack-sync.yml` in your **profile repository** (the repo with the same name as your username):

```yaml
name: Sync Tech Stack Badges

on:
  schedule:
    - cron: '0 */12 * * *'  # Every 12 hours
  workflow_dispatch:  # Manual trigger

jobs:
  update-tech-stack:
    runs-on: ubuntu-latest

    permissions:
      contents: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Update Tech Stack Badges
        uses: YosefHayim/readme-profile-tech-stack-sync@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          readme_path: 'README.md'
          start_marker: '<!-- TECH-STACK:START -->'
          end_marker: '<!-- TECH-STACK:END -->'
          include_private: false
          badge_style: 'for-the-badge'
```

### 3. Run the Action

- **Automatic**: The action will run every 12 hours automatically
- **Manual**: Go to Actions tab → Sync Tech Stack Badges → Run workflow

That's it! Your tech stack badges will be automatically updated! 🎉

## 📖 Configuration Options

### Input Parameters

| Parameter | Description | Default | Required |
|-----------|-------------|---------|----------|
| `github_token` | GitHub token for API access | - | ✅ |
| `readme_path` | Path to your README file | `README.md` | ❌ |
| `start_marker` | Start marker comment | `<!-- TECH-STACK:START -->` | ❌ |
| `end_marker` | End marker comment | `<!-- TECH-STACK:END -->` | ❌ |
| `include_private` | Include private repositories | `false` | ❌ |
| `min_percentage` | Minimum percentage of code (0-100) | `1` | ❌ |
| `badge_style` | Badge style | `for-the-badge` | ❌ |
| `sort_by` | Sort by: `usage` or `name` | `usage` | ❌ |
| `max_badges` | Maximum badges (0 = unlimited) | `0` | ❌ |
| `custom_colors` | Custom badge colors (JSON) | `{}` | ❌ |
| `exclude_languages` | Comma-separated exclusions | `''` | ❌ |
| `include_frameworks` | Detect frameworks | `true` | ❌ |
| `commit_message` | Custom commit message | `chore: update tech stack badges` | ❌ |

### Badge Styles

Choose from these badge styles:

- `flat` - Flat style
- `flat-square` - Flat square style
- `for-the-badge` - Bold style (recommended)
- `plastic` - Plastic style
- `social` - Social style

### Output Parameters

| Output | Description |
|--------|-------------|
| `technologies_found` | JSON array of detected technologies |
| `badges_updated` | Boolean indicating if README was updated |
| `total_repos_scanned` | Total number of repositories scanned |

## 🎯 Advanced Usage

### Include Private Repositories

To scan private repositories, you need a Personal Access Token (PAT) with `repo` scope:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Add it as a secret in your profile repository (e.g., `PROFILE_TOKEN`)
4. Update your workflow:

```yaml
- name: Update Tech Stack Badges
  uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.PROFILE_TOKEN }}
    include_private: true
```

### Custom Badge Colors

Override default colors using JSON:

```yaml
- name: Update Tech Stack Badges
  uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    custom_colors: '{"Python": "yellow", "JavaScript": "purple"}'
```

### Exclude Languages

Exclude specific languages (e.g., markup languages):

```yaml
- name: Update Tech Stack Badges
  uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    exclude_languages: 'HTML,CSS,Markdown'
```

### Limit Number of Badges

Show only your top technologies:

```yaml
- name: Update Tech Stack Badges
  uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    max_badges: 10
    sort_by: 'usage'
```

### Custom Markers

Use different markers for multiple sections:

```yaml
- name: Update Languages
  uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    start_marker: '<!-- LANGUAGES:START -->'
    end_marker: '<!-- LANGUAGES:END -->'
    include_frameworks: false

- name: Update Frameworks
  uses: YosefHayim/readme-profile-tech-stack-sync@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    start_marker: '<!-- FRAMEWORKS:START -->'
    end_marker: '<!-- FRAMEWORKS:END -->'
    min_percentage: 0
```

## 🔍 Detected Technologies

### Programming Languages

The action automatically detects all programming languages using GitHub's Linguist engine, including:

- JavaScript, TypeScript, Python, Java, C, C++, C#, Go, Rust, PHP
- Ruby, Swift, Kotlin, Scala, R, Perl, Haskell, Lua, Dart, Elixir
- And many more!

### Frameworks & Libraries

When `include_frameworks` is enabled, the action scans dependency files to detect:

**JavaScript/Node.js** (package.json):
- React, Vue, Angular, Svelte, Next.js, Nuxt.js, Gatsby
- Express, Nest.js, jQuery, Bootstrap, Tailwind CSS, Material-UI
- Jest, Mocha, Webpack, Vite, Babel

**Python** (requirements.txt):
- Django, Flask, FastAPI, Pytest
- NumPy, Pandas, TensorFlow, PyTorch, Scikit-learn

**Ruby** (Gemfile):
- Rails, Sinatra, RSpec

**Java** (pom.xml, build.gradle):
- Spring, Hibernate, JUnit, Android, Kotlin

**PHP** (composer.json):
- Laravel, Symfony, WordPress

**Go** (go.mod):
- Gin, Echo, Fiber

**Rust** (Cargo.toml):
- Actix, Rocket, Tokio

## 📊 Example Output

Here's what your README will look like after the action runs:

<!-- TECH-STACK:START -->

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

<!-- TECH-STACK:END -->

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/YosefHayim/readme-profile-tech-stack-sync.git
cd readme-profile-tech-stack-sync

# Install dependencies
npm install

# Build the action
npm run build
```

### Project Structure

```
readme-profile-tech-stack-sync/
├── .github/
│   └── workflows/
│       └── tech-stack-sync.yml    # Example workflow
├── src/
│   └── index.js                    # Main action logic
├── dist/
│   └── index.js                    # Compiled action
├── action.yml                      # Action metadata
├── package.json
└── README.md
```

### Building

The action uses [@vercel/ncc](https://github.com/vercel/ncc) to compile the Node.js code into a single file:

```bash
npm run build
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Ideas for Contributions

- Add support for more frameworks
- Improve badge color schemes
- Add more badge customization options
- Create a web preview tool
- Add unit tests
- Improve documentation

## 🐛 Troubleshooting

### Markers not found

**Problem**: Action reports "Could not find markers in README"

**Solution**: Make sure you've added both markers to your README:
```markdown
<!-- TECH-STACK:START -->
<!-- TECH-STACK:END -->
```

### No badges appear

**Problem**: Badges section is empty after running

**Possible causes**:
1. `min_percentage` is too high - try lowering it
2. All languages are excluded - check `exclude_languages`
3. No repositories found - ensure you have public repos

### Private repos not scanned

**Problem**: Only public repos are being scanned

**Solution**:
1. Set `include_private: true`
2. Use a PAT instead of `GITHUB_TOKEN`
3. Ensure PAT has `repo` scope

### Action fails with 403 error

**Problem**: API rate limit exceeded

**Solution**:
1. Use a Personal Access Token instead of `GITHUB_TOKEN`
2. Reduce scanning frequency (e.g., once per day instead of every 12 hours)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Show Your Support

If you find this action useful, please consider:

- ⭐ Starring this repository
- 🐦 Sharing it on social media
- 🤝 Contributing to the project

## 📬 Contact

- GitHub: [@YosefHayim](https://github.com/YosefHayim)
- Issues: [Report a bug](https://github.com/YosefHayim/readme-profile-tech-stack-sync/issues)

## 🙏 Acknowledgments

- [shields.io](https://shields.io/) for the badge service
- [GitHub Linguist](https://github.com/github/linguist) for language detection
- [Octokit](https://github.com/octokit/rest.js) for GitHub API interactions

---

Made with ❤️ by [YosefHayim](https://github.com/YosefHayim)
