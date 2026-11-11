import type { SerializedError } from '@reduxjs/toolkit';
import type { ApiError } from './types';

const DEFAULT_MESSAGE = 'Произошла ошибка. Попробуйте позже';

const isApiError = (error: unknown): error is ApiError =>
  typeof error === 'object' && error !== null && 'status' in error;

export const getErrorMessage = (
  error: ApiError | SerializedError | undefined,
  fallback = DEFAULT_MESSAGE,
): string => {
  if (!error) return fallback;

  if (isApiError(error)) {
    if ('error' in error) return error.error;
    const data = error.data as { message?: unknown } | undefined;
    if (data && typeof data.message === 'string') return data.message;
    return fallback;
  }

  return error.message ?? fallback;
};
