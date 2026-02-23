/**
 * Home link navigation test.
 * Domain-specific — verifies the logo/title link navigates to the app's
 * primary route (/items), which depends on the app's sidebar-nav configuration.
 */

import { test, expect } from '../../support/fixtures'
import { AuthPage } from './AuthPage'

test.describe('App Shell Layout - Home Navigation', () => {
  test('logo and title link to home route', async ({ page, auth }) => {
    await auth.createSession({ name: 'Navigation User' })

    await page.goto('/about')

    const authPage = new AuthPage(page)
    await authPage.waitForAuthenticated()

    await authPage.clickHomeLink()

    await expect(page).toHaveURL(/\/items/)
  })
})
