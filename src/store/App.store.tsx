import { makeAutoObservable } from 'mobx';

class appStore {
  isOpenAsideMenu = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleAsideMenu = (flag: boolean) => {
    this.isOpenAsideMenu = flag;
  };
}

export const AppStore = new appStore();
