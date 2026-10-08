import HistoryItem from '../../components/HistoryItem/HistoryItem';
import TopHistory from './TopHistory';
import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { CalendarX2, History } from 'lucide-react';
import { useGetTimerHistoryGroupByDateQuery } from '@/graphql/generated/output';
import { PageHeader } from '@/components/ui/PageHeader';
import { PeriodSwitcher } from '@/components/ui/PeriodSwitcher';
import Skeleton from '@/components/ui/Skeleton';

export default function HistoryPage() {
  const [monthOffset, setMonthOffset] = useState(0);

  const startPeriod = () => startOfMonth(subMonths(new Date(), monthOffset));
  const endPeriod = () => endOfMonth(subMonths(new Date(), monthOffset));

  const { data, loading } = useGetTimerHistoryGroupByDateQuery({
    variables: {
      startPeriod: startPeriod(),
      endPeriod: endPeriod(),
    },
  });

  const monthLabel = format(startPeriod(), 'LLLL yyyy', { locale: ru });
  const groups = data?.getTimerHistoryGroupByDate ?? [];

  return (
    <div className="flex flex-col gap-3">
      <PageHeader
        icon={History}
        title="История"
        action={
          <PeriodSwitcher
            label={<span className="capitalize">{monthLabel}</span>}
            onPrev={() => setMonthOffset((prev) => prev + 1)}
            onNext={() => setMonthOffset((prev) => prev - 1)}
            canNext={monthOffset > 0}
          />
        }
      />

      {loading && !data ? (
        <div className="flex flex-col gap-2 pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      ) : groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <CalendarX2 className="size-5" />
          </div>
          <div className="text-sm text-muted-foreground">За этот месяц записей нет</div>
        </div>
      ) : (
        <div className="flex flex-col">
          {groups.map((group) => (
            <section key={group.groupField} className="flex flex-col">
              <TopHistory group={group} />

              <div className="flex flex-col gap-2 pb-2">
                {group.records.map((record) => (
                  <HistoryItem record={record} key={record.id} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
