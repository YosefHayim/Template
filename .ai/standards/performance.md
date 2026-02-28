# Performance Standards

> **Philosophy**: Measure first, optimize second. Premature optimization is the root of all evil, but known performance patterns should be applied from the start.

---

## General Principles

1. **Don't guess - measure** - Use profiling tools before optimizing
2. **Optimize the hot path** - Focus on code that runs frequently
3. **Set budgets** - Define performance targets before building
4. **Monitor in production** - Lab metrics aren't production metrics

---

## Backend Performance

### Database Queries

```text
CHECKLIST

[ ] Use indexes for frequently queried columns
[ ] Avoid N+1 queries - use eager loading / joins
[ ] Paginate large result sets (never SELECT * without LIMIT)
[ ] Use database connection pooling
[ ] Cache expensive queries (with proper invalidation)
[ ] Use EXPLAIN to analyze slow queries
```

### API Response Times

| Endpoint Type | Target |
|--------------|--------|
| Simple CRUD | < 100ms |
| Complex queries | < 500ms |
| Aggregations/Reports | < 2s |
| Background jobs | Use async queues |

### Caching Strategy

```text
Cache Decision Tree:

1. Is the data read-heavy? → Consider caching
2. How stale can it be? → Set appropriate TTL
3. What's the invalidation strategy? → Time-based, event-based, or manual
4. Where to cache? → In-memory (fastest) → Redis (shared) → CDN (edge)
```

---

## Frontend Performance

### Bundle Size

- Tree-shake unused code (modern bundlers do this automatically)
- Code-split by route (lazy load pages)
- Analyze bundle with `npx vite-bundle-visualizer` or equivalent
- Set bundle size budgets in CI

### Rendering

- Avoid unnecessary re-renders (React.memo, useMemo, useCallback where measured)
- Virtualize long lists (>100 items)
- Use proper image formats (WebP/AVIF) and lazy loading
- Implement skeleton screens over spinners

### Core Web Vitals Targets

| Metric | Good | Needs Work |
|--------|------|-----------|
| LCP (Largest Contentful Paint) | < 2.5s | < 4.0s |
| INP (Interaction to Next Paint) | < 200ms | < 500ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.25 |

---

## Infrastructure

- Use CDN for static assets
- Enable gzip/brotli compression
- Set proper cache headers (`Cache-Control`, `ETag`)
- Use HTTP/2 or HTTP/3
- Consider edge computing for latency-sensitive operations

---

## Anti-Patterns

| Don't | Do Instead |
|-------|-----------|
| Premature optimization without data | Profile first, then optimize |
| Loading entire datasets into memory | Paginate and stream |
| Synchronous heavy computation in request handlers | Use background jobs/workers |
| Ignoring N+1 queries | Use eager loading from the start |
| Caching without invalidation strategy | Define TTL and invalidation rules |

---

[Back to Standards](./index.md) | [Back to Index](../index.md)
