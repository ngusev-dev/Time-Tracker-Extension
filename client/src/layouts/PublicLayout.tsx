import { Outlet } from 'react-router';

export function PublicLayout() {
  return (
    <div className="popup-size">
      <main className="p-3 w-full h-full flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
