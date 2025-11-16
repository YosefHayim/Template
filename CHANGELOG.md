# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-16

### Added

- 🎉 Initial release of README Profile Tech Stack Sync
- Automatic scanning of all GitHub repositories (public and private)
- **Powered by [@specfy/stack-analyser](https://github.com/specfy/stack-analyser)** - Detection of 700+ technologies!
- Comprehensive technology detection including languages, frameworks, databases, cloud services, and more
- Support for all major programming languages
- Support for hundreds of frameworks and libraries
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

### Supported Technologies (700+)

Thanks to [@specfy/stack-analyser](https://github.com/specfy/stack-analyser), this action detects:

- **Programming Languages:** JavaScript, TypeScript, Python, Java, C, C++, C#, Ruby, Go, Rust, PHP, Swift, Kotlin, Scala, Dart, Elixir, Clojure, Haskell, Zig, and many more
- **Web Frameworks:** React, Vue, Angular, Svelte, Next.js, Nuxt.js, Gatsby, Express, Django, Flask, FastAPI, Spring, Laravel, Rails, and many more
- **Databases:** PostgreSQL, MySQL, MongoDB, Redis, SQLite, Cassandra, Elasticsearch, DynamoDB, Firestore, Supabase, and many more
- **DevOps & Cloud:** Docker, Kubernetes, AWS, Azure, GCP, Terraform, Ansible, Jenkins, GitHub Actions, CircleCI, Vercel, Netlify, Heroku, and many more
- **Testing Tools:** Jest, Mocha, Pytest, JUnit, Cypress, Playwright, Selenium, and many more
- **Build Tools:** Webpack, Vite, Babel, Rollup, Gradle, Maven, and many more
- **Monitoring:** Datadog, Sentry, Grafana, Prometheus, New Relic, and many more
- **And much more:** See the [full list](https://github.com/specfy/stack-analyser/tree/main/src/rules)

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
