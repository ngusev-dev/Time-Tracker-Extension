import { observer } from 'mobx-react-lite';
import { Menu, X } from 'lucide-react';
import { AppStore } from '@/shared/model/App.store';
import { Button } from '@/shared/ui/Button';

export const Header = observer(() => {
  const { toggleAsideMenu, isOpenAsideMenu, user } = AppStore;

  const initials = user?.login?.slice(0, 2).toUpperCase();

  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="flex h-14 items-center gap-2 px-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => toggleAsideMenu(!isOpenAsideMenu)}
          aria-label={isOpenAsideMenu ? 'Закрыть меню' : 'Открыть меню'}
        >
          {isOpenAsideMenu ? <X /> : <Menu />}
        </Button>

        <div className="ml-auto flex items-center gap-2.5">
          <div className="text-right text-xs leading-tight">
            <div className="font-medium">{user?.login}</div>
            <div className="text-muted-foreground">{user?.email}</div>
          </div>
          <div className="flex size-8 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
});
