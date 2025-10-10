import { NavLink } from 'react-router';
import { cn } from '../lib/utils/util';
import { ROUTES } from '../lib/router.config';
import { observer } from 'mobx-react-lite';
import { AppStore } from '../store/App.store';

export const AsideMenu = observer(() => {
  const { isOpenAsideMenu, toggleAsideMenu } = AppStore;

  return (
    <aside
      className={cn('border-r border-gray-300 w-0 shrink-0 transition-all duration-400 overflow-hidden', {
        'open-burger': isOpenAsideMenu,
      })}
    >
      <ul className="text-sm flex flex-col">
        <li className="px-2 py-2 hover:bg-gray-100 rounded">
          <NavLink onClick={() => toggleAsideMenu(false)} to={ROUTES.MAIN}>
            Главная
          </NavLink>
        </li>
        <li className="px-2 py-2 hover:bg-gray-100 rounded">
          <NavLink onClick={() => toggleAsideMenu(false)} to={ROUTES.goTo(ROUTES.STATISTIC)}>
            Статистика
          </NavLink>
        </li>
      </ul>
    </aside>
  );
});
