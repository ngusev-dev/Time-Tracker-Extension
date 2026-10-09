import { useState } from 'react';
import { format, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import { ChevronDown, Clock, Play } from 'lucide-react';
import { TimerStore } from '@/features/timer';
import { Button } from '@/shared/ui/Button';
import { computeIntervalDuration } from '@/shared/lib/time';
import { cn } from '@/shared/lib/utils';
import { HistoryItem } from './HistoryItem';
import type { TTaskGroup } from './lib/groupByTask';

type TaskGroupItemProps = {
  group: TTaskGroup;
  /** Показывать дату последней сессии, если она была не сегодня */
  showDate?: boolean;
  /** Вызывается после успешного продолжения задачи */
  onContinue?: () => void;
};

export const TaskGroupItem = observer(({ group, showDate, onContinue }: TaskGroupItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { timerId, records, totalSeconds, latest } = group;
  const first = records[records.length - 1];
  const count = records.length;
  const isActive = TimerStore.isStarted && TimerStore.timerId === timerId;

  const startFormat = showDate && !isToday(latest.startTimer) ? 'd MMM, HH:mm' : 'HH:mm';

  const handleContinue = async () => {
    await TimerStore.continueTimer(timerId);
    if (TimerStore.isStarted && TimerStore.timerId === timerId) onContinue?.();
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg border border-l-2 border-l-brand bg-card px-3 py-2.5 shadow-xs transition hover:border-brand/30 hover:border-l-brand hover:shadow-sm',
          { 'border-brand/30 bg-brand-soft/40': isActive },
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className={cn('truncate text-sm', { 'text-muted-foreground': !latest.description })}>
            {latest.description || 'Без описания'}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums">
            <Clock className="size-3.5" />
            {format(first.startTimer, startFormat, { locale: ru })} – {format(latest.endTimer, 'HH:mm')}
          </div>
        </div>

        {count > 1 && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex cursor-pointer items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-xs font-semibold tabular-nums transition hover:border-brand/40 hover:text-brand"
            aria-expanded={isExpanded}
            title={isExpanded ? 'Свернуть сессии' : 'Показать сессии'}
          >
            {count}
            <ChevronDown className={cn('size-3.5 transition-transform', { 'rotate-180': isExpanded })} />
          </button>
        )}

        <div className="rounded-md bg-muted px-2 py-0.5 text-sm font-semibold tabular-nums">
          {computeIntervalDuration(totalSeconds)}
        </div>

        <Button
          size="icon-sm"
          variant="ghost"
          className="text-brand hover:bg-brand-soft hover:text-brand"
          disabled={TimerStore.isPending || isActive}
          onClick={handleContinue}
          title="Продолжить"
        >
          <Play className="fill-current" />
        </Button>
      </div>

      {isExpanded && (
        <div className="ml-4 flex flex-col gap-2 border-l pl-3 pb-1">
          {records.map((record) => (
            <HistoryItem record={record} key={record.id} />
          ))}
        </div>
      )}
    </div>
  );
});
