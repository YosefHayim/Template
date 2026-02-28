# {{PROJECT_NAME}}

> {{PROJECT_DESCRIPTION}}

---

## Quick Start

```bash
# Clone the repository
git clone {{REPO_URL}}
cd {{PROJECT_NAME}}

# Install dependencies
npm install    # or: bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Start development
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production build |
| `npm run check` | Run Biome linter + formatter check |
| `npm run check:fix` | Auto-fix lint + format issues |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run typecheck` | TypeScript type checking |
| `npm run validate` | Run all checks (types + lint + tests) |

## Project Structure

```
src/
  app/          # Application routes/pages
  components/   # Reusable UI components
  hooks/        # Custom hooks
  lib/          # Third-party integrations
  services/     # Business logic & API calls
  types/        # TypeScript type definitions
  utils/        # Helper functions
tests/          # Test setup and global test utilities
```

## Tech Stack

<!-- Replace with your actual tech stack -->

| Category | Technology |
|----------|-----------|
| Language | TypeScript |
| Runtime | Node.js 22+ |
| Linter/Formatter | Biome |
| Testing | Vitest |
| CI/CD | GitHub Actions |

## Development

### Code Quality

This project uses [Biome](https://biomejs.dev/) for linting and formatting. Pre-commit hooks via Husky + lint-staged ensure code quality before every commit.

### Testing

Tests are written with [Vitest](https://vitest.dev/). Place test files next to the code they test using `.test.ts` or `.spec.ts` extensions.

### Docker

```bash
# Build and run with Docker Compose
docker compose up --build

# Production build only
docker build -t {{PROJECT_NAME}} .
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)
