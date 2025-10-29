import { makeAutoObservable } from 'mobx';
import type { TUserTimer } from '../lib/queries/user-timer.queries';

class timerStore {
  isPaused = false;
  isStarted = false;
  intervalId?: NodeJS.Timeout;
  seconds = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadTimerInit = async (initData: TUserTimer) => {
    this.seconds = initData.getTimer.totalTimeInSeconds;
    this.isStarted = initData.getTimer.status === 'WORKING';
    this.isPaused = initData.getTimer.status === 'PAUSE';
  };

  startTimer = () => {
    // this.isStarted = true;
    // this.isPaused = false;
    // chrome.storage.local.set({ isPaused: this.isPaused });
    // chrome.storage.local.set({ isStarted: this.isStarted });
    // this.intervalId = setInterval(() => {
    //   runInAction(() => {
    //     this.seconds += 1;
    //     chrome.storage.local.set({ timer: this.seconds });
    //   });
    // }, 1000);
  };

  pauseTimer = () => {
    // this.isPaused = true;
    // this.isStarted = false;
    // chrome.storage.local.set({ isPaused: this.isPaused });
    // chrome.storage.local.set({ isStarted: this.isStarted });
    // clearInterval(this.intervalId);
  };

  endTimer = () => {
    // this.isStarted = false;
    // chrome.storage.local.set({ isStarted: this.isStarted });
    // clearInterval(this.intervalId);
    // this.seconds = 0;
    // chrome.storage.local.set({ timer: this.seconds });
  };

  saveToStore = () => {
    // chrome.storage.local.set({ timer: this.seconds });
    // chrome.storage.local.set({ isPaused: this.isPaused });
    // chrome.storage.local.set({ isStarted: this.isStarted });
  };
}

export const TimerStore = new timerStore();
