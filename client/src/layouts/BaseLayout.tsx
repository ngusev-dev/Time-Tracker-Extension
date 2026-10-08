import { Skeleton } from '@/shared/ui/Skeleton';
import { Button } from '@/shared/ui/Button';
import { useProfileDataQuery } from '@/shared/api/generated/output';
import { isUnauthorizedError } from '@/shared/api/apollo.client';
import { isPublicPath } from '@/shared/config/routes';
import { AppStore } from '@/shared/model/App.store';
import { RefreshCw, WifiOff } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

export const BaseLayout = observer(() => {
  const { pathname } = useLocation();
  const { user, setUserData } = AppStore;

  const { data, loading, error, refetch } = useProfileDataQuery({ notifyOnNetworkStatusChange: true });

  useEffect(() => {
    if (data?.profileData) setUserData(data.profileData);
  }, [data, setUserData]);

  if (isPublicPath(pathname) || user) return <Outlet />;

  const isUnauthorized = error?.graphQLErrors.some(isUnauthorizedError);

  if (error && !loading && !isUnauthorized) {
    return (
      <div className="flex h-[450px] w-[550px] flex-col items-center justify-center gap-3 bg-background p-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <WifiOff className="size-5" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold">Не удалось подключиться к серверу</div>
          <div className="text-xs text-muted-foreground">Проверьте подключение к интернету и попробуйте снова</div>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch().catch(() => undefined)}>
          <RefreshCw />
          Повторить
        </Button>
      </div>
    );
  }

  return <Skeleton className="h-[450px] w-[550px] rounded-none" />;
});

