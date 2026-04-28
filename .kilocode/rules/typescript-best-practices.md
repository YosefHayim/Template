# TypeScript Best Practices

> Practical TypeScript wisdom from [TotalTypeScript.com](https://totaltypescript.com/tips) by Matt Pocock.

## Naming Conventions

- **Never pluralize types** — `Route`, not `Routes` (even for unions)
- **Different casing from variables** — Types PascalCase, variables camelCase
- **Prefix generics with T** — Single: `T`. Multiple: `TData`, `TError`. Never `T, U, V, W`
- **No Hungarian notation** — Avoid `IUser`, `TUser`, `COrganization`

## When to Use Generics

1. **Zero dynamic elements?** — No generics needed
2. **Dynamic but all shapes known?** — Union type suffices
3. **Return type varies by input?** — Use generics

## Return Type Annotations

**Don't annotate by default.** Let TypeScript infer. Annotate only when:
- Multiple branches (acts as documentation)
- Library code (return type is public API)
- Complex generics (performance)

## Inference

- `let` → broad type, `const` → literal type
- Arrays/objects need `as const` for deep literal inference
- Use `satisfies` to enforce shape without losing literals

## tsconfig: `noUncheckedIndexedAccess`

Enable it. Dynamic key access returns `T | undefined`, preventing runtime errors.

## Key Patterns

- **Distributive conditional types** iterate over unions automatically
- **`infer` in template literals** transforms keys at the type level
- **`LooseAutocomplete<T>`** preserves autocomplete while accepting any string
- **`DeepPartial<T>`** for nested optional types in tests/mocks
- **Function declarations** (not arrow functions) for generic React components in TSX
- **Default generic slots** act as "local variables" for complex types
- **`| undefined` on optional properties** forces call sites to be explicit during refactors
- **Curried generics** carry types through function calls
- **Assertion functions** narrow `this` type in classes
- **`typeof import()`** derives types from modules
