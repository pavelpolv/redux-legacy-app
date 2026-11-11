import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockHandlers } from '@mocks/handlers';
import { config } from '../config';
import { createMockBaseQuery } from './mockBaseQuery';

const realBaseQuery = fetchBaseQuery({
  baseUrl: config.apiBaseUrl,
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: config.useMocks ? createMockBaseQuery(mockHandlers) : realBaseQuery,
  endpoints: () => ({}),
});
