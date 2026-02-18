# Frontend Template (Submodule)

This is the Copier-based frontend template that generates self-contained React/Vite/TypeScript projects. Each generated project is plain TypeScript with no runtime dependency on the template.

For shared documentation (architecture, workflows, sync process), see the **parent repo's `docs/`** directory.

## Sandbox Environment

- This repository is a submodule of `ModernAppTemplate`, mounted at `/work/ModernAppTemplate/frontend` inside the container.
- Git operations (staging, committing, tagging) work normally.
- The container includes poetry, node/npm/pnpm, and standard toolchains.

## Poetry Virtual Environments

The template project uses Poetry for copier. Generated test-app uses pnpm.

```bash
# Template operations:
cd /work/ModernAppTemplate/frontend && poetry run copier copy ...

# Test-app operations:
cd /work/ModernAppTemplate/frontend/test-app && pnpm run build
```

## Project Structure

```
frontend/
├── copier.yml          # Copier configuration and feature flags
├── template/           # Copier template source (Jinja2 + plain files)
├── test-app/           # Generated test application (DO NOT edit directly)
├── test-app-domain/    # Hand-written domain files copied into test-app after generation
├── tests/              # Mother project test suite (infrastructure E2E tests)
├── pyproject.toml      # Dev dependencies (copier)
├── regen.sh            # Regeneration script
└── .env.test           # Test environment overrides
```

## Critical Rules

### 1. Never Edit test-app Directly
`test-app/` is generated from the template. All changes go in `template/`, then regenerate.

### 2. test-app-domain Contains App-Specific Files
`test-app-domain/` has hand-written domain files (Items routes, navigation, API client, tests) that get copied into `test-app/` after Copier generation.

### 3. Always Regenerate After Template Changes
```bash
cd /work/ModernAppTemplate/frontend
bash regen.sh
```

### 4. Run Validation
```bash
cd /work/ModernAppTemplate/frontend/test-app
pnpm run check      # lint + typecheck
pnpm run build       # production build
```

### 5. Minimize Jinja Usage
- Prefer file inclusion/exclusion (via `_exclude` in copier.yml) over inline Jinja conditionals
- Use `consts.ts` (app-owned) for project name/title/ports instead of Jinja
- Reserve `.jinja` for files with substantial conditional sections

## File Ownership

### Template-maintained (overwritten by `copier update`)
Infrastructure code — config, core source, providers, contexts, hooks, lib, components, test support.

### App-maintained (`_skip_if_exists` — generated once, never overwritten)
- `src/lib/consts.ts` — project name, title, description, ports
- `src/styles/app-theme.css` — brand colors, custom CSS tokens
- `src/styles/*.ts` — component variant configs (button, alert, card, toast, input, etc.)
- `src/components/ui/` — pure styled components (badge, skeleton, label, etc.)
- `src/components/layout/sidebar-nav.ts` — app-specific navigation items
- `tests/support/fixtures.ts` — extends infrastructure with domain page objects
- `tests/support/selectors-domain.ts` — domain-specific selectors
- `package.json` — dependencies (app manages after generation)
- `.env.example` — environment documentation
- `public/favicon.png` — app icon

## Feature Flags

| Flag | Controls |
|------|----------|
| `use_oidc` | OIDC auth context, auth gate, user dropdown, login redirect, 401 handling |
| `use_s3` | File upload components, file validation, thumbnail URL utilities |
| `use_sse` | SSE context, SharedWorker, version tracking, deployment bar, task event hooks |

## Hook Contract

The app customizes behavior through extension points:

1. **Project identity** — `src/lib/consts.ts` (name, title, ports)
2. **Navigation items** — `src/components/layout/sidebar-nav.ts`
3. **Brand theme** — `src/styles/app-theme.css`
4. **Component variants** — `src/styles/*.ts` (button, alert, card, toast, etc.)
5. **Routes** — file-based routes under `src/routes/`
6. **API layer** — regenerate `src/lib/api/generated/` from OpenAPI spec
7. **Test fixtures** — extend `tests/support/fixtures-infrastructure.ts` in `tests/support/fixtures.ts`
8. **Test selectors** — add domain selectors in `tests/support/selectors-domain.ts`

## Reference App

Template patterns are extracted from: `/work/ElectronicsInventory/frontend/`
