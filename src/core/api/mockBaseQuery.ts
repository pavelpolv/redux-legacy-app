import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query';
import type { ApiError, MockHandler } from './types';

const DELAY_MS = { min: 400, max: 1200 };

const delay = () =>
  new Promise((resolve) =>
    setTimeout(resolve, DELAY_MS.min + Math.random() * (DELAY_MS.max - DELAY_MS.min)),
  );

const matchPath = (pattern: string, url: string): Record<string, string> | null => {
  const patternParts = pattern.split('/').filter(Boolean);
  const urlParts = url.split('?')[0].split('/').filter(Boolean);
  if (patternParts.length !== urlParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const part = patternParts[i];
    if (part.startsWith(':')) params[part.slice(1)] = decodeURIComponent(urlParts[i]);
    else if (part !== urlParts[i]) return null;
  }
  return params;
};

export const createMockBaseQuery =
  (handlers: MockHandler[]): BaseQueryFn<string | FetchArgs, unknown, ApiError> =>
  async (args) => {
    const { url, method = 'GET', body } = typeof args === 'string' ? { url: args } : args;

    await delay();

    for (const mock of handlers) {
      if (mock.method !== method.toUpperCase()) continue;
      const params = matchPath(mock.path, url);
      if (!params) continue;

      const result = await mock.handler({ params, body: body as never });
      console.info(`[mock] ${method} ${url}`, { body, result });
      return result as { data: unknown } | { error: ApiError };
    }

    return { error: { status: 404, data: { message: `Mock для ${method} ${url} не найден` } } };
  };
