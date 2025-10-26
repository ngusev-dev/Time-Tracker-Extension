import { observer } from 'mobx-react-lite';
import { AppStore } from '../store/App.store';

export const Header = observer(() => {
  const { toggleAsideMenu, isOpenAsideMenu } = AppStore;

  return (
    <header className="border-b border-gray-300 backdrop-blur">
      <div className="flex h-16 items-center px-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleAsideMenu(!isOpenAsideMenu)}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-3 text-sm "
          >
            ☰
          </button>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
            <div className="text-sm">
              <div className="font-medium">TankistPro</div>
              <div className="text-muted-foreground">Project Manager</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
