# Contributing

Thanks for your interest in contributing! This guide will help you get started.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone <your-fork-url>`
3. **Install** dependencies: `npm install`
4. **Create a branch**: `git checkout -b feat/<task-id>-<description>`

## Development Workflow

```bash
# Run dev server
npm run dev

# Run all checks before committing
npm run validate

# Run tests in watch mode while developing
npm run test:watch
```

## Branch Naming

```text
<type>/<task-id>-<description>

Examples:
  feat/1.2-oauth-login
  fix/2.1-null-response
  docs/3-api-reference
  refactor/4.1-auth-service
```

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, perf, test, chore
```

Examples:
```text
feat(auth): add OAuth2 login flow
fix(api): handle null response in user endpoint
docs(readme): update installation steps
test(auth): add unit tests for token refresh
```

## Pull Requests

1. Keep PRs focused - one feature or fix per PR
2. Update tests for any changed behavior
3. Ensure `npm run validate` passes
4. Write a clear description of what changed and why
5. Link related issues

## Code Standards

- Follow existing patterns in the codebase
- Check `.ai/standards/` for code quality requirements
- Check `.ai/patterns/` for implementation guides
- Run `npm run check:fix` to auto-fix formatting and lint issues

## Reporting Issues

- Use GitHub Issues
- Include steps to reproduce
- Include expected vs actual behavior
- Include environment details (OS, Node version)
