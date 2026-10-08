import { format, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { THistoryGroup } from './types';
import { pluralize } from '@/shared/lib/plural';

const formatGroupDate = (date: Date) => {
  if (isToday(date)) return 'Сегодня';
  if (isYesterday(date)) return 'Вчера';
  return format(date, 'd MMM, EEEEEE', { locale: ru });
};

export function DayGroupHeader({ group }: { group: THistoryGroup }) {
  const count = group.records.length;

  return (
    <div className="sticky -top-3 z-10 flex items-center gap-3 bg-background/90 py-2.5 backdrop-blur">
      <div className="text-sm font-semibold">{formatGroupDate(new Date(+group.groupField))}</div>
      <span className="h-px flex-1 bg-border" />
      <div className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
        {count} {pluralize(count, ['сессия', 'сессии', 'сессий'])}
      </div>
    </div>
  );
}
