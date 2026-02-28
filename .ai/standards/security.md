# Security Standards

> **Philosophy**: Security is not a feature - it's a baseline requirement for every line of code.

---

## Input Validation

All external inputs must be validated at system boundaries:

```text
VALIDATION CHECKLIST

[ ] User inputs (forms, query params, URL params)
[ ] API request bodies and headers
[ ] File uploads (type, size, content)
[ ] Environment variables at startup
[ ] Third-party API responses (don't trust blindly)
```

### Validation Rules

- **Validate early** - At the boundary where data enters your system
- **Validate strictly** - Allowlist over blocklist. Define what's valid, reject everything else
- **Validate types** - Use TypeScript types AND runtime validation (Zod, Valibot, etc.)
- **Sanitize output** - Escape data when rendering in HTML, SQL, or shell contexts

---

## OWASP Top 10 - Quick Reference

| Risk | Prevention |
|------|-----------|
| **Injection** (SQL, NoSQL, OS) | Use parameterized queries, ORMs, never string-concatenate user input into queries |
| **Broken Auth** | Use established auth libraries, enforce strong passwords, implement rate limiting |
| **Sensitive Data Exposure** | Encrypt at rest and in transit, never log secrets, use `.env` for config |
| **XSS** | Escape output, use framework auto-escaping, set CSP headers |
| **Broken Access Control** | Check permissions server-side, deny by default, validate on every request |
| **Security Misconfiguration** | Use security headers, disable debug in prod, keep dependencies updated |
| **CSRF** | Use CSRF tokens, validate Origin/Referer headers, SameSite cookies |

---

## Secrets Management

```text
RULES

1. NEVER commit secrets (.env, API keys, tokens, passwords)
2. NEVER log secrets (mask in error handlers)
3. NEVER expose secrets to the frontend
4. ALWAYS use environment variables for configuration
5. ALWAYS validate env vars at startup (see src/env.ts)
6. ALWAYS rotate compromised secrets immediately
```

### `.env` Rules
- `.env` is in `.gitignore` - never commit it
- `.env.example` contains placeholder keys - always keep it updated
- Use different secrets per environment (dev, staging, prod)

---

## Dependencies

- Run `npm audit` regularly (automated via CI security workflow)
- Keep dependencies updated (Dependabot is configured)
- Review new dependencies before adding:
  - Is it actively maintained?
  - How many weekly downloads?
  - Any known vulnerabilities?
  - What's the bundle size impact?
- Prefer well-known packages over obscure ones
- Pin exact versions in production (`save-exact=true` in `.npmrc`)

---

## API Security

- Use HTTPS everywhere
- Implement rate limiting on public endpoints
- Validate and sanitize all request data
- Return minimal error information to clients (no stack traces in prod)
- Use proper HTTP status codes
- Set security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`

---

## Authentication & Authorization

- Use established libraries (don't roll your own crypto)
- Hash passwords with bcrypt/scrypt/argon2 (never MD5/SHA1)
- Use short-lived JWTs with refresh token rotation
- Implement proper session management
- Log authentication events for audit trails

---

[Back to Standards](./index.md) | [Back to Index](../index.md)
