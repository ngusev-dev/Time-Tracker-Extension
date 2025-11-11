import { makeAutoObservable } from 'mobx';
import type { UserStoreModel } from './types/UserStoreModel.type';

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
}

export const AppStore = new appStore();
