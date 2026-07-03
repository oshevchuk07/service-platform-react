import { createBrowserRouter } from 'react-router';
import { LandingLayout } from '../layouts/landing-layout/AuthLayout';
import { LandingPage } from '../pages/landing/LandingPage';
import { AuthLayout } from '../layouts/auth-layout/AuthLayout';
import { AdminLayout } from '../layouts/admin-layout/AdminLayout';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { LoginPage } from '../pages/login/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingLayout,
    children: [{ index: true, Component: LandingPage }],
  },
  {
    path: '/login',
    Component: AuthLayout,
    children: [{ index: true, Component: LoginPage }],
  },
  {
    path: '/app',
    Component: AdminLayout,
    children: [{ index: true, Component: DashboardPage }],
  },
]);
