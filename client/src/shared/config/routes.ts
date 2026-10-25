import type { UserRole } from '@/shared/api/generated/output';

class AuthPages {
  _PREFIX = '/index.html';

  MAIN = this._PREFIX;
  STATISTIC = 'statistic';
  HISTORY = 'history';
  CONFIGURATION = 'configuration';
  REPORT = 'report';
  ADD_SESSION = 'add-session';

  goTo(path: string) {
    return this._PREFIX + `/${path}`;
  }
}

class PublicPages {
  _PREFIX = '/index.html';

  PUBLIC_PREFIX = this._PREFIX;
  AUTH = 'login';
  REGISTER = 'register';
  RESET_PASSWORD = 'reset-password';

  goTo(path: string) {
    return this.PUBLIC_PREFIX + `/${path}`;
  }
}

export const AUTH_ROUTES = new AuthPages();
export const PUBLIC_ROUTES = new PublicPages();

export const PUBLIC_PATHS = [PUBLIC_ROUTES.AUTH, PUBLIC_ROUTES.REGISTER, PUBLIC_ROUTES.RESET_PASSWORD].map((path) =>
  PUBLIC_ROUTES.goTo(path),
);

export const isPublicPath = (pathname: string) => PUBLIC_PATHS.includes(pathname);

export const ROUTE_ROLES: Partial<Record<string, UserRole[]>> = {
  [AUTH_ROUTES.REPORT]: ['ADMIN'],
  [AUTH_ROUTES.CONFIGURATION]: ['ADMIN'],
};
