import { createBrowserRouter } from 'react-router';
import MainPage from './pages/MainPage';
import { StatisticPage } from './pages/StatisticPage';
import { AUTH_ROUTES, PUBLIC_ROUTES } from './lib/router.config';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import AuthorizedLayout from './pages/layouts/AuthorizedLayout';
import AuthPage from './pages/AuthPage/AuthPage';
import PublicLayout from './pages/layouts/PublicLayout';
import BaseLayout from './pages/layouts/BaseLayout';

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
        children: [{ path: PUBLIC_ROUTES.AUTH, Component: AuthPage }],
      },
    ],
  },
  {
    path: '*',
    Component: () => <p>404</p>,
  },
]);
