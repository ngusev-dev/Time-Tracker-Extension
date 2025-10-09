import { NavLink } from 'react-router';
import { cn } from '../lib/utils/util';
import { ROUTES } from '../lib/router.config';

export function AsideMenu({ isOpenBurger, toggleBurger }: { isOpenBurger: boolean; toggleBurger: () => void }) {
  return (
    <aside
      className={cn('border-r border-gray-300 w-0 shrink-0 transition-all duration-400 overflow-hidden', {
        'open-burger': isOpenBurger,
      })}
    >
      <ul className="text-sm flex flex-col">
        <li className="px-2 py-2 hover:bg-gray-100 rounded">
          <NavLink onClick={toggleBurger} to={ROUTES.MAIN}>
            Главная
          </NavLink>
        </li>
        <li className="px-2 py-2 hover:bg-gray-100 rounded">
          <NavLink onClick={toggleBurger} to={ROUTES.goTo(ROUTES.STATISTIC)}>
            Статистика
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
