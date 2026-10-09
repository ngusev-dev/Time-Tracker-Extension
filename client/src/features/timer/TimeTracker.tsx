import { Button } from '@/shared/ui/Button';
import { formatTime } from '@/shared/lib/time';
import { Pause, Play, Square } from 'lucide-react';
import { TimerStore } from './Timer.store';
import { observer } from 'mobx-react-lite';
import { cn } from '@/shared/lib/utils';
import { TimerSkeleton } from './TimerSkeleton';

export const TimeTracker = observer(() => {
  const {
    seconds,
    endTimer,
    pauseTimer,
    isStarted,
    isPaused,
    isLoading,
    isPending,
    startTimer,
    updateDescription,
    description,
  } = TimerStore;

  if (isLoading) return <TimerSkeleton />;

  const status = isStarted
    ? { label: 'Идёт запись', className: 'bg-brand-soft text-brand', dot: 'bg-brand animate-pulse' }
    : isPaused
      ? { label: 'Пауза', className: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' }
      : { label: 'Не запущен', className: 'bg-muted text-muted-foreground', dot: 'bg-muted-foreground/50' };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
            status.className,
          )}
        >
          <span className={cn('size-1.5 rounded-full', status.dot)} />
          {status.label}
        </div>
        <div
          className={cn('font-mono text-6xl font-light tracking-tight tabular-nums transition-colors', {
            'text-muted-foreground': !isStarted,
          })}
        >
          {formatTime(seconds)}
        </div>
      </div>

      <textarea
        value={description ?? ''}
        onChange={(e) => updateDescription(e.target.value)}
        className="resize-none rounded-lg border bg-card p-3 text-sm shadow-xs outline-none transition placeholder:text-muted-foreground focus-visible:border-brand/50 focus-visible:ring-[3px] focus-visible:ring-brand/15"
        placeholder="Над чем работаете?"
        rows={1}
      />

      <div className="flex w-full gap-2">
        {(!isStarted || isPaused) && (
          <Button
            size="lg"
            disabled={isPending}
            onClick={startTimer}
            className="flex-1 bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <Play className="fill-current" /> {isPaused ? 'Продолжить' : 'Начать'}
          </Button>
        )}

        {isStarted && (
          <>
            <Button size="lg" variant="outline" className="flex-1" disabled={isPending} onClick={pauseTimer}>
              <Pause className="fill-current" />
              Пауза
            </Button>
            <Button size="lg" variant="destructive" className="flex-1" disabled={isPending} onClick={endTimer}>
              <Square className="fill-current" />
              Стоп
            </Button>
          </>
        )}
      </div>
    </div>
  );
});
