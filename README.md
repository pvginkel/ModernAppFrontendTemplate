# Frontend Template

Copier-based template for generating self-contained React/Vite/TypeScript frontend projects. Each generated project is plain TypeScript with no runtime dependency on the template. Template updates via `copier update` with three-way merge.

## Stack

- **React 19** with TypeScript
- **Vite 7** for dev server and production builds
- **TanStack Router** — file-based routing with type-safe params
- **TanStack Query** — server state management with generated hooks
- **Tailwind CSS 4** — utility-first styling with `@theme` tokens
- **Radix UI** — accessible headless primitives (Dialog, DropdownMenu, Popover, Toast)
- **Playwright** — E2E testing with per-worker service isolation
- **OpenAPI code generation** — types, client, and TanStack Query hooks from backend spec

## Feature Flags

| Flag | What it includes |
|------|-----------------|
| `use_oidc` | Auth context, auth gate, user dropdown, login redirect, 401 handling |
| `use_sse` | SSE context, SharedWorker, version tracking, deployment notification bar, task event hooks |

Features are toggled at generation time. Disabled features exclude the relevant files entirely (no dead code).

## Project Structure

```
frontend/
├── copier.yml              # Template configuration and feature flags
├── template/               # Copier template source (Jinja2 + plain files)
│   ├── src/
│   │   ├── components/
│   │   │   ├── primitives/ # Template-owned: logic, Radix wrappers, state, a11y
│   │   │   ├── ui/         # App-owned: pure styled components (generated once)
│   │   │   ├── icons/      # Template-owned: SVG icon components
│   │   │   ├── auth/       # Auth gate (use_oidc)
│   │   │   └── layout/     # Sidebar, top bar, screen layouts
│   │   ├── styles/         # App-owned: variant configs + app-theme.css
│   │   ├── contexts/       # React contexts (auth, SSE, toast, correlation)
│   │   ├── providers/      # Provider composition (core, auth, SSE)
│   │   ├── hooks/          # Infrastructure hooks
│   │   ├── lib/            # Utilities, API client, test instrumentation
│   │   ├── workers/        # SSE SharedWorker (use_sse)
│   │   └── routes/         # __root.tsx (template), rest is app-owned
│   ├── tests/support/      # Playwright infrastructure
│   ├── scripts/            # OpenAPI generation, build verification
│   └── *.jinja             # Parameterized files (6 total)
├── test-app/               # Generated test application (DO NOT edit directly)
├── test-app-domain/        # Hand-written domain files copied into test-app
├── tests/                  # Mother project test suite (template E2E tests)
├── regen.sh                # Regeneration script
├── pyproject.toml          # Dev dependencies (copier)
└── .env.test               # Test environment overrides
```

## Quick Start

### Generate a new project

```bash
pip install copier
copier copy https://<git-server>/ModernAppFrontendTemplate.git my-app \
  -d project_name=my-app \
  -d project_title="My App" \
  -d use_oidc=true \
  -d use_sse=true
cd my-app && pnpm install
```

### Development

```bash
pnpm run dev              # Start Vite dev server
pnpm run generate:api     # Regenerate API client from running backend
pnpm run check            # Lint + typecheck
pnpm run build            # Production build (includes API gen + checks)
```

### Update from template

```bash
copier update --trust
```

This three-way merges template changes into your project, preserving app-owned files.

## File Ownership Model

### Template-owned (updated by `copier update`)

Infrastructure code: config files, primitives, contexts, providers, hooks, lib, test support, scripts. Changes from template updates are merged in automatically.

### App-owned (`_skip_if_exists` — generated once, never overwritten)

- `src/styles/app-theme.css` — brand colors, CSS custom properties
- `src/styles/*.ts` — component variant configs (button, alert, card, etc.)
- `src/components/ui/` — styled components (badge, skeleton, icon-badge, etc.)
- `src/lib/consts.ts` — project name, title, description, ports
- `src/components/layout/sidebar-nav.ts` — navigation items
- `src/routes/` — all domain routes (except `__root.tsx`)
- `src/lib/api/generated/` — OpenAPI-generated types, client, hooks
- `tests/support/fixtures.ts` — extends infrastructure with domain page objects
- `tests/support/selectors-domain.ts` — domain-specific test selectors
- `package.json` — dependencies (app manages after generation)

## Component Architecture

Components are split by ownership:

- **`primitives/`** — Template-owned. Radix wrappers, keyboard navigation, state management, accessibility. Import variant classes from `styles/`. Updated by `copier update` to get bug fixes and new features.

- **`ui/`** — App-owned. Pure styled components (Badge, Skeleton, IconBadge, etc.). Generated once with sensible defaults. Apps customize freely without worrying about template overwrites.

- **`styles/`** — App-owned. Variant class maps consumed by primitives, plus `app-theme.css`. This is where apps customize how primitives look — color schemes, size scales, hover effects — without touching primitive logic.

## Jinja Files

The template uses 9 `.jinja` files (all others are plain files):

| File | What's parameterized |
|------|---------------------|
| `index.html.jinja` | `<title>` from `project_description` |
| `package.json.jinja` | Project name, description, dev server port |
| `vite.config.ts.jinja` | Backend/SSE proxy ports, SSE proxy block conditional |
| `src/lib/consts.ts.jinja` | Project name, title, description, ports |
| `src/providers/index.tsx.jinja` | Conditional provider imports (OIDC, SSE) |
| `src/routes/__root.tsx.jinja` | Conditional DeploymentNotificationBar (SSE) |
| `src/components/primitives/index.ts.jinja` | Conditional DeploymentNotificationBar export (SSE) |
| `tests/support/fixtures-infrastructure.ts.jinja` | Conditional SSE fixtures |
| `{{ _copier_conf.answers_file }}.jinja` | Standard copier answers file |

## Working on the Template

```bash
cd /work/ModernAppTemplate/frontend

# Edit files in template/, then regenerate:
bash regen.sh

# Validate:
cd test-app
pnpm run check      # lint + typecheck
pnpm run build       # production build
```

### regen.sh

Removes old `test-app/`, runs `copier copy` with all flags enabled, copies `test-app-domain/` files on top, installs dependencies, and generates the route tree.

### test-app-domain

Contains the minimal domain code for the test application:
- Items CRUD routes (list, detail, create)
- Pre-generated API client from the backend test-app's OpenAPI spec
- Domain test fixtures and selectors
- App identity (consts, theme, navigation)

## Reference

- **Parent repo docs:** `/work/ModernAppTemplate/docs/`
- **Backend template:** `/work/ModernAppTemplate/backend/`
- **Reference app:** `/work/ElectronicsInventory/frontend/`
