# CI/CD Patterns

> **Purpose**: Automated pipeline structure for quality gates and deployment.

---

## Pipeline Structure

```text
Push/PR → Lint → Typecheck → Test → Build → Deploy
              ↓        ↓         ↓       ↓
           Biome    tsc       Vitest  Docker
```

### GitHub Actions Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Push to main/dev, PRs | Lint, typecheck, test with coverage |
| `security.yml` | Push to main, PRs, weekly schedule | Dependency vulnerability audit |
| `docker.yml` | Push to main, PRs | Validate Docker image builds |
| `release.yml` | PR merged to main | Version bump, Git tag, GitHub Release |
| `dependabot-auto-merge.yml` | Dependabot PRs | Auto-merge minor/patch updates |
| `delete-branch.yml` | PR closed | Clean up merged feature branches |

---

## Release Flow

```text
1. Feature branch → PR to main
2. CI runs: lint + typecheck + test + Docker build
3. PR merged → release.yml triggers
4. Version bumped based on PR labels (major/minor/patch)
5. Git tag created, GitHub Release published
6. (Optional) Docker image pushed to registry
7. (Optional) npm package published
```

### PR Labels for Versioning

| Label | Bump | Example |
|-------|------|---------|
| `major` | Breaking change | 1.0.0 → 2.0.0 |
| `minor` | New feature | 1.0.0 → 1.1.0 |
| `patch` (default) | Bug fix | 1.0.0 → 1.0.1 |
| `no-release` | Skip release | — |

---

## Quality Gates

Every PR must pass before merge:

1. **Lint** - Biome checks formatting and lint rules
2. **Type Check** - TypeScript strict mode, no errors
3. **Tests** - All tests pass with coverage thresholds (70%)
4. **Security** - No critical vulnerabilities in dependencies
5. **Docker** - Image builds successfully

---

[Back to Deployment](./index.md) | [Back to Patterns](../index.md)
