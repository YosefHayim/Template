# Docker Patterns

> **Purpose**: Consistent containerization practices for development and production.

---

## Multi-Stage Build Pattern

The project uses a 3-stage Dockerfile:

```dockerfile
# Stage 1: deps    - Install dependencies (cached layer)
# Stage 2: builder - Build the application
# Stage 3: runner  - Minimal production image
```

### Why Multi-Stage?
- **Smaller images** - Production image doesn't include dev dependencies or source
- **Faster builds** - Dependency layer is cached unless package.json changes
- **Security** - Minimal attack surface in production (Alpine-based, non-root user)

---

## Docker Compose for Development

```bash
# Start all services
docker compose up --build

# Start specific service
docker compose up app

# Rebuild after dependency changes
docker compose up --build app

# View logs
docker compose logs -f app

# Stop all services
docker compose down

# Stop and remove volumes (resets databases)
docker compose down -v
```

### Adding Services

To add a database or cache, uncomment the relevant section in `docker-compose.yml` and update your `.env`:

```yaml
# Example: Enable PostgreSQL
db:
  image: postgres:17-alpine
  environment:
    POSTGRES_USER: dev
    POSTGRES_PASSWORD: dev
    POSTGRES_DB: app
```

---

## Best Practices

| Practice | Why |
|----------|-----|
| Use Alpine base images | Smaller size, fewer vulnerabilities |
| Run as non-root user | Security: limits container breakout impact |
| Use `.dockerignore` | Faster builds, smaller context |
| Pin major versions in FROM | Reproducible builds |
| Use health checks | Orchestrators can detect unhealthy containers |
| Copy package.json first | Leverage Docker layer caching for dependencies |

---

## Environment Variables in Docker

- **Development**: Use `env_file: .env` in docker-compose
- **Production**: Inject via orchestrator (K8s secrets, ECS task definitions, etc.)
- **Never**: Bake secrets into the Docker image

---

[Back to Deployment](./index.md) | [Back to Patterns](../index.md)
