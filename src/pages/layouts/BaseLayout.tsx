import { Header } from '../../components/Header';
import { Outlet } from 'react-router';
import { useState } from 'react';
import { AsideMenu } from '../../components/AsideMenu';

function BaseLayout() {
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  return (
    <div className="h-[450px] w-[550px]">
      <Header toggleBurger={() => setIsOpenBurger(!isOpenBurger)} />
      <div className="flex  h-[calc(100%-64px)]">
        <AsideMenu isOpenBurger={isOpenBurger} toggleBurger={() => setIsOpenBurger(!isOpenBurger)} />
        <main className="p-3 w-full overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default BaseLayout;
