import { makeAutoObservable } from 'mobx';
import type { UserStoreModel } from '@/shared/model/UserStoreModel.type';

class appStore {
  user: UserStoreModel | null = null;
  isOpenAsideMenu = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUserData = (user: UserStoreModel) => {
    this.user = user;
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
