import { NavLink, useNavigate } from 'react-router';

import { AUTH_ROUTES, PUBLIC_ROUTES } from '@/shared/config/routes';
import { observer } from 'mobx-react-lite';
import { AppStore } from '@/shared/model/App.store';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';
import { BarChart3, History, LogOut, Timer } from 'lucide-react';
import { useLogoutUserMutation } from '@/shared/api/generated/output';
import { resetSession } from '@/shared/lib/session';
import toast from 'react-hot-toast';

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

  const [logoutUserMutation, { loading }] = useLogoutUserMutation();

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
        disabled={loading}
        onClick={async () => {
          try {
            await logoutUserMutation();
            await navigate(PUBLIC_ROUTES.goTo(PUBLIC_ROUTES.AUTH), { replace: true });
            await resetSession();
            toast.success('Вы вышли из аккаунта', { id: 'logout-success', duration: 2000 });
          } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Не удалось выйти', { id: 'logout-error' });
          }
        }}
      >
        <LogOut />
        Выйти
      </Button>
    </aside>
  );
});
