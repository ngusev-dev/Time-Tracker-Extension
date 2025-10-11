import { Header } from '../../components/Header';
import { Outlet } from 'react-router';
import { AsideMenu } from '../../components/AsideMenu';
import { useEffect } from 'react';

function BaseLayout() {
  useEffect(() => {
    chrome.runtime.connect({ name: 'time-tracker' });
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

export default BaseLayout;
