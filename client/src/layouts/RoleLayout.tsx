import type { UserRole } from '@/shared/api/generated/output';
import { AUTH_ROUTES } from '@/shared/config/routes';
import { AppStore } from '@/shared/model/App.store';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router';

type RoleLayoutProps = {
  roles?: UserRole[];
};

export const RoleLayout = observer(({ roles }: RoleLayoutProps) => {
  const { hasRole } = AppStore;

  if (!hasRole(roles)) return <Navigate to={AUTH_ROUTES.MAIN} replace />;

  return <Outlet />;
});
