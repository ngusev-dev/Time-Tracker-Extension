import { createBrowserRouter } from 'react-router';
import { AuthorizedLayout } from '@/layouts/AuthorizedLayout';
import { BaseLayout } from '@/layouts/BaseLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AUTH_ROUTES, PUBLIC_ROUTES } from '@/shared/config/routes';

export const router = createBrowserRouter([
  {
    path: AUTH_ROUTES.MAIN,
    Component: BaseLayout,
    children: [
      {
        Component: AuthorizedLayout,
        children: [
          {
            index: true,
            lazy: () => import('@/pages/MainPage').then((m) => ({ Component: m.MainPage })),
          },
          {
            path: AUTH_ROUTES.STATISTIC,
            lazy: () => import('@/pages/StatisticPage').then((m) => ({ Component: m.StatisticPage })),
          },
          {
            path: AUTH_ROUTES.HISTORY,
            lazy: () => import('@/pages/HistoryPage').then((m) => ({ Component: m.HistoryPage })),
          },
        ],
      },
      {
        Component: PublicLayout,
        children: [
          {
            path: PUBLIC_ROUTES.AUTH,
            lazy: () => import('@/pages/LoginPage').then((m) => ({ Component: m.LoginPage })),
          },
          {
            path: PUBLIC_ROUTES.REGISTER,
            lazy: () => import('@/pages/RegistrationPage').then((m) => ({ Component: m.RegistrationPage })),
          },
          {
            path: PUBLIC_ROUTES.RESET_PASSWORD,
            lazy: () => import('@/pages/ResetPasswordPage').then((m) => ({ Component: m.ResetPasswordPage })),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    Component: () => <p>404</p>,
  },
]);
