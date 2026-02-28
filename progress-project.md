# Project Progress Tracker

> **IMPORTANT**: This file is the **single source of truth** for project state and context.
> All AI agents **MUST** update this file after completing any task or meaningful change.

---

## Project Overview

**Project Name**: Template
**Last Updated**: 2026-02-28
**Updated By**: Claude (Opus)

---

## Current Features

| Feature | Status | Description |
|---------|--------|-------------|
| Hierarchical Book Architecture | Complete | Centralized `.ai/` directory with single source of truth |
| AI Agent Intelligence System | Complete | Universal agent instructions via AGENTS.md → .ai/ |
| Progress Tracking Protocol | Complete | Mandatory tracking via progress-project.md |
| Task Master Integration | Complete | Task management workflow for all agents |
| Multi-Agent Support | Complete | Rules for Claude, Gemini, Cline, Cursor, VS Code |
| Developer Tooling (Biome) | Complete | Linting + formatting + import sorting via Biome |
| Pre-commit Hooks | Complete | Husky + lint-staged for quality gates |
| Testing Framework (Vitest) | Complete | Vitest with coverage, UI mode, path aliases |
| Docker Support | Complete | Multi-stage Dockerfile + docker-compose for local dev |
| CI/CD Pipeline | Complete | Lint, typecheck, test, security audit, Docker build |
| Security Standards | Complete | OWASP, input validation, secrets management docs |
| Performance Standards | Complete | DB queries, API targets, caching strategy docs |
| Deployment Patterns | Complete | Docker patterns, CI/CD pipeline documentation |
| Project Scaffolding | Complete | src/ structure, README, LICENSE, CONTRIBUTING, CHANGELOG |
| Environment Validation | Complete | src/env.ts for runtime env var validation |
| Commitlint | Complete | Conventional Commits enforced via commit-msg hook |
| GitHub Issue Templates | Complete | Form-based bug report + feature request templates |
| PR Template | Complete | Standard PR template with checklist |
| CODEOWNERS | Complete | Auto-assign PR reviewers by file path |
| SECURITY.md | Complete | Responsible vulnerability disclosure policy |
| Package.json Metadata | Complete | exports, types, repository, files fields |
| TypeScript Test Config | Complete | tsconfig.test.json for test file IDE support |
| Docker Dependabot | Complete | Dockerfile base image dependency tracking |

---

## Completed Work

### 2026-02-28

- [x] Added Biome for linting + formatting (replaces ESLint + Prettier) with tab indentation
- [x] Added Vitest testing framework with v8 coverage, 70% thresholds, path aliases
- [x] Added Husky + lint-staged pre-commit hooks for automatic code quality enforcement
- [x] Added .editorconfig, .nvmrc (Node 22), .npmrc (exact versions, engine strict)
- [x] Added Docker support: multi-stage Dockerfile (Alpine, non-root), docker-compose.yml, .dockerignore
- [x] Added CI/CD workflows: ci.yml (lint + typecheck + test), security.yml (npm audit), docker.yml (image build)
- [x] Replaced old pr-tests.yml with comprehensive ci.yml
- [x] Added .ai/standards/security.md (OWASP, input validation, secrets, dependencies)
- [x] Added .ai/standards/performance.md (DB queries, API targets, caching, Core Web Vitals)
- [x] Added .ai/patterns/deployment/ (Docker patterns, CI/CD pipeline docs)
- [x] Created src/ directory scaffold with barrel exports (components, hooks, utils, lib, services, types, app)
- [x] Added src/env.ts for runtime environment variable validation
- [x] Added README.md, LICENSE (MIT), CONTRIBUTING.md, CHANGELOG.md
- [x] Updated .gitignore for coverage, Docker, TypeScript build info
- [x] Updated package.json with all dev dependencies, scripts, lint-staged config
- [x] Updated .ai/ cross-references (index.md, standards/index.md, patterns/index.md, architecture.md)
- [x] Added commitlint + @commitlint/config-conventional + .husky/commit-msg hook
- [x] Created .github/ISSUE_TEMPLATE/ (bug_report.yml, feature_request.yml, config.yml)
- [x] Created .github/PULL_REQUEST_TEMPLATE.md with summary, changes, test plan, checklist
- [x] Created .github/CODEOWNERS with template owner patterns
- [x] Created SECURITY.md with responsible disclosure policy
- [x] Added package.json metadata: license, author, repository, keywords, main, types, exports, files
- [x] Created tsconfig.test.json extending base config for test files
- [x] Added Docker ecosystem to .github/dependabot.yml
- [x] Updated architecture.md key files and configuration tables

### 2026-01-24

- [x] Migrated to Hierarchical Book Architecture - Eliminated ~300KB of duplicated content across tool-specific files
- [x] Created `.ai/` centralized structure - index.md router with standards/, workflows/, patterns/, tools/, project/ sections
- [x] Replaced tool-specific duplicates with minimal loaders - Each tool now has a `_loader` file pointing to `.ai/`
- [x] Updated root files (AGENTS.md, CLAUDE.md, GEMINI.md) - Now route to `.ai/` structure
- [x] Archived old files and deleted after verification - Clean repository with no duplication

### 2026-01-15

- [x] Implemented mandatory progress tracking protocol - Added enforcement rules for all AI agents to update progress-project.md after every task
- [x] Created progress-project.md template - Single source of truth for project state with sections for features, tasks, decisions, issues
- [x] Updated AGENTS.md with Progress Tracking Protocol section - Comprehensive rules including checklists, update triggers, and enforcement
- [x] Updated CLAUDE.md with progress tracking requirement - Added mandatory section and updated role responsibilities
- [x] Updated GEMINI.md with progress tracking requirement - Added mandatory section and updated role responsibilities
- [x] Created Cline rule for progress tracking - .clinerules/progress_tracking.md with always-apply enforcement
- [x] Created Cursor rule for progress tracking - .cursor/rules/progress_tracking.mdc with always-apply enforcement

---

## Pending Tasks

| Priority | Task | Notes |
|----------|------|-------|
| _None_ | - | - |

---

## In Progress

| Task | Started | Agent | Notes |
|------|---------|-------|-------|
| _None_ | - | - | - |

---

## Repository Structure

```
Template/
├── .ai/                        # ⭐ SINGLE SOURCE OF TRUTH for all AI instructions
│   ├── index.md                # Central navigation router
│   ├── standards/              # Universal principles (code-quality, security, performance, debugging, docs, architecture)
│   ├── workflows/              # Development processes (task-mgmt, dev-cycle, git)
│   ├── patterns/               # Implementation guides (frontend/, backend/, testing/, deployment/)
│   ├── tools/                  # AI tool configurations (claude, cursor, cline, etc.)
│   └── project/                # Project-specific (tech-stack, discovered-patterns)
├── src/                        # Application source code
│   ├── app/                    # Application routes/pages
│   ├── components/             # Reusable UI components
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Third-party integrations
│   ├── services/               # Business logic & API calls
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Helper functions
│   ├── env.ts                  # Environment variable validation
│   └── index.ts                # Application entry point
├── tests/                      # Test setup and global test utilities
├── .github/workflows/          # CI/CD pipelines (ci, security, docker, release, dependabot)
├── .github/ISSUE_TEMPLATE/     # Bug report + feature request form templates
├── .github/PULL_REQUEST_TEMPLATE.md  # Standard PR template
├── .github/CODEOWNERS          # Auto-assign PR reviewers
├── .husky/                     # Git hooks (pre-commit: lint-staged, commit-msg: commitlint)
├── biome.json                  # Linting + formatting configuration
├── vitest.config.ts            # Test configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.test.json          # TypeScript config for test files
├── commitlint.config.js        # Conventional Commits enforcement
├── Dockerfile                  # Multi-stage container build
├── docker-compose.yml          # Local development services
├── package.json                # Dependencies, scripts, lint-staged
├── progress-project.md         # THIS FILE - project state tracker
├── README.md                   # Project documentation
├── CONTRIBUTING.md             # Contribution guidelines
├── CHANGELOG.md                # Version history
├── SECURITY.md                 # Vulnerability disclosure policy
└── LICENSE                     # MIT license
```

---

## Technical Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| Biome over ESLint + Prettier | Single tool for lint + format + imports, 10-100x faster, zero config conflicts | 2026-02-28 |
| Vitest over Jest | Native ESM, TypeScript, and Vite support; faster execution; built-in coverage | 2026-02-28 |
| Tab indentation | Biome default, accessibility-friendly (users set visual width), saves bytes | 2026-02-28 |
| Node 22 LTS | Current LTS with native fetch, test runner, and performance improvements | 2026-02-28 |
| Multi-stage Docker builds | Smaller prod images, cached dependencies, non-root security | 2026-02-28 |
| Exact npm versions | Prevents phantom dependency drift; reproducible installs | 2026-02-28 |
| Commitlint over manual enforcement | Automatically rejects non-conventional commit messages at git hook level | 2026-02-28 |
| YAML issue templates over Markdown | Form-based templates ensure required fields, better UX than freeform | 2026-02-28 |
| Hierarchical Book Architecture in `.ai/` | Eliminates duplication, provides clear navigation, separates standards from patterns | 2026-01-24 |
| Minimal loader files for each tool | Tool-specific dirs just point to .ai/, no duplicated content | 2026-01-24 |
| Mandatory progress tracking | Ensures continuity across sessions, eliminates redundant work, provides instant context | 2026-01-15 |
| Single source of truth in progress-project.md | Centralizes project state rather than distributing across multiple files | 2026-01-15 |
| Always-apply rules for Cline/Cursor | Ensures progress tracking applies regardless of which files are being edited | 2026-01-15 |

---

## Known Issues

| Issue | Severity | Status | Notes |
|-------|----------|--------|-------|
| _None_ | - | - | - |

---

## Dependencies & Blockers

| Blocker | Impact | Resolution |
|---------|--------|------------|
| _None_ | - | - |

---

## Session Notes

_Last session ended with: Added GitHub collaboration features — commitlint, issue/PR templates, CODEOWNERS, SECURITY.md, package.json metadata, tsconfig.test.json, Docker dependabot._

_Next session should start with: Customize template placeholders ({{PROJECT_NAME}}, {{AUTHOR}}, {{OWNER}}, {{SECURITY_EMAIL}}) for actual projects. Consider migrating `docs/PROJECT_RULES.md` to `.ai/project/`. Fill in `.ai/project/tech-stack.md` with actual technology choices._

---

*This file is automatically maintained by AI agents. Manual edits are allowed but should follow the established format.*
