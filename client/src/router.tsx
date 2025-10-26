import { createBrowserRouter } from 'react-router';
import MainPage from './pages/MainPage';
import { StatisticPage } from './pages/StatisticPage';
import BaseLayout from './pages/layouts/BaseLayout';
import { ROUTES } from './lib/router.config';

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    Component: BaseLayout,
    children: [
      { index: true, Component: MainPage },
      { path: ROUTES.STATISTIC, Component: StatisticPage },
    ],
  },
  {
    path: '*',
    Component: () => <p>404</p>,
  },
]);
