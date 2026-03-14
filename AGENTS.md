Here is the converted template for your `AGENTS.md` file. I have replaced specific references to your project name, package name, and directory structure with placeholders like `{{PROJECT_NAME}}` and `{{PACKAGE_NAME}}` so you can reuse this for any repository.

---

# {{PROJECT_NAME}} - AI Agent Context (Template)

Context for AI coding agents (Claude Code, Cursor, GitHub Copilot, etc.) to understand the architecture, constraints, and workflow of this repository.

## What This Package Does

`{{PACKAGE_NAME}}` is a {{LANGUAGE/FRAMEWORK}} abstraction for {{CORE_PURPOSE}}. It handles the following core concerns:

1. **{{MODULE_1}}** — {{DESCRIPTION_1}}
2. **{{MODULE_2}}** — {{DESCRIPTION_2}}
3. **{{MODULE_3}}** — {{DESCRIPTION_3}}
4. **{{MODULE_4}}** — {{DESCRIPTION_4}}

The public API entry point is: `{{ENTRY_POINT_FUNCTION}}`.

## Directory Structure

```
{{SOURCE_DIR}}/
  types.ts        All TypeScript interfaces and type definitions
  {{CORE_LOGIC}}.ts  Main factory or entry function
  {{MODULE_A}}.ts    Description of module A
  {{MODULE_B}}.ts    Description of module B
  index.ts        Public exports and barrel file

```

## Build & Development Commands

| Command | What it does |
| --- | --- |
| `{{BUILD_CMD}}` | Compiles the project to the output directory |
| `{{TYPECHECK_CMD}}` | Runs static type analysis without emitting files |
| `{{TEST_CMD}}` | Executes the automated test suite |

Always run `{{TYPECHECK_CMD}} && {{BUILD_CMD}}` after changes. Both must pass before committing.

## Code Style & Standards

* **Strictness**: {{STRICT_MODE_SETTING}}. Zero `any` types.
* **Module System**: {{ESM_OR_CJS}}.
* **Documentation**: No inline comments; code must be self-documenting through naming.
* **File Limits**: Keep files under {{LINE_LIMIT}} lines. Split logic if it exceeds this.
* **Dependencies**: {{DEPENDENCY_POLICY}} (e.g., "Minimize runtime dependencies").
* **Async**: All async functions must return explicitly typed Promises.

## Git Workflow

{{COMMIT_CONVENTION_NAME}} only (e.g., Conventional Commits):

```
feat: {{FEAT_EXAMPLE}}
fix: {{FIX_EXAMPLE}}
refactor: {{REFACTOR_EXAMPLE}}
docs: {{DOCS_EXAMPLE}}

```

One logical change per commit. No "WIP" commits on the main branch.

## Quality Assurance & Testing

Validation follows these steps:

1. **Static Analysis**: `{{TYPECHECK_CMD}}` must pass with zero errors.
2. **Build**: `{{BUILD_CMD}}` must succeed.
3. **Tests**: {{TEST_INSTRUCTIONS}} (e.g., "Run pnpm test" or "Manual smoke test").

**Contract-First Development**: When adding functionality, update `types.ts` first. Types are the source of truth.

## Key Constraints & Architecture Rules

* **Persistence**: {{PERSISTENCE_RULES}} (e.g., "Don't hardcode file paths for cache").
* **Data Flow**: {{CRITICAL_DATA_FLOW_PATH}} (e.g., "Ensure ID remains consistent through webhooks").
* **State**: {{STATE_MANAGEMENT_RULES}} (e.g., "The dedup map is in-memory; do not add persistence without config").
* **Integration**: {{INTEGRATION_NOTES}} (e.g., "Middleware must handle raw body parsing for signature verification").