import { makeAutoObservable, runInAction } from 'mobx';

class timerStore {
  isPaused = false;
  isStarted = false;
  intervalId?: NodeJS.Timeout;
  seconds = 0;

  constructor() {
    makeAutoObservable(this);
    this.loadTimerInit();
  }

  async loadTimerInit() {
    chrome.storage.local.get(['timer', 'isPaused', 'isStarted'], (result) => {
      runInAction(() => {
        this.seconds = result.timer ?? 0;
        this.isStarted = result.isStarted ?? false;
        this.isPaused = result.isPaused ?? false;
        if (this.isStarted) this.startTimer();
      });
    });
  }

  loadTimerValue = () => {
    chrome.storage.local.get(['timer'], (result) => {
      runInAction(() => {
        if (result.timer) this.seconds = result.timer + 1; // коррекция таймера +1 секунда
        else this.seconds = 0;
      });
    });
  };

  startTimer = () => {
    this.isStarted = true;
    this.isPaused = false;

    chrome.storage.local.set({ isPaused: this.isPaused });
    chrome.storage.local.set({ isStarted: this.isStarted });

    this.intervalId = setInterval(() => {
      runInAction(() => {
        this.seconds += 1;
        chrome.storage.local.set({ timer: this.seconds });
      });
    }, 1000);
  };

  pauseTimer = () => {
    this.isPaused = true;
    this.isStarted = false;

    chrome.storage.local.set({ isPaused: this.isPaused });
    chrome.storage.local.set({ isStarted: this.isStarted });

    clearInterval(this.intervalId);
  };

  endTimer = () => {
    this.isStarted = false;
    chrome.storage.local.set({ isStarted: this.isStarted });

    clearInterval(this.intervalId);

    this.seconds = 0;
    chrome.storage.local.set({ timer: this.seconds });
  };

  saveToStore = () => {
    chrome.storage.local.set({ timer: this.seconds });
    chrome.storage.local.set({ isPaused: this.isPaused });
    chrome.storage.local.set({ isStarted: this.isStarted });
  };
}

export const TimerStore = new timerStore();
