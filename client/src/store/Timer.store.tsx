import { makeAutoObservable, runInAction } from 'mobx';
import {
  GET_TIMER_QUERY,
  PAUSE_TIMER_MUTATION,
  START_TIMER_MUTATION,
  STOP_TIMER_MUTATION,
  type GET_TIMER_QUERY_RESPONSE,
  type PAUSE_TIMER_QUERY_RESPONSE,
  type START_TIMER_QUERY_RESPONSE,
  type STOP_TIMER_QUERY_RESPONSE,
} from '../lib/queries/user-timer.queries';
import { apolloClient } from '../lib/apollo/apollo.client';

class timerStore {
  isLoading = false;
  isPaused = false;
  isStarted = false;
  intervalId?: NodeJS.Timeout;
  seconds = 0;

  constructor() {
    makeAutoObservable(this);
  }

  loadTimerInit = async () => {
    runInAction(() => {
      this.isLoading = true;
    });

    const initTimerData = await apolloClient.query<GET_TIMER_QUERY_RESPONSE>({
      query: GET_TIMER_QUERY,
      variables: { userId: 1 },
    });

    runInAction(() => {
      this.isLoading = false;

      this.seconds = initTimerData.data?.getTimer.totalTimeInSeconds || 0;
      this.isStarted = initTimerData.data?.getTimer.status === 'WORKING';
      this.isPaused = initTimerData.data?.getTimer.status === 'PAUSE';

      if (this.isStarted) this._createTimerInterval();
    });
  };

  startTimer = async () => {
    const updatedTimer = await apolloClient.mutate<START_TIMER_QUERY_RESPONSE>({
      mutation: START_TIMER_MUTATION,
      variables: { userId: 1 },
    });

    runInAction(() => {
      this.isStarted = true;
      this.isPaused = false;
      this.seconds = updatedTimer.data?.startTimer.totalTimeInSeconds || 0;

      this._createTimerInterval();
    });
  };

  pauseTimer = async () => {
    const updatedTimer = await apolloClient.mutate<PAUSE_TIMER_QUERY_RESPONSE>({
      mutation: PAUSE_TIMER_MUTATION,
      variables: { userId: 1 },
    });

    runInAction(() => {
      clearInterval(this.intervalId);

      this.isStarted = updatedTimer.data?.pauseTimer.status === 'WORKING';
      this.isPaused = updatedTimer.data?.pauseTimer.status === 'PAUSE';
      this.seconds = updatedTimer.data?.pauseTimer.totalTimeInSeconds || 0;
    });
  };

  endTimer = async () => {
    const updatedTimer = await apolloClient.mutate<STOP_TIMER_QUERY_RESPONSE>({
      mutation: STOP_TIMER_MUTATION,
      variables: { userId: 1 },
    });

    runInAction(() => {
      clearInterval(this.intervalId);

      this.isStarted = updatedTimer.data?.stopTimer.status === 'WORKING';
      this.seconds = updatedTimer.data?.stopTimer.totalTimeInSeconds || 0;
    });
  };

  private _createTimerInterval() {
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      runInAction(() => {
        this.seconds += 1;
      });
    }, 1000);
  }
}

export const TimerStore = new timerStore();
