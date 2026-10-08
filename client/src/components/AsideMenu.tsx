import { NavLink, useNavigate } from 'react-router';

import { AUTH_ROUTES, PUBLIC_ROUTES } from '../lib/router.config';
import { observer } from 'mobx-react-lite';
import { AppStore } from '../store/App.store';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';
import { BarChart3, History, LogOut, Timer } from 'lucide-react';
import { useLogoutUserMutation } from '@/graphql/generated/output';

const LINKS_BAR = [
  {
    title: 'Главная',
    href: AUTH_ROUTES.MAIN,
    icon: Timer,
  },
  {
    title: 'Статистика',
    href: AUTH_ROUTES.goTo(AUTH_ROUTES.STATISTIC),
    icon: BarChart3,
  },
  {
    title: 'История',
    href: AUTH_ROUTES.goTo(AUTH_ROUTES.HISTORY),
    icon: History,
  },
];

export const AsideMenu = observer(() => {
  const navigate = useNavigate();
  const { isOpenAsideMenu, toggleAsideMenu } = AppStore;

  const [logoutUserMutation] = useLogoutUserMutation();

  return (
    <aside
      className={cn(
        'flex w-0 shrink-0 flex-col overflow-hidden whitespace-nowrap border-r bg-sidebar transition-all duration-300',
        {
          'open-burger': isOpenAsideMenu,
        },
      )}
    >
      <nav className="flex flex-1 flex-col gap-1 text-sm">
        {LINKS_BAR.map((link) => (
          <NavLink
            key={link.title}
            end
            onClick={() => toggleAsideMenu(false)}
            to={link.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-2.5 py-2 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
                { 'bg-brand-soft text-brand hover:bg-brand-soft hover:text-brand': isActive },
              )
            }
          >
            <link.icon className="size-4 shrink-0" />
            {link.title}
          </NavLink>
        ))}
      </nav>
      <Button
        className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
        variant="ghost"
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
        <LogOut />
        Выйти
      </Button>
    </aside>
  );
});
