// Generated API client - do not edit manually
import createClient, { type Middleware } from 'openapi-fetch';
import type { paths } from './types';
import { buildLoginUrl } from '@/lib/auth-redirect';

// Middleware to intercept 401 responses and redirect to login
const authMiddleware: Middleware = {
  async onResponse({ response }) {
    if (response.status === 401) {
      // Redirect to login, preserving the current URL
      window.location.href = buildLoginUrl();
    }
    return response;
  },
};

// Create the main API client
export const api = createClient<paths>({
  baseUrl: '',
});

// Register auth middleware
api.use(authMiddleware);

// Export types for convenience
export type * from './types';
