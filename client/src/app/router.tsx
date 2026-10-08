import { createBrowserRouter } from 'react-router';
import { HistoryPage } from '@/pages/HistoryPage';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { StatisticPage } from '@/pages/StatisticPage';
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
          { index: true, Component: MainPage },
          { path: AUTH_ROUTES.STATISTIC, Component: StatisticPage },
          { path: AUTH_ROUTES.HISTORY, Component: HistoryPage },
        ],
      },
      {
        Component: PublicLayout,
        children: [
          { path: PUBLIC_ROUTES.AUTH, Component: LoginPage },
          { path: PUBLIC_ROUTES.REGISTER, Component: RegistrationPage },
          { path: PUBLIC_ROUTES.RESET_PASSWORD, Component: ResetPasswordPage },
        ],
      },
    ],
  },
  {
    path: '*',
    Component: () => <p>404</p>,
  },
]);
