import { createBrowserRouter } from 'react-router';
import { LandingLayout } from '../layouts/landing-layout/AuthLayout';
import { LandingPage } from '../pages/landing/LandingPage';
import { AuthLayout } from '../layouts/auth-layout/AuthLayout';
import { AdminLayout } from '../layouts/admin-layout/AdminLayout';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { LoginPage } from '../pages/login/LoginPage';
import { loginLoader } from './routing/loginLoader';
import { authLoader } from './routing/authLoader';
import { RequireRole } from './routing/RequireRole';
import { UsersPage } from '../pages/users/UsersPage';
import { PlansPage } from '@/pages/plans/PlansPage';
import { PricingPage } from '@/pages/subscription/PricingPage';
import { MySubscriptionPage } from '@/pages/subscription/MySubscriptionPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingLayout,
    children: [{ index: true, Component: LandingPage }],
  },
  {
    path: '/login',
    Component: AuthLayout,
    loader: loginLoader,
    children: [{ index: true, Component: LoginPage }],
  },
  {
    path: '/app',
    Component: AdminLayout,
    loader: authLoader,
    children: [
      { index: true, Component: DashboardPage },
      {
        path: 'users',
        element: (
          <RequireRole roles={['ADMIN']}>
            <UsersPage />
          </RequireRole>
        ),
      },
      {
        path: 'plans',
        element: (
          <RequireRole roles={['ADMIN']}>
            <PlansPage />
          </RequireRole>
        ),
      },
      {
        path: 'pricing',
        Component: PricingPage,
      },
      {
        path: 'subscription',
        element: (
          <RequireRole roles={['USER']}>
            <MySubscriptionPage></MySubscriptionPage>
          </RequireRole>
        ),
      },
    ],
  },
]);
