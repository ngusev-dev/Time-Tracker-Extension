import { NavLink } from 'react-router';
import { cn } from '../lib/utils/util';
import { ROUTES } from '../lib/router.config';
import { observer } from 'mobx-react-lite';
import { AppStore } from '../store/App.store';

const LINKS_BAR = [
  {
    title: 'Главная',
    href: ROUTES.MAIN,
  },
  {
    title: 'Статистика',
    href: ROUTES.goTo(ROUTES.STATISTIC),
  },
];

export const AsideMenu = observer(() => {
  const { isOpenAsideMenu, toggleAsideMenu } = AppStore;

  return (
    <aside
      className={cn('border-r border-gray-300 w-0 shrink-0 transition-all duration-400 overflow-hidden', {
        'open-burger': isOpenAsideMenu,
      })}
    >
      <ul className="text-sm flex flex-col">
        {LINKS_BAR.map((link) => (
          <li key={link.title}>
            <NavLink
              onClick={() => toggleAsideMenu(false)}
              to={link.href}
              className="block px-2 py-2 hover:bg-gray-200 rounded"
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
});
