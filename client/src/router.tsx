import { createBrowserRouter } from 'react-router';
import MainPage from './pages/MainPage';
import { StatisticPage } from './pages/StatisticPage';
import { AUTH_ROUTES, PUBLIC_ROUTES } from './lib/router.config';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import AuthorizedLayout from './layouts/AuthorizedLayout';
import AuthPage from './pages/AuthPage/AuthPage';
import PublicLayout from './layouts/PublicLayout';
import BaseLayout from './layouts/BaseLayout';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';

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
          { path: PUBLIC_ROUTES.AUTH, Component: AuthPage },
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
