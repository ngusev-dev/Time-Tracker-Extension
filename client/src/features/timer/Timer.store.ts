import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved, runInAction } from 'mobx';
import toast from 'react-hot-toast';
import { ApolloError } from '@apollo/client';
import { apolloClient, isUnauthorizedError } from '@/shared/api/apollo.client';
import { onSessionReset } from '@/shared/lib/session';
import {
  GetTimerDocument,
  PauseTimerDocument,
  StartTimerDocument,
  StopTimerDocument,
  type GetTimerQuery,
  type PauseTimerMutation,
  type StartTimerMutation,
  type StopTimerMutation,
} from '@/shared/api/generated/output';

type TimerSnapshot = GetTimerQuery['getTimer'];

const TICK_INTERVAL_MS = 500;

class timerStore {
  isLoading = false;
  isPending = false;
  status: string | null = null;
  description: string | null = null;

  /** Время по данным сервера на момент последней синхронизации */
  private baseSeconds = 0;
  /** Локальный момент (Date.now()) последней синхронизации с сервером */
  private syncedAt = 0;
  /** Текущее время, обновляется тикером только пока на `seconds` кто-то подписан */
  private now = Date.now();
  private tickerId?: ReturnType<typeof setInterval>;

  constructor() {
    makeAutoObservable<this, 'tickerId' | '_startTicker' | '_stopTicker'>(this, {
      tickerId: false,
      _startTicker: false,
      _stopTicker: false,
    });

    onBecomeObserved(this, 'now', this._startTicker);
    onBecomeUnobserved(this, 'now', this._stopTicker);
  }

  get isStarted() {
    return this.status === 'WORKING';
  }

  get isPaused() {
    return this.status === 'PAUSE';
  }

  get seconds() {
    if (!this.isStarted) return this.baseSeconds;

    const elapsed = Math.max(0, Math.floor((this.now - this.syncedAt) / 1000));
    return this.baseSeconds + elapsed;
  }

  updateDescription = (description: string | null) => {
    this.description = description;
  };

  loadTimerInit = async () => {
    this.isLoading = true;

    try {
      const { data } = await apolloClient.query<GetTimerQuery>({
        query: GetTimerDocument,
        fetchPolicy: 'network-only',
      });

      runInAction(() => {
        this._applySnapshot(data.getTimer);
        this.description = data.getTimer.description ?? null;
      });
    } catch (error) {
      this._notifyError(error, 'Не удалось загрузить таймер');
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  startTimer = () =>
    this._runMutation(async () => {
      const { data } = await apolloClient.mutate<StartTimerMutation>({
        mutation: StartTimerDocument,
        variables: { description: this.description },
      });
      return data?.startTimer;
    }, 'Не удалось запустить таймер');

  pauseTimer = () =>
    this._runMutation(async () => {
      const { data } = await apolloClient.mutate<PauseTimerMutation>({
        mutation: PauseTimerDocument,
        variables: { description: this.description },
      });
      return data?.pauseTimer;
    }, 'Не удалось поставить таймер на паузу');

  endTimer = () =>
    this._runMutation(async () => {
      const { data } = await apolloClient.mutate<StopTimerMutation>({
        mutation: StopTimerDocument,
        variables: { description: this.description },
      });

      runInAction(() => {
        this.description = data?.stopTimer.description ?? null;
      });
      return data?.stopTimer;
    }, 'Не удалось остановить таймер');

  reset = () => {
    this._stopTicker();
    this.isLoading = false;
    this.isPending = false;
    this.status = null;
    this.description = null;
    this.baseSeconds = 0;
    this.syncedAt = 0;
  };

  private async _runMutation(request: () => Promise<TimerSnapshot | undefined>, errorMessage: string) {
    if (this.isPending) return;
    this.isPending = true;

    try {
      const snapshot = await request();
      runInAction(() => {
        if (snapshot) this._applySnapshot(snapshot);
      });
    } catch (error) {
      this._notifyError(error, errorMessage);
    } finally {
      runInAction(() => {
        this.isPending = false;
      });
    }
  }

  private _applySnapshot(snapshot: TimerSnapshot) {
    this.status = snapshot.status;
    this.baseSeconds = snapshot.totalTimeInSeconds || 0;
    this.syncedAt = Date.now();
    this.now = this.syncedAt;
  }

  private _notifyError(error: unknown, fallback: string) {
    if (error instanceof ApolloError && error.graphQLErrors.some(isUnauthorizedError)) return;

    toast.error(error instanceof Error && error.message ? error.message : fallback, { id: 'timer-error' });
  }

  private _startTicker = () => {
    this._stopTicker();
    this.tickerId = setInterval(() => {
      runInAction(() => {
        this.now = Date.now();
      });
    }, TICK_INTERVAL_MS);
  };

  private _stopTicker = () => {
    clearInterval(this.tickerId);
    this.tickerId = undefined;
  };
}

export const TimerStore = new timerStore();

onSessionReset(TimerStore.reset);
