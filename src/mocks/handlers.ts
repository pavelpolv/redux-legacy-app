import type { MockHandler } from '@core/api/types';
import { reportMockHandlers } from '@modules/report/api/mocks';

export const mockHandlers: MockHandler[] = [...reportMockHandlers];
