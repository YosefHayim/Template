---
description: "TypeScript best practices from TotalTypeScript.com — naming, generics, inference, config, and everyday patterns"
globs: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]
alwaysApply: false
---
# TypeScript Best Practices

> Practical TypeScript wisdom from [TotalTypeScript.com](https://totaltypescript.com/tips) by Matt Pocock.

## Naming Conventions

- **Never pluralize types** — `Route`, not `Routes` (even for unions)
- **Different casing from variables** — Types PascalCase, variables camelCase
- **Prefix generics with T** — Single: `T`. Multiple: `TData`, `TError`. Never `T, U, V, W`
- **No Hungarian notation** — Avoid `IUser`, `TUser`, `COrganization`

```typescript
// BAD
type Routes = "user" | "admin";
type TUser = { name: string };

// GOOD
type Route = "user" | "admin";
type User = { name: string };
```

## When to Use Generics

1. **Zero dynamic elements?** — No generics needed
2. **Dynamic but all shapes known?** — Union type suffices
3. **Return type varies by input?** — Use generics

```typescript
// Union suffices — all shapes known
const getDisplayName = (item: Animal | Human): { displayName: string } => { ... };

// Generic needed — return type varies per input
const getDisplayName = <T extends Animal | Human>(
  item: T
): T extends Human ? { humanName: string } : { animalName: string } => { ... };
```

## Return Type Annotations

**Don't annotate by default.** Let TypeScript infer. Annotate when:
- Multiple branches (acts as documentation)
- Library code (return type is public API)
- Complex generics (performance)

## Inference

- `let` → broad type, `const` → literal type
- Arrays/objects need `as const` for deep literal inference
- Use `satisfies` to enforce shape without losing literals

## tsconfig: `noUncheckedIndexedAccess`

Enable it. Dynamic key access returns `T | undefined`:

```typescript
const obj: Record<string, string[]> = {};
if (!obj.foo) { obj.foo = []; }
obj.foo.push("bar"); // Safe after narrowing
```

## Key Patterns

- **Distributive conditional types** iterate over unions automatically
- **`infer` in template literals** transforms keys at the type level
- **`LooseAutocomplete<T>`** preserves autocomplete while accepting any string
- **`DeepPartial<T>`** for nested optional types in tests/mocks
- **Function declarations** (not arrow functions) for generic React components in TSX
- **Default generic slots** act as "local variables" for complex types
