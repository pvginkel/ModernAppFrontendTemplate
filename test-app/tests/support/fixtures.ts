/**
 * Domain-specific test fixtures for the test application.
 * Extends infrastructure fixtures with Items page objects.
 */

/* eslint-disable react-hooks/rules-of-hooks */
import { infrastructureFixtures, type InfrastructureFixtures } from './fixtures-infrastructure';
import type { Page } from '@playwright/test';

class ItemsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/items');
  }

  async createItem(name: string, description?: string) {
    await this.page.click('[data-testid="items.create-button"]');
    await this.page.fill('[data-testid="items.create.name"]', name);
    if (description) {
      await this.page.fill('[data-testid="items.create.description"]', description);
    }
    await this.page.click('[data-testid="items.create.submit"]');
  }
}

interface DomainFixtures extends InfrastructureFixtures {
  items: ItemsPage;
}

export const test = infrastructureFixtures.extend<DomainFixtures>({
  items: async ({ page }, use) => {
    await use(new ItemsPage(page));
  },
});

export { expect } from '@playwright/test';
