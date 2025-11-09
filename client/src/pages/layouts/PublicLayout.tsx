import { Outlet } from 'react-router';

export default function PublicLayout() {
  return (
    <div className="h-[450px] w-[550px]">
      <main className="p-3 w-full h-full flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
