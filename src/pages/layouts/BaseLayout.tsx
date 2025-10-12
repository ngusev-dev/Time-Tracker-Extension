import { Header } from '../../components/Header';
import { Outlet } from 'react-router';
import { AsideMenu } from '../../components/AsideMenu';
import { useEffect } from 'react';
import { TimerStore } from '../../store/Timer.store';
import { EVENT, type EVENT_PAYLOAD } from '../../lib/event.constants';

function BaseLayout() {
  const { loadTimerValue } = TimerStore;

  useEffect(() => {
    chrome.runtime.connect({ name: 'time-tracker' });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((event: EVENT_PAYLOAD) => {
      if (event.type === EVENT.LOAD_TIMER_VALUE) loadTimerValue();
    });
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
