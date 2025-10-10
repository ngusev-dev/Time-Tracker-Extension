import { makeAutoObservable } from 'mobx';

class timerStore {
  isPaused = false;
  isStarted = false;
  intervalId = -1;
  seconds = 0;

  constructor() {
    makeAutoObservable(this);
  }

  startTimer = () => {
    this.isStarted = true;
    this.isPaused = false;
    this.intervalId = setInterval(() => {
      this.seconds += 1;
    }, 1000);
  };

  pauseTimer = () => {
    this.isPaused = true;
    this.isStarted = false;
    clearInterval(this.intervalId);
  };

  endTimer = () => {
    this.isStarted = false;
    clearInterval(this.intervalId);
    this.seconds = 0;
  };
}

export const TimerStore = new timerStore();
