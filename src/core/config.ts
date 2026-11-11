export const config = {
  apiBaseUrl: process.env.API_BASE_URL,
  useMocks: process.env.USE_MOCKS === 'true',
} as const;
