import { createBrowserRouter } from 'react-router';
import MainPage from './pages/MainPage';
import { StatisticPage } from './pages/StatisticPage';
import { AUTH_ROUTES, PUBLIC_ROUTES } from './lib/router.config';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import AuthLayout from './pages/layouts/AuthLayout';
import AuthPage from './pages/AuthPage/AuthPage';
import PublicLayout from './pages/layouts/PublicLayout';

export const router = createBrowserRouter([
  {
    path: AUTH_ROUTES.MAIN,
    Component: AuthLayout,
    children: [
      { index: true, Component: MainPage },
      { path: AUTH_ROUTES.STATISTIC, Component: StatisticPage },
      { path: AUTH_ROUTES.HISTORY, Component: HistoryPage },
    ],
  },
  {
    path: PUBLIC_ROUTES.PUBLIC_PREFIX,
    Component: PublicLayout,
    children: [{ path: PUBLIC_ROUTES.AUTH, Component: AuthPage }],
  },
  {
    path: '*',
    Component: () => <p>404</p>,
  },
]);
