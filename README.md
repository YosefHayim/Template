# {{PROJECT_NAME}}

<div align="center">

<!-- npm package badges (remove if not an npm package) -->
[![npm version](https://img.shields.io/npm/v/{{NPM_PACKAGE_NAME}})](https://www.npmjs.com/package/{{NPM_PACKAGE_NAME}})
[![npm downloads](https://img.shields.io/npm/dm/{{NPM_PACKAGE_NAME}})](https://www.npmjs.com/package/{{NPM_PACKAGE_NAME}})

<!-- always include these -->
[![CI](https://github.com/YosefHayim/{{PROJECT_NAME}}/actions/workflows/ci.yml/badge.svg)](https://github.com/YosefHayim/{{PROJECT_NAME}}/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Contributors Welcome](https://img.shields.io/badge/contributors-welcome-brightgreen.svg)](https://github.com/YosefHayim/{{PROJECT_NAME}}/issues)

> {{ONE_LINE_DESCRIPTION}}

</div>

---

## What is it

{{WHAT_IS_IT — 2-3 sentences. What does this project do? Who is it for?}}

---

## Why

{{WHY_IT_EXISTS — 2-3 sentences. What problem does it solve? Why was it built?}}

---

## Install

```bash
{{INSTALL_COMMAND}}
```

---

## Quick Start

{{QUICK_START_EXAMPLE}}

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run test` | Run tests |
| `npm run typecheck` | TypeScript type checking |
| `npm run check` | Run all checks (types + lint + tests) |

---

## Project Structure

```
src/
  {{STRUCTURE}}
```

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Language | TypeScript |
| Runtime | Node.js 22+ |
| Linter/Formatter | Biome |
| Testing | Vitest |
| CI/CD | GitHub Actions |

---

## Contributing

PRs and issues welcome. Fork the repo, create a feature branch, and open a pull request.

Steps:
1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
4. Push and open a Pull Request

---

## License

MIT

---

<!-- 
  SETUP CHECKLIST (delete this section when done):
  [ ] Replace all {{PLACEHOLDERS}} above
  [ ] Remove npm badges if not an npm package
  [ ] Update Scripts table to match actual package.json scripts
  [ ] Update Tech Stack table
  [ ] Add llms.txt file (see docs/GRIMOIRE_REFERENCE.md for example format)
  [ ] Run: bash scripts/init.sh to bootstrap the project
-->
