import { NavLink, useNavigate } from 'react-router';

import { AUTH_ROUTES, PUBLIC_ROUTES } from '../lib/router.config';
import { observer } from 'mobx-react-lite';
import { AppStore } from '../store/App.store';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';
import { PowerIcon } from 'lucide-react';
import { useLogoutUserMutation } from '@/graphql/generated/output';

const LINKS_BAR = [
  {
    title: 'Главная',
    href: AUTH_ROUTES.MAIN,
  },
  {
    title: 'Статистика',
    href: AUTH_ROUTES.goTo(AUTH_ROUTES.STATISTIC),
  },
  {
    title: 'История',
    href: AUTH_ROUTES.goTo(AUTH_ROUTES.HISTORY),
  },
];

export const AsideMenu = observer(() => {
  const navigate = useNavigate();
  const { isOpenAsideMenu, toggleAsideMenu } = AppStore;

  const [logoutUserMutation] = useLogoutUserMutation();

  return (
    <aside
      className={cn('border-r border-gray-300 w-0 shrink-0 transition-all duration-400 overflow-hidden flex flex-col', {
        'open-burger': isOpenAsideMenu,
      })}
    >
      <ul className="text-sm flex flex-col flex-1">
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
      <Button
        className="w-full"
        variant="destructive"
        onClick={() => {
          logoutUserMutation({
            async onCompleted() {
              const { toast } = await import('react-hot-toast');
              toast.success(`Успешно!`, {
                id: 'login-success',
                duration: 2000,
              });
              navigate(PUBLIC_ROUTES.goTo(PUBLIC_ROUTES.AUTH));
            },
          });
        }}
      >
        <PowerIcon strokeWidth={3} />
        Выйти
      </Button>
    </aside>
  );
});
