import { createElement } from 'react';
import type { RouteObject } from 'react-router-dom';
import { ReportPage } from './pages';

export const reportRoutes: RouteObject[] = [
  { path: '/report', element: createElement(ReportPage) },
];

export { ReportPage };
