---
name: typescript-best-practices
description: "TypeScript best practices distilled from Matt Pocock's TotalTypeScript.com. Naming conventions, generics usage, type inference, config settings, and practical patterns for production TypeScript code."
risk: unknown
source: community
date_added: "2026-04-28"
---

# TypeScript Best Practices

> Practical TypeScript wisdom from [TotalTypeScript.com](https://totaltypescript.com/tips) by Matt Pocock.
> Covers naming, generics, inference, config, and everyday patterns.

## When to Use
Use this skill when writing TypeScript code, making naming decisions, choosing between type system features, configuring tsconfig, or deciding when to use generics vs overloads vs unions.

---

## 1. Type Naming Conventions

### Rules

- **Never pluralize** — Types represent a single value, even unions. Use `Route`, not `Routes`.
- **Different casing from variables** — Types in PascalCase, variables in camelCase. Prevents syntax highlighting confusion.
- **Prefix generics with T** — Single generic: `T`. Multiple: `TData`, `TError`. Never `T, U, V, W` chains.
- **No Hungarian notation** — Avoid `IUser`, `TUser`, `COrganization`. The prefix adds noise; hover tells you the kind.

```typescript
// BAD
type Routes = "user" | "admin"; // plural
type TUser = { name: string }; // redundant T
interface IOrg { name: string } // Java holdover

// GOOD
type Route = "user" | "admin";
type User = { name: string };
interface Organization { name: string }
```

---

## 2. When to Use Generics

### Decision Framework

1. **Zero dynamic elements?** — No generics. Use concrete types.
2. **Dynamic but all shapes known upfront?** — Union type suffices.
3. **Return type must vary based on specific input?** — Use generics.

```typescript
// No generics needed — union covers all cases
export const getDisplayName = (
  item: Animal | Human
): { displayName: string } => {
  if ("name" in item) return { displayName: item.name };
  return { displayName: `${item.firstName} ${item.lastName}` };
};

// Generics needed — return type changes per input
export const getDisplayName = <TItem extends Animal | Human>(
  item: TItem
): TItem extends Human ? { humanName: string } : { animalName: string } => { ... };
```

### Curried Generics

Generics lock per function call. Use currying to carry types through:

```typescript
const makeKeyRemover =
  <Key extends string>(keys: Key[]) =>
  <Obj>(obj: Obj): Omit<Obj, Key> => {
    return {} as any;
  };

const removeAB = makeKeyRemover(["a", "b"]);
const result = removeAB({ a: 1, b: 2, c: 3 }); // { c: number }
```

---

## 3. Return Type Annotations

**Default: don't annotate.** Let TypeScript infer. Annotate only when:

1. **Multiple branches** — Acts as documentation, constrains the union.
2. **Library code** — Return type is public API; annotate for stability.
3. **Performance** — Complex generics can slow inference; annotate to help.

```typescript
// No annotation needed — inference is clear
const makeId = (prefix: string, num: number) => `${prefix}-${num}`;

// Annotate for multi-branch functions
const handleState = (state: State): { status: "loading" | "error" | "success" } => { ... };
```

---

## 4. Inference Mental Model

### `let` vs `const` vs `as const`

- `let` → broad type (`number`)
- `const` → literal type (`31`)
- Arrays/objects: `const` alone doesn't freeze members; use `as const` for deep literal inference

```typescript
let age = 31;        // number
const age = 31;      // 31 (literal)
const arr = ["a"];   // string[]
const arr = ["a"] as const; // readonly ["a"]
```

### `satisfies` Pattern

Enforce a shape without losing literal types:

```typescript
const satisfies =
  <T>() =>
  <U extends T>(u: U) =>
    u;

const actions = satisfies<{ action: string; role: string }[]>()([
  { action: "create", role: "admin" },
  { action: "read", role: "user" },
]);
// action is "create" | "read", NOT string
```

---

## 5. Assignability and `extends`

`A extends B` asks: **"Is A a narrower version of B?"**

```typescript
type Result = string extends "matt" | "fred" ? true : false; // false
// string is WIDER than the union

type Result = "matt" | "fred" extends string ? true : false; // true
// the union is NARROWER than string
```

Think of it like OOP: `Labrador extends Dog` — Labrador is narrower. `Animal` is wider and won't pass `takeForWalk(dog: Dog)`.

---

## 6. tsconfig Essentials

### `noUncheckedIndexedAccess`

Enable it. Dynamic key access returns `T | undefined`, preventing runtime errors:

```json
{ "compilerOptions": { "noUncheckedIndexedAccess": true } }
```

```typescript
const obj: Record<string, string[]> = {};
obj.foo.push("bar"); // Error without the flag!
if (!obj.foo) { obj.foo = []; }
obj.foo.push("bar"); // Safe after narrowing
```

---

## 7. Indexed Access Types

Access object properties, tuple members, and nested structures at the type level:

```typescript
type PrimaryColor = ColorVariants["primary"];
type AOrB = Letters[0 | 1];
type AllLetters = Letters[number];

// Deep access: get all roles from config
type Role = UserRoleConfig[keyof UserRoleConfig][number];
```

---

## 8. Distributive Conditional Types

Conditional types automatically distribute over unions:

```typescript
type RemoveC<T> = T extends "c" ? never : T;
type Result = RemoveC<"a" | "b" | "c">; // "a" | "b"

// Transform instead of remove
type SwapC<T> = T extends "c" ? "d" : T;
type Result2 = SwapC<"a" | "b" | "c">; // "a" | "b" | "d"
```

---

## 9. Dynamic Function Arguments

Use conditional types + named tuples to make function args vary by input:

```typescript
const sendEvent = <Type extends Event["type"]>(
  ...args: Extract<Event, { type: Type }> extends { payload: infer P }
    ? [type: Type, payload: P]
    : [type: Type]
) => {};

sendEvent("SIGN_OUT");               // OK, no payload
sendEvent("LOG_IN", { userId: "1" }); // OK, payload required
sendEvent("LOG_IN");                  // Error! Missing payload
```

---

## 10. Key Manipulation with `infer`

Use `infer` inside template literal types to transform object keys:

```typescript
type RemoveMaps<T> = T extends `maps:${infer Suffix}` ? Suffix : T;

type CleanData = {
  [K in keyof ApiData as RemoveMaps<K>]: ApiData[K];
};
// { longitude: string; latitude: string }
```

---

## 11. `declare global` for Cross-Module Types

Extend a global interface from any module file:

```typescript
declare global {
  interface GlobalReducerEvent {
    ADD_TODO: { text: string };
  }
}
```

Multiple modules can extend the same interface; a mapping type converts it to a discriminated union.

---

## 12. Derive Types from Modules

Use `typeof import()` to turn a module's exports into a type:

```typescript
type ActionModule = typeof import("./constants");
type Action = ActionModule[keyof ActionModule];
// "ADD_TODO" | "REMOVE_TODO" | "EDIT_TODO" — stays in sync
```

---

## 13. Autocomplete with Arbitrary Values

`LooseAutocomplete<T>` preserves autocomplete while accepting any string:

```typescript
type LooseAutocomplete<T extends string> = T | Omit<string, T>;

interface IconProps {
  size: LooseAutocomplete<"sm" | "xs">;
}
// Autocomplete shows "sm", "xs" but any string is valid
```

---

## 14. DeepPartial for Nested Types

Built-in `Partial<T>` is one level deep. Use recursive `DeepPartial` for mocks/fixtures:

```typescript
type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T | undefined;
```

Check order matters: functions and arrays before objects (they're all `object` in JS).

---

## 15. Type-Level Error Messages

Return a string literal from a conditional type to create custom IDE error messages:

```typescript
type CheckForBadArgs<Arg> = Arg extends any[]
  ? "You cannot compare two arrays using deepEqualCompare"
  : Arg;

const deepEqualCompare = <Arg>(
  a: CheckForBadArgs<Arg>,
  b: CheckForBadArgs<Arg>
): boolean => { ... };
```

---

## 16. Generics in React Components

Arrow functions can't use `<T>` in TSX (conflicts with JSX). Use function declarations:

```typescript
interface TableProps<TItem> {
  items: TItem[];
  renderItem: (item: TItem) => React.ReactNode;
}

// function declaration, not arrow function
export function Table<TItem>(props: TableProps<TItem>) {
  return null;
}
```

---

## 17. Generics vs Function Overloads

- **Overloads**: fixed, known set of types. Each overload is explicit.
- **Generics**: open-ended, preserves the exact type passed in.

```typescript
// Overloads — fixed types
function fn(input: string): string;
function fn(input: number): number;
function fn(input: unknown): unknown { return input; }

// Generics — handles everything
function fn<T>(input: T): T { return input; }
```

---

## 18. Chained `extends` for Deep Access

Narrow generics with chained `extends` constraints:

```typescript
const getDeepValue = <
  Obj,
  FirstKey extends keyof Obj,
  SecondKey extends keyof Obj[FirstKey]
>(
  obj: Obj,
  firstKey: FirstKey,
  secondKey: SecondKey,
): Obj[FirstKey][SecondKey] => { ... };

getDeepValue(obj, "bar", "d"); // autocomplete on both keys
```

---

## 19. Default Generic Slots as Local Variables

Extract repeated sub-expressions into default generic parameters:

```typescript
// Before: duplicated Extract<keyof Obj, `a${string}`>
type ValuesOfKeysStartingWithA<Obj> = {
  [K in Extract<keyof Obj, `a${string}`>]: Obj[K]
}[Extract<keyof Obj, `a${string}`>]

// After: extracted to default generic
type ValuesOfKeysStartingWithA<
  Obj,
  _Keys extends keyof Obj = Extract<keyof Obj, `a${string}`>
> = { [K in _Keys]: Obj[K] }[_Keys]
```

---

## 20. Force Explicit Property Passing

Use `| undefined` on optional properties to force call sites to be explicit:

```typescript
interface UserInfo {
  role?: "admin" | undefined; // Must explicitly pass role or undefined
}

createUser({}); // Error! Must pass role
createUser({ role: undefined }); // OK
```

---

## 21. Derive Union from Object

Map over an object's keys and index to collapse into a union:

```typescript
type SingleFruitCount = {
  [K in keyof FruitCounts]: { [K2 in K]: number }
}[keyof FruitCounts];
// { apple: number } | { pear: number } | { banana: number }
```

---

## 22. Transform Unions with `in` Operator

Use mapped types to iterate over union members and derive new unions:

```typescript
type EntityWithId = {
  [E in Entity["type"]]: { type: E } & Record<`${E}Id`, string>
}[Entity["type"]];
// { type: "user"; userId: string } | { type: "post"; postId: string } | ...
```

---

## 23. Assertion Functions in Classes

Narrow `this` type with assertion methods:

```typescript
class SDK {
  userId?: string;

  assertLoggedIn(): asserts this is this & { userId: string } {
    if (!this.userId) throw new Error("Not logged in");
  }

  getUser() {
    this.assertLoggedIn();
    // this.userId is now string, not string | undefined
  }
}
```

---

## 24. `useState` Mental Model (React)

| Declaration | Type |
|-------------|------|
| `useState()` | `undefined` — can't set anything |
| `useState<string>()` | `string \| undefined` |
| `useState([])` | `never[]` — can't add items |
| `useState<Type[]>([])` | Correct — pass both type arg and initial value |

---

## 25. Function Overloads for Compose

Chain overloads with generics to type function composition:

```typescript
function compose<I, A>(fn: (i: I) => A): (i: I) => A;
function compose<I, A, B>(fn: (i: I) => A, fn2: (a: A) => B): (i: I) => B;
function compose(...args: any[]): any { return {} as any; }
```

---

## 26. Typed `objectKeys` Helper

`Object.keys()` returns `string[]`. Create a typed version:

```typescript
const objectKeys = <Obj>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[];
};
```

---

## 27. Extract Props from Components

Use `infer` with conditional types to extract props from React components:

```typescript
type PropsFrom<C> = C extends React.FC<infer P>
  ? P
  : C extends React.Component<infer P>
    ? P
    : never;
```

---

## Source

These practices are distilled from the 34 video tips at [TotalTypeScript.com/tips](https://totaltypescript.com/tips) by Matt Pocock.
