# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-16

### Added

- 🎉 Initial release of README Profile Tech Stack Sync
- Automatic scanning of all GitHub repositories (public and private)
- Language detection using GitHub's Linguist API
- Framework and library detection from dependency files
- Support for 50+ programming languages
- Support for 40+ popular frameworks and libraries
- Badge generation using shields.io
- Customizable badge styles (flat, flat-square, for-the-badge, plastic, social)
- README auto-update between custom markers
- Scheduled runs every 12 hours via GitHub Actions
- Configurable minimum percentage threshold
- Language exclusion support
- Badge sorting (by usage or alphabetically)
- Maximum badge limit option
- Custom color configuration
- Private repository scanning with PAT
- Comprehensive documentation and examples
- Example workflow files
- CONTRIBUTING.md guide
- MIT License

### Features

- **Input Parameters:**
  - `github_token` - GitHub token for API access
  - `readme_path` - Path to README file
  - `start_marker` - Custom start marker
  - `end_marker` - Custom end marker
  - `include_private` - Include private repos
  - `min_percentage` - Minimum language percentage
  - `badge_style` - Badge style selection
  - `sort_by` - Sort by usage or name
  - `max_badges` - Limit number of badges
  - `custom_colors` - Custom badge colors
  - `exclude_languages` - Exclude specific languages
  - `include_frameworks` - Detect frameworks
  - `commit_message` - Custom commit message
  - `committer_name` - Git committer name
  - `committer_email` - Git committer email

- **Output Parameters:**
  - `technologies_found` - JSON array of detected technologies
  - `badges_updated` - Boolean update status
  - `total_repos_scanned` - Total repositories scanned

### Supported Technologies

#### Programming Languages (50+)
- JavaScript, TypeScript, Python, Java, C, C++, C#, Ruby, Go, Rust
- PHP, Swift, Kotlin, Scala, R, Perl, Haskell, Lua, Dart, Elixir
- Clojure, Objective-C, Shell, PowerShell, HTML, CSS, and more

#### Frameworks & Libraries (40+)
- **Frontend:** React, Vue, Angular, Svelte, Next.js, Nuxt.js, Gatsby
- **Backend:** Express, Django, Flask, FastAPI, Spring, Laravel, Rails
- **Testing:** Jest, Mocha, Pytest, JUnit, RSpec, Selenium, Cypress
- **Build Tools:** Webpack, Vite, Babel, Rollup, Gradle, Maven
- **Databases:** MySQL, PostgreSQL, MongoDB, Redis, SQLite
- **DevOps:** Docker, Kubernetes, AWS, Azure, GCP, Terraform, Ansible
- **Other:** GraphQL, REST, gRPC, WebAssembly, Jupyter

### Known Issues

None at this time.

### Migration Guide

This is the first release, no migration needed.

---

## [Unreleased]

### Planned Features

- [ ] Unit tests with Jest
- [ ] Integration tests
- [ ] Badge preview tool
- [ ] Multi-language documentation
- [ ] Support for more frameworks
- [ ] Badge grouping by category
- [ ] Dark mode badge variants
- [ ] Statistics dashboard
- [ ] Automated releases
- [ ] Performance optimizations

---

**Legend:**
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` for vulnerability fixes
