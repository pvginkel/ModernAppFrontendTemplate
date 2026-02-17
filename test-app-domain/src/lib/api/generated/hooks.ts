// Generated TanStack Query hooks - do not edit manually
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toApiError } from '@/lib/api/api-error';
import { api } from './client';
import type { paths, components } from './types';

// Type aliases for better developer experience
export type ContentHtmlQuerySchema_7ccab41 = components['schemas']['ContentHtmlQuerySchema.7ccab41'];
export type ContentImageQuerySchema_7ccab41 = components['schemas']['ContentImageQuerySchema.7ccab41'];
export type DeploymentTriggerRequestSchema_6b6ce9f = components['schemas']['DeploymentTriggerRequestSchema.6b6ce9f'];
export type DeploymentTriggerResponseSchema_6b6ce9f = components['schemas']['DeploymentTriggerResponseSchema.6b6ce9f'];
export type ForceErrorQuerySchema_e510e64 = components['schemas']['ForceErrorQuerySchema.e510e64'];
export type HealthResponse_d817ae2 = components['schemas']['HealthResponse.d817ae2'];
export type TaskEventRequestSchema_6b6ce9f = components['schemas']['TaskEventRequestSchema.6b6ce9f'];
export type TaskEventResponseSchema_6b6ce9f = components['schemas']['TaskEventResponseSchema.6b6ce9f'];
export type TaskStartRequestSchema_6b6ce9f = components['schemas']['TaskStartRequestSchema.6b6ce9f'];
export type TaskStartResponseSchema_6b6ce9f = components['schemas']['TaskStartResponseSchema.6b6ce9f'];
export type TestErrorResponseSchema_6b6ce9f = components['schemas']['TestErrorResponseSchema.6b6ce9f'];
export type TestSessionCreateSchema_e510e64 = components['schemas']['TestSessionCreateSchema.e510e64'];
export type TestSessionResponseSchema_e510e64 = components['schemas']['TestSessionResponseSchema.e510e64'];
export type UserInfoResponseSchema_a535b8c = components['schemas']['UserInfoResponseSchema.a535b8c'];
export type ValidationError_6a07bef = components['schemas']['ValidationError.6a07bef'];
export type ValidationError_6a07bef_ValidationErrorElement = components['schemas']['ValidationError.6a07bef.ValidationErrorElement'];
export type GetCasByHashValueParameters = paths['/api/cas/{hash_value}']['get']['parameters'];
export type DeleteItemsByItemIdParameters = paths['/api/items/{item_id}']['delete']['parameters'];
export type GetItemsByItemIdParameters = paths['/api/items/{item_id}']['get']['parameters'];
export type PatchItemsByItemIdParameters = paths['/api/items/{item_id}']['patch']['parameters'];
export type DeleteTasksByTaskIdParameters = paths['/api/tasks/{task_id}']['delete']['parameters'];
export type PostTasksCancelByTaskIdParameters = paths['/api/tasks/{task_id}/cancel']['post']['parameters'];
export type GetTasksStatusByTaskIdParameters = paths['/api/tasks/{task_id}/status']['get']['parameters'];
export type PostTestingAuthForceErrorParameters = paths['/api/testing/auth/force-error']['post']['parameters'];
export type GetTestingContentHtmlParameters = paths['/api/testing/content/html']['get']['parameters'];
export type GetTestingContentHtmlWithBannerParameters = paths['/api/testing/content/html-with-banner']['get']['parameters'];
export type GetTestingContentImageParameters = paths['/api/testing/content/image']['get']['parameters'];

/**
 * Handle OIDC callback after user authorization.
 */
export function useGetAuthCallback(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getAuthCallback', params],
    queryFn: async () => {
      const result = await api.GET('/api/auth/callback' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Initiate OIDC login flow with PKCE.
 */
export function useGetAuthLogin(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getAuthLogin', params],
    queryFn: async () => {
      const result = await api.GET('/api/auth/login' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Log out current user.
 */
export function useGetAuthLogout(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getAuthLogout', params],
    queryFn: async () => {
      const result = await api.GET('/api/auth/logout' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Get current authenticated user information.
 */
export function useGetAuthSelf(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<UserInfoResponseSchema_a535b8c>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getAuthSelf', params],
    queryFn: async () => {
      const result = await api.GET('/api/auth/self' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Serve content from CAS storage with immutable caching.
 */
export function useGetCasByHashValue(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getCasByHashValue', params],
    queryFn: async () => {
      const result = await api.GET('/api/cas/{hash_value}', { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * List all items.
 */
export function useGetItems(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getItems', params],
    queryFn: async () => {
      const result = await api.GET('/api/items' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Create a new item.
 */
export function usePostItems(options?: Omit<Parameters<typeof useMutation>[0], 'mutationFn'>): ReturnType<typeof useMutation<void, Error, void>> {
  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: async () => {
      const result = await api.POST('/api/items' as const) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries();
    },
    ...options
  });
}

/**
 * Delete an item.
 */
export function useDeleteItemsByItemId(options?: Omit<Parameters<typeof useMutation>[0], 'mutationFn'>): ReturnType<typeof useMutation<void, Error, { path: DeleteItemsByItemIdParameters['path'] }>> {
  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: async (variables: { path: DeleteItemsByItemIdParameters['path'] }) => {
      const result = await api.DELETE('/api/items/{item_id}', { params: { path: variables.path } }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries();
    },
    ...options
  });
}

/**
 * Get an item by ID.
 */
export function useGetItemsByItemId(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getItemsByItemId', params],
    queryFn: async () => {
      const result = await api.GET('/api/items/{item_id}', { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Update an item.
 */
export function usePatchItemsByItemId(options?: Omit<Parameters<typeof useMutation>[0], 'mutationFn'>): ReturnType<typeof useMutation<void, Error, { path: PatchItemsByItemIdParameters['path'] }>> {
  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: async (variables: { path: PatchItemsByItemIdParameters['path'] }) => {
      const result = await api.PATCH('/api/items/{item_id}', { params: { path: variables.path } }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries();
    },
    ...options
  });
}

/**
 * Handle SSE Gateway connect/disconnect callbacks.
 */
export function usePostSseCallback(options?: Omit<Parameters<typeof useMutation>[0], 'mutationFn'>): ReturnType<typeof useMutation<void, Error, void>> {
  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: async () => {
      const result = await api.POST('/api/sse/callback' as const) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries();
    },
    ...options
  });
}

/**
 * Remove a completed task from registry.
 */
export function useDeleteTasksByTaskId(options?: Omit<Parameters<typeof useMutation>[0], 'mutationFn'>): ReturnType<typeof useMutation<void, Error, { path: DeleteTasksByTaskIdParameters['path'] }>> {
  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: async (variables: { path: DeleteTasksByTaskIdParameters['path'] }) => {
      const result = await api.DELETE('/api/tasks/{task_id}', { params: { path: variables.path } }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries();
    },
    ...options
  });
}

/**
 * Cancel a running task.
 */
export function usePostTasksCancelByTaskId(options?: Omit<Parameters<typeof useMutation>[0], 'mutationFn'>): ReturnType<typeof useMutation<void, Error, { path: PostTasksCancelByTaskIdParameters['path'] }>> {
  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: async (variables: { path: PostTasksCancelByTaskIdParameters['path'] }) => {
      const result = await api.POST('/api/tasks/{task_id}/cancel', { params: { path: variables.path } }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries();
    },
    ...options
  });
}

/**
 * Get current status of a task.
 */
export function useGetTasksStatusByTaskId(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getTasksStatusByTaskId', params],
    queryFn: async () => {
      const result = await api.GET('/api/tasks/{task_id}/status', { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Clear the current test session for test isolation.
 */
export function usePostTestingAuthClear(options?: Omit<Parameters<typeof useMutation>[0], 'mutationFn'>): ReturnType<typeof useMutation<void, Error, void>> {
  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: async () => {
      const result = await api.POST('/api/testing/auth/clear' as const) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries();
    },
    ...options
  });
}

/**
 * Configure /api/auth/self to return an error on the next request.
 */
export function usePostTestingAuthForceError(options?: Omit<Parameters<typeof useMutation>[0], 'mutationFn'>): ReturnType<typeof useMutation<void, Error, { query: PostTestingAuthForceErrorParameters['query'] }>> {
  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: async (variables: { query: PostTestingAuthForceErrorParameters['query'] }) => {
      const result = await api.POST('/api/testing/auth/force-error' as const, { params: { query: variables.query } }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries();
    },
    ...options
  });
}

/**
 * Create an authenticated test session, bypassing the real OIDC flow.
 */
export function usePostTestingAuthSession(options?: Omit<Parameters<typeof useMutation>[0], 'mutationFn'>): ReturnType<typeof useMutation<TestSessionResponseSchema_e510e64, Error, { body: TestSessionCreateSchema_e510e64 }>> {
  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: async (variables: { body: TestSessionCreateSchema_e510e64 }) => {
      const result = await api.POST('/api/testing/auth/session' as const, { body: variables.body }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries();
    },
    ...options
  });
}

/**
 * Return deterministic HTML content without deployment banner.
 */
export function useGetTestingContentHtml(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getTestingContentHtml', params],
    queryFn: async () => {
      const result = await api.GET('/api/testing/content/html' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Return deterministic HTML content that includes a deployment banner wrapper.
 */
export function useGetTestingContentHtmlWithBanner(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getTestingContentHtmlWithBanner', params],
    queryFn: async () => {
      const result = await api.GET('/api/testing/content/html-with-banner' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Return a deterministic PNG image for Playwright fixtures.
 */
export function useGetTestingContentImage(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getTestingContentImage', params],
    queryFn: async () => {
      const result = await api.GET('/api/testing/content/image' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Return the bundled deterministic PDF asset.
 */
export function useGetTestingContentPdf(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getTestingContentPdf', params],
    queryFn: async () => {
      const result = await api.GET('/api/testing/content/pdf' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Trigger a version event for integration testing.
 */
export function usePostTestingDeploymentsVersion(options?: Omit<Parameters<typeof useMutation>[0], 'mutationFn'>): ReturnType<typeof useMutation<DeploymentTriggerResponseSchema_6b6ce9f, Error, { body: DeploymentTriggerRequestSchema_6b6ce9f }>> {
  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: async (variables: { body: DeploymentTriggerRequestSchema_6b6ce9f }) => {
      const result = await api.POST('/api/testing/deployments/version' as const, { body: variables.body }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries();
    },
    ...options
  });
}

/**
 * SSE endpoint for streaming backend application logs in real-time.
 */
export function useGetTestingLogsStream(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getTestingLogsStream', params],
    queryFn: async () => {
      const result = await api.GET('/api/testing/logs/stream' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Send a fake task event to a specific SSE connection for testing.
 */
export function usePostTestingSseTaskEvent(options?: Omit<Parameters<typeof useMutation>[0], 'mutationFn'>): ReturnType<typeof useMutation<TaskEventResponseSchema_6b6ce9f, Error, { body: TaskEventRequestSchema_6b6ce9f }>> {
  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: async (variables: { body: TaskEventRequestSchema_6b6ce9f }) => {
      const result = await api.POST('/api/testing/sse/task-event' as const, { body: variables.body }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries();
    },
    ...options
  });
}

/**
 * Start a demo or failing task for integration testing.
 */
export function usePostTestingTasksStart(options?: Omit<Parameters<typeof useMutation>[0], 'mutationFn'>): ReturnType<typeof useMutation<TaskStartResponseSchema_6b6ce9f, Error, { body: TaskStartRequestSchema_6b6ce9f }>> {
  const queryClient = useQueryClient();

  // @ts-ignore
  return useMutation({
    mutationFn: async (variables: { body: TaskStartRequestSchema_6b6ce9f }) => {
      const result = await api.POST('/api/testing/tasks/start' as const, { body: variables.body }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries after successful mutation
      queryClient.invalidateQueries();
    },
    ...options
  });
}

/**
 * Drain endpoint for manual graceful shutdown initiation.
 */
export function useGetHealthDrain(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<HealthResponse_d817ae2>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getHealthDrain', params],
    queryFn: async () => {
      const result = await api.GET('/health/drain' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Liveness probe endpoint for Kubernetes.
 */
export function useGetHealthHealthz(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<HealthResponse_d817ae2>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getHealthHealthz', params],
    queryFn: async () => {
      const result = await api.GET('/health/healthz' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Readiness probe endpoint for Kubernetes.
 */
export function useGetHealthReadyz(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<HealthResponse_d817ae2>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getHealthReadyz', params],
    queryFn: async () => {
      const result = await api.GET('/health/readyz' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}

/**
 * Return metrics in Prometheus text format.
 */
export function useGetMetrics(params?: any, options?: Omit<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>): ReturnType<typeof useQuery<void>> {
  // @ts-ignore
  return useQuery({
    queryKey: ['getMetrics', params],
    queryFn: async () => {
      const result = await api.GET('/metrics' as const, { params }) as { data?: unknown; error?: unknown; response: Response };
      if (result.error) throw toApiError(result.error, result.response.status);
      return result.data;
    },
    ...options
  });
}
