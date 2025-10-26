import { EVENT, type EVENT_PAYLOAD } from './src/lib/event.constants';

chrome.runtime.onConnect.addListener(async function (port) {
  if (port.name === 'time-tracker') {
    const { closeTime } = await chrome.storage.local.get(['closeTime']);

    if (closeTime) {
      const { timer: timerStore } = await chrome.storage.local.get(['timer']);
      const secondsFromClose = (Date.now() - closeTime) / 1000;

      chrome.storage.local.set({ timer: timerStore + Math.floor(secondsFromClose) });

      chrome.runtime.sendMessage<EVENT_PAYLOAD>({ type: EVENT.LOAD_TIMER_VALUE, data: null });

      chrome.storage.local.remove(['closeTime']);
    }

    port.onDisconnect.addListener(async function () {
      const { isStarted }: { isStarted: boolean } = await chrome.storage.local.get(['isStarted']);

      if (isStarted) {
        chrome.storage.local.set({ closeTime: Date.now() });
      }
    });
  }
});
