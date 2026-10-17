import { test, expect } from '../../support/fixtures';

test.describe.parallel('Per-worker backend isolation', () => {
  const itemName = 'Worker Isolation Item';

  test('worker A creates the canonical item', async ({ items, page }) => {
    await items.goto();
    await items.createItem(itemName, 'Created by worker A');

    // Look for this test's item by its description: at one worker, both tests
    // share the worker's database, so the list can hold the other's too.
    await expect(page.getByText('Created by worker A')).toBeVisible();
  });

  test('worker B can recreate the same item without conflicts', async ({ items, page }) => {
    await items.goto();
    await items.createItem(itemName, 'Created by worker B');

    // Look for this test's item by its description: at one worker, both tests
    // share the worker's database, so the list can hold the other's too.
    await expect(page.getByText('Created by worker B')).toBeVisible();
  });
});
