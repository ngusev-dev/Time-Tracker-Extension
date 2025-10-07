import { NavLink } from 'react-router';
import { ROUTES } from '../lib/router.config';

function MainPage() {
  return (
    <div>
      <NavLink to={ROUTES.goTo(ROUTES.STATISTIC)}>Статистика </NavLink>
    </div>
  );
}

export default MainPage;
