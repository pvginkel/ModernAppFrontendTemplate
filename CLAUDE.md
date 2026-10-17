# Frontend Template (Submodule)

This is the Copier-based frontend template that generates self-contained React/Vite/TypeScript projects. Each generated project is plain TypeScript with no runtime dependency on the template.

For shared documentation (architecture, workflows, sync process), see the **parent repo's `docs/`** directory.

## Sandbox Environment

- This repository is a submodule of `ModernAppTemplate`, mounted at `/work/ModernAppTemplate/frontend` inside the container.
- Git operations (staging, committing, tagging) work normally.
- uv, node/npm/pnpm and the standard toolchains live in the `modern-app` tool container: prefix commands with `cexec modern-app`.

## Toolchains

This repo has no Python project of its own: copier comes from the backend template repo's uv project (`../backend`), which pins it for both templates. Generated test-app uses pnpm.

```bash
# Template operations:
cd /work/ModernAppTemplate/frontend && uv run --project ../backend copier copy ...

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

## Playwright

The specs run from the root template's test-app, which pairs this test-app with the backend's. Run them by hand after `kc project build` (one worker: the modern-app container has 5 GiB):

```bash
cexec modern-app sh -c 'cd /work/ModernAppTemplate/root/test-app && uv run run-suite --suite frontend --frontend-args="--workers=1"'
```

Playwright records no video by default; `PLAYWRIGHT_RETAIN_VIDEO=true` keeps the videos of failed tests.

**Preview mode** runs the specs against a production build: each worker's frontend is `vite preview` on `dist/` (`scripts/testing-server.sh --preview`) instead of the dev server. Specs that need a production build skip without it, such as the SharedWorker ones in `sse-connectivity.spec.ts`: `shouldUseSharedWorker()` is false under the dev server. It takes two steps in the frontend directory, here `/work/ModernAppTemplate/root/test-app/frontend` once a suite run has set it up:

```bash
cexec modern-app sh -c 'cd /work/ModernAppTemplate/root/test-app/frontend && VITE_TEST_MODE=true pnpm build'
cexec modern-app sh -c 'cd /work/ModernAppTemplate/root/test-app/frontend && PLAYWRIGHT_PREVIEW_MODE=true pnpm playwright test --workers=1'
```

`VITE_TEST_MODE=true` at build time puts the Playwright bridges into the bundle, so never set it for an image build (`verify:build` only warns). The root suite runner builds without it and does not set `PLAYWRIGHT_PREVIEW_MODE`, so a suite run skips the preview-only specs.

## File Ownership

### Template-maintained (overwritten by `copier update`)
Infrastructure code — config, core source, providers, contexts, hooks, lib, components, test support.

### App-maintained (`_skip_if_exists` — generated once, never overwritten)
- `src/lib/consts.ts` — project name, title, description, ports
- `src/styles/app-theme.css` — brand colors, custom CSS tokens
- `src/styles/*.ts` — component variant configs (button, alert, card, toast, input, etc.)
- `src/components/ui/index.ts` — re-exports; the template's own ui components are template-owned since v0.18.0
- `src/components/layout/sidebar-nav.ts` — app-specific navigation items
- `src/routes/index.tsx` — placeholder home page (a fresh app needs a route besides `__root`)
- `tests/support/fixtures.ts` — extends infrastructure with domain page objects
- `tests/support/selectors-domain.ts` — domain-specific selectors
- `package.json` — dependencies (app manages after generation)
- `.env.example` — environment documentation
- `public/favicon.png` — app icon
- `.dockerignore` — image build context excludes

## Feature Flags

| Flag | Controls |
|------|----------|
| `use_oidc` | OIDC auth context, auth gate, user dropdown, login redirect, 401 handling |
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

## OpenAPI Spec Pipeline

The frontend API client is generated from the backend's OpenAPI spec. **Never hand-edit the cached spec or generated types/hooks** — always fix the source:

1. **Backend generates the spec** — Spectree decorators (`@api.validate()`) on Flask endpoints produce the OpenAPI schema at `/api/docs/openapi.json`. If an endpoint is missing `requestBody` or response types, add/fix the `@api.validate()` decorator in the backend blueprint.
2. **Frontend fetches and caches** — `scripts/fetch-openapi.js` downloads the spec from the running backend and saves it to `openapi-cache/openapi.json`.
3. **Code generation** — `scripts/generate-api.js` reads the cached spec and produces `src/lib/api/generated/{types.ts,hooks.ts,client.ts}`.
4. **test-app-domain** — Pre-generated `types.ts` and `hooks.ts` in `test-app-domain/src/lib/api/generated/` must stay in sync with the cached spec. After updating the spec, regenerate (`bash regen.sh && pnpm run build`) and copy the freshly generated files back to `test-app-domain/`.

## Reference App

Template patterns are extracted from: `/work/ElectronicsInventory/frontend/`
