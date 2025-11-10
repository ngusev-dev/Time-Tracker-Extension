import { makeAutoObservable, runInAction } from 'mobx';
import { apolloClient } from '../lib/apollo/apollo.client';
import {
  GetTimerDocument,
  PauseTimerDocument,
  StartTimerDocument,
  StopTimerDocument,
  type GetTimerQuery,
  type PauseTimerMutation,
  type StartTimerMutation,
  type StopTimerMutation,
} from '@/graphql/generated/output';

class timerStore {
  isLoading = false;
  isPaused = false;
  isStarted = false;
  intervalId?: NodeJS.Timeout;
  description: string | null = null;
  seconds = 0;

  constructor() {
    makeAutoObservable(this);
  }

  updateDescription = (description: string | null) => {
    this.description = description;
  };

  loadTimerInit = async () => {
    runInAction(() => {
      this.isLoading = true;
    });

    const initTimerData = await apolloClient.query<GetTimerQuery>({
      query: GetTimerDocument,
    });

    runInAction(() => {
      this.isLoading = false;

      this.description = initTimerData.data?.getTimer.description ?? null;
      this.seconds = initTimerData.data?.getTimer.totalTimeInSeconds || 0;
      this.isStarted = initTimerData.data?.getTimer.status === 'WORKING';
      this.isPaused = initTimerData.data?.getTimer.status === 'PAUSE';

      if (this.isStarted) this._createTimerInterval();
    });
  };

  startTimer = async () => {
    const updatedTimer = await apolloClient.mutate<StartTimerMutation>({
      mutation: StartTimerDocument,
      variables: { description: this.description },
    });

    runInAction(() => {
      this.isStarted = true;
      this.isPaused = false;
      this.seconds = updatedTimer.data?.startTimer.totalTimeInSeconds || 0;

      this._createTimerInterval();
    });
  };

  pauseTimer = async () => {
    const updatedTimer = await apolloClient.mutate<PauseTimerMutation>({
      mutation: PauseTimerDocument,
      variables: { description: this.description },
    });

    runInAction(() => {
      clearInterval(this.intervalId);

      this.isStarted = updatedTimer.data?.pauseTimer.status === 'WORKING';
      this.isPaused = updatedTimer.data?.pauseTimer.status === 'PAUSE';
      this.seconds = updatedTimer.data?.pauseTimer.totalTimeInSeconds || 0;
    });
  };

  endTimer = async () => {
    const updatedTimer = await apolloClient.mutate<StopTimerMutation>({
      mutation: StopTimerDocument,
      variables: { description: this.description },
    });

    runInAction(() => {
      clearInterval(this.intervalId);

      this.isStarted = updatedTimer.data?.stopTimer.status === 'WORKING';
      this.seconds = updatedTimer.data?.stopTimer.totalTimeInSeconds || 0;
      this.description = updatedTimer.data?.stopTimer.description ?? null;
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
