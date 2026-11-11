import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type ApiError = FetchBaseQueryError;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface MockRequest<TBody = unknown> {
  params: Record<string, string>;
  body: TBody;
}

export type MockResponse = { data: unknown } | { error: { status: number; data?: unknown } };

export interface MockHandler {
  method: HttpMethod;
  path: string;
  handler: (request: MockRequest<never>) => MockResponse | Promise<MockResponse>;
}
