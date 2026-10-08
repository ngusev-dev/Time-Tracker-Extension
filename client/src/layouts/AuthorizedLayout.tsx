import { Header } from '../components/Header';
import { Outlet } from 'react-router';
import { AsideMenu } from '../components/AsideMenu';
import { TimerStore } from '../store/Timer.store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AppStore } from '../store/App.store';

const AuthorizedLayout = observer(() => {
  const { loadTimerInit } = TimerStore;
  const { isOpenAsideMenu, toggleAsideMenu } = AppStore;

  useEffect(() => {
    (async function () {
      await loadTimerInit();
    })();
  }, []);

  return (
    <div className="flex h-[450px] w-[550px] flex-col bg-background">
      <Header />
      <div className="flex min-h-0 flex-1">
        <AsideMenu />
        <main
          className="w-full overflow-y-auto p-3 transition-[filter,opacity] duration-300"
          onClickCapture={(e) => {
            if (!isOpenAsideMenu) return;
            e.stopPropagation();
            e.preventDefault();
            toggleAsideMenu(false);
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
});

export default AuthorizedLayout;
