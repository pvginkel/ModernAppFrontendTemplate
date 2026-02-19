import { test, expect } from '../../support/fixtures';

test.describe.parallel('Per-worker backend isolation', () => {
  const itemName = 'Worker Isolation Item';

  test('worker A creates the canonical item', async ({ items, page }) => {
    await items.goto();
    await items.createItem(itemName, 'Created by worker A');

    // Verify item was created by checking the page contains the item name
    await expect(page.getByText(itemName)).toBeVisible();
  });

  test('worker B can recreate the same item without conflicts', async ({ items, page }) => {
    await items.goto();
    await items.createItem(itemName, 'Created by worker B');

    // Verify item was created by checking the page contains the item name
    await expect(page.getByText(itemName)).toBeVisible();
  });
});
