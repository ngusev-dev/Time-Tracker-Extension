import { makeAutoObservable } from 'mobx';
import type { UserStoreModel } from '@/shared/model/UserStoreModel.type';
import type { UserRole } from '@/shared/api/generated/output';

class appStore {
  user: UserStoreModel | null = null;
  isOpenAsideMenu = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUserData = (user: UserStoreModel) => {
    this.user = user;
  };

  hasRole = (roles?: UserRole[]) => {
    if (!roles?.length) return true;
    return !!this.user && roles.includes(this.user.role);
  };

  toggleAsideMenu = (flag: boolean) => {
    this.isOpenAsideMenu = flag;
  };

  reset = () => {
    this.user = null;
    this.isOpenAsideMenu = false;
  };
}

export const AppStore = new appStore();
