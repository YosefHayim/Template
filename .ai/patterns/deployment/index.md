# Deployment Patterns

> **Purpose**: Standard approaches for deploying, containerizing, and monitoring applications.

---

## Documents

| Document | Summary |
|----------|---------|
| [Docker](./docker.md) | Container patterns, multi-stage builds, compose setup |
| [CI/CD](./ci-cd.md) | Pipeline structure, environment promotion, release flow |

---

## Deployment Checklist

```
PRE-DEPLOYMENT

[ ] All tests passing (npm run validate)
[ ] Environment variables configured for target environment
[ ] Database migrations ready (if applicable)
[ ] Security audit clean (npm audit)
[ ] Docker image builds successfully
[ ] Health check endpoint responds

POST-DEPLOYMENT

[ ] Application starts without errors
[ ] Health check returns 200
[ ] Key user flows verified (smoke test)
[ ] Monitoring/alerts configured
[ ] Rollback plan documented
```

---

## Environment Promotion

```
Development → Staging → Production

dev branch  →  PR to main  →  Merge triggers release
   ↓              ↓                    ↓
 Local dev    Preview env      Production deploy
```

---

[Back to Patterns](../index.md) | [Back to Index](../../index.md)
