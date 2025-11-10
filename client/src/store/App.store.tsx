import { apolloClient } from '@/lib/apollo/apollo.client';
import { gql } from '@apollo/client';
import { makeAutoObservable } from 'mobx';

class appStore {
  isOpenAsideMenu = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleAsideMenu = (flag: boolean) => {
    this.isOpenAsideMenu = flag;
  };

  validateSession = async () => {
    try {
      return await apolloClient.query<boolean>({
        query: gql`
          query getTimer {
            validateSession
          }
        `,
      });
    } catch {
      return false;
    }
  };
}

export const AppStore = new appStore();
