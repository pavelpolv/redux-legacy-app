import { createBrowserRouter, Navigate } from 'react-router-dom';
import { reportRoutes } from '@modules/report';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/report" replace /> },
  ...reportRoutes,
  { path: '*', element: <Navigate to="/report" replace /> },
]);
