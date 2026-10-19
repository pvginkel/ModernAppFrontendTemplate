#!/usr/bin/env bash
# Regenerate the test-apps from the template and copy domain files.
#
# Two test-apps, one per value of use_app_shell; every other answer is the
# same, so a diff between them is the flag's effect:
#   test-app           use_app_shell=true. Tracked; the root test-app copies it,
#                      and Playwright runs it there.
#   test-app-no-shell  use_app_shell=false, as ZigbeeControl, FieldnotesApp and
#                      PilotApp run. Built and checked, never run: the root's
#                      test-app-no-storage copies it, for its backend suite
#                      alone. Gitignored: tracking it would repeat test-app's
#                      regen churn (the same lockfile) on every template commit.
#
# Usage:
#   cd /work/ModernAppTemplate/frontend
#   bash regen.sh                      # both test-apps
#   bash regen.sh test-app-no-shell    # only the named ones
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# regen <dir> <use_app_shell>
regen() {
  local app="$1" shell="$2"

  echo "==> [$app] Removing old test-app..."
  rm -rf "$app"

  echo "==> [$app] Running copier copy..."
  # copier is the backend template repo's pinned one: one pin for both templates.
  UV_LINK_MODE=copy uv run --project ../backend --locked copier copy . "$app" --trust --defaults --vcs-ref HEAD \
    -d project_name=test-app \
    -d project_title="Test App" \
    -d project_description="Test application" \
    -d author_name="Test Author" \
    -d author_email="test@example.com" \
    -d backend_port=5000 \
    -d frontend_port=3000 \
    -d use_oidc=true \
    -d use_sse=true \
    -d use_app_shell="$shell"

  echo "==> [$app] Copying domain files from test-app-domain..."

  # App identity
  cp test-app-domain/src/lib/consts.ts "$app/src/lib/consts.ts"
  cp test-app-domain/src/styles/app-theme.css "$app/src/styles/app-theme.css"
  if [ "$shell" = true ]; then
    # The shell's navigation. Copier excludes it without the shell, and its
    # import of ./sidebar would fail tsc there.
    cp test-app-domain/src/components/layout/sidebar-nav.ts "$app/src/components/layout/sidebar-nav.ts"
  fi

  # Domain routes
  mkdir -p "$app/src/routes/items"
  cp test-app-domain/src/routes/index.tsx "$app/src/routes/index.tsx"
  cp test-app-domain/src/routes/about.tsx "$app/src/routes/about.tsx"
  cp test-app-domain/src/routes/items/index.tsx "$app/src/routes/items/index.tsx"
  cp test-app-domain/src/routes/items/\$itemId.tsx "$app/src/routes/items/\$itemId.tsx"
  cp test-app-domain/src/routes/items/new.tsx "$app/src/routes/items/new.tsx"

  # Pre-generated API client
  mkdir -p "$app/src/lib/api/generated"
  cp test-app-domain/src/lib/api/generated/types.ts "$app/src/lib/api/generated/types.ts"
  cp test-app-domain/src/lib/api/generated/client.ts "$app/src/lib/api/generated/client.ts"
  cp test-app-domain/src/lib/api/generated/hooks.ts "$app/src/lib/api/generated/hooks.ts"

  # Pre-cached OpenAPI spec (for generate:api:build)
  mkdir -p "$app/openapi-cache"
  cp test-app-domain/openapi-cache/openapi.json "$app/openapi-cache/openapi.json"

  # Test support (domain fixtures and selectors)
  cp test-app-domain/tests/support/fixtures.ts "$app/tests/support/fixtures.ts"
  cp test-app-domain/tests/support/selectors-domain.ts "$app/tests/support/selectors-domain.ts"

  # Favicon
  cp test-app-domain/public/favicon.png "$app/public/favicon.png" 2>/dev/null || true

  echo "==> [$app] Copying domain E2E tests from test-app-domain..."

  # Domain-specific E2E tests (use domain fixtures, not distributable via template)
  mkdir -p "$app/tests/e2e/parallel"
  cp test-app-domain/tests/e2e/parallel/worker-isolation.spec.ts "$app/tests/e2e/parallel/"

  if [ "$shell" = true ]; then
    # Domain-specific infrastructure tests (depend on the shell's routes and navigation)
    mkdir -p "$app/tests/infrastructure/shell"
    cp test-app-domain/tests/infrastructure/shell/navigation.spec.ts "$app/tests/infrastructure/shell/"
    cp test-app-domain/tests/infrastructure/shell/mobile-menu.spec.ts "$app/tests/infrastructure/shell/"
    cp test-app-domain/tests/infrastructure/auth/auth-shell-home.spec.ts "$app/tests/infrastructure/auth/"
  fi

  # Test environment overrides (e.g. BACKEND_ROOT for the template's directory layout)
  cp .env.test "$app/.env.test"

  echo "# Test App" > "$app/README.md"

  if git check-ignore -q "$app"; then
    # knip reads every .gitignore from its directory up to the git root, so
    # under this repo's .gitignore it would see no files at all. A repo of its
    # own makes it read only the render's .gitignore, as in an app, and the
    # commit gives vite.config.ts the HEAD it stamps into version.json.
    git init -q "$app"
    git -C "$app" add -A
    git -C "$app" -c user.name=regen.sh -c user.email=regen@localhost commit -q -m "copier copy"
  fi

  echo "==> [$app] Installing dependencies..."
  # The pnpm store is the environment's shared one (pnpm_config_store_dir), so
  # the second test-app's install links what the first one fetched.
  (cd "$app" && pnpm install)

  echo "==> [$app] Generating route tree..."
  (cd "$app" && pnpm exec tsr generate)
}

apps=("$@")
if [ ${#apps[@]} -eq 0 ]; then
  apps=(test-app test-app-no-shell)
fi

for app in "${apps[@]}"; do
  case "$app" in
    test-app) regen test-app true ;;
    test-app-no-shell) regen test-app-no-shell false ;;
    *) echo "Unknown test-app: $app (expected test-app or test-app-no-shell)" >&2; exit 2 ;;
  esac
done

echo ""
echo "Done. Run validation in each regenerated test-app with:"
echo "  pnpm run check      # lint + typecheck + knip"
echo "  pnpm run build      # production build"
