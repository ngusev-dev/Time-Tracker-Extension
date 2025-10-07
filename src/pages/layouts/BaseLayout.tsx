import { Header } from '../../components/Header';
import { Outlet } from 'react-router';

function BaseLayout() {
  return (
    <div className="h-[450px] w-[550px]">
      <Header />
      <main className="p-3 ">
        <Outlet />
      </main>
    </div>
  );
}

export default BaseLayout;
