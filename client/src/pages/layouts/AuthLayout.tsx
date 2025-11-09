import { Header } from '../../components/Header';
import { Outlet, useNavigate } from 'react-router';
import { AsideMenu } from '../../components/AsideMenu';
// import { TimerStore } from '../../store/Timer.store';
import { useEffect } from 'react';
import { PUBLIC_ROUTES } from '../../lib/router.config';

function AuthLayout() {
  const navigate = useNavigate();

  // const { loadTimerInit } = TimerStore;

  useEffect(() => {
    navigate(PUBLIC_ROUTES.goTo(PUBLIC_ROUTES.AUTH));
    // (async function () {
    //   await loadTimerInit();
    // })();
  }, []);

  return (
    <div className="h-[450px] w-[550px]">
      <Header />
      <div className="flex  h-[calc(100%-64px)]">
        <AsideMenu />
        <main className="p-3 w-full overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;
