#!/usr/bin/env bash
# Regenerate test-app from the template and copy domain files.
#
# Usage:
#   cd /work/ModernAppTemplate/frontend
#   bash regen.sh
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==> Removing old test-app..."
rm -rf test-app

echo "==> Running copier copy..."
poetry run copier copy . test-app --trust --defaults \
  -d project_name=test-app \
  -d project_title="Test App" \
  -d project_description="Test application" \
  -d author_name="Test Author" \
  -d author_email="test@example.com" \
  -d repo_url="https://github.com/test/test-app.git" \
  -d backend_port=5000 \
  -d sse_gateway_port=3001 \
  -d frontend_port=3000 \
  -d use_oidc=true \
  -d use_s3=true \
  -d use_sse=true

echo "==> Copying domain files from test-app-domain..."

# App identity
cp test-app-domain/src/lib/consts.ts test-app/src/lib/consts.ts
cp test-app-domain/src/styles/app-theme.css test-app/src/styles/app-theme.css
cp test-app-domain/src/components/layout/sidebar-nav.ts test-app/src/components/layout/sidebar-nav.ts

# Domain routes
mkdir -p test-app/src/routes/items
cp test-app-domain/src/routes/index.tsx test-app/src/routes/index.tsx
cp test-app-domain/src/routes/about.tsx test-app/src/routes/about.tsx
cp test-app-domain/src/routes/items/index.tsx test-app/src/routes/items/index.tsx
cp test-app-domain/src/routes/items/\$itemId.tsx test-app/src/routes/items/\$itemId.tsx
cp test-app-domain/src/routes/items/new.tsx test-app/src/routes/items/new.tsx

# Pre-generated API client
mkdir -p test-app/src/lib/api/generated
cp test-app-domain/src/lib/api/generated/types.ts test-app/src/lib/api/generated/types.ts
cp test-app-domain/src/lib/api/generated/client.ts test-app/src/lib/api/generated/client.ts
cp test-app-domain/src/lib/api/generated/hooks.ts test-app/src/lib/api/generated/hooks.ts

# Pre-cached OpenAPI spec (for generate:api:build)
mkdir -p test-app/openapi-cache
cp test-app-domain/openapi-cache/openapi.json test-app/openapi-cache/openapi.json

# Test support (domain fixtures and selectors)
cp test-app-domain/tests/support/fixtures.ts test-app/tests/support/fixtures.ts
cp test-app-domain/tests/support/selectors-domain.ts test-app/tests/support/selectors-domain.ts

# Favicon
cp test-app-domain/public/favicon.png test-app/public/favicon.png 2>/dev/null || true

echo "==> Copying infrastructure tests from mother project..."

# Infrastructure page objects
mkdir -p test-app/tests/support/page-objects
cp tests/support/page-objects/base-page.ts test-app/tests/support/page-objects/
cp tests/support/page-objects/app-shell-page.ts test-app/tests/support/page-objects/

# Infrastructure test specs
mkdir -p test-app/tests/e2e/auth
mkdir -p test-app/tests/e2e/deployment
mkdir -p test-app/tests/e2e/shell
mkdir -p test-app/tests/e2e/parallel
cp tests/e2e/test-infrastructure.spec.ts test-app/tests/e2e/
cp tests/e2e/auth/AuthPage.ts test-app/tests/e2e/auth/
cp tests/e2e/auth/auth.spec.ts test-app/tests/e2e/auth/
cp tests/e2e/deployment/deployment-banner.spec.ts test-app/tests/e2e/deployment/
cp tests/e2e/shell/navigation.spec.ts test-app/tests/e2e/shell/
cp tests/e2e/shell/mobile-menu.spec.ts test-app/tests/e2e/shell/
cp tests/e2e/parallel/worker-isolation.spec.ts test-app/tests/e2e/parallel/

echo "# Test App" > test-app/README.md

echo "==> Installing dependencies..."
cd test-app && pnpm install

echo "==> Generating route tree..."
pnpm exec tsr generate

echo ""
echo "Done. Run validation with:"
echo "  cd test-app"
echo "  pnpm run check      # lint + typecheck"
echo "  pnpm run build       # production build"
