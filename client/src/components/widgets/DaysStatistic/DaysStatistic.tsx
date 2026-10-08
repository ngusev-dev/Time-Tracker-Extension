import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Progress } from '../../ui/Progress';

import { WEEK_DAYS } from '../../../lib/constants/period.constants';
import { format, isSameMonth } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { computeIntervalDuration } from '../../../lib/helper/time.helper';
import { useGetWeekStatisticQuery } from '@/graphql/generated/output';
import { PeriodSwitcher } from '../../ui/PeriodSwitcher';
import Skeleton from '../../ui/Skeleton';
import { cn } from '@/lib/utils';

const formatWeekRange = (start: Date, end: Date) => {
  if (isSameMonth(start, end)) {
    return `${format(start, 'd')}–${format(end, 'd MMM', { locale: ru })}`;
  }
  return `${format(start, 'd MMM', { locale: ru })} – ${format(end, 'd MMM', { locale: ru })}`;
};

export function DaysStatistic() {
  const [weekOffset, setWeekOffset] = useState(0);

  const { data, loading } = useGetWeekStatisticQuery({
    variables: { weekOffset },
  });

  const statistic = data?.getWeekStatistic;
  const today = format(new Date(), 'EEEE');

  return (
    <Card className="gap-4 py-4">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-muted-foreground">Рабочие часы по дням</span>
          <PeriodSwitcher
            label={statistic ? formatWeekRange(new Date(statistic.startPeriod), new Date(statistic.endPeriod)) : '…'}
            onPrev={() => setWeekOffset((prev) => prev + 1)}
            onNext={() => setWeekOffset((prev) => prev - 1)}
            canNext={weekOffset > 0}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex flex-col gap-2.5">
          {Object.entries(WEEK_DAYS).map(([key, value]) => {
            if (loading && !data) {
              return <Skeleton key={key} className="h-4" />;
            }

            const row = statistic?.history.find((x) => x.day === key);
            const isCurrentDay = weekOffset === 0 && key === today;

            return (
              <div key={key} className="grid grid-cols-[2rem_1fr_4.5rem] items-center gap-3">
                <div
                  className={cn('text-xs font-medium', {
                    'text-brand': isCurrentDay,
                    'text-muted-foreground': !row && !isCurrentDay,
                  })}
                >
                  {value}
                </div>
                <Progress className="h-2.5" progress={row ? +row.general.percent : 0} />
                <div className={cn('text-right text-xs tabular-nums', row ? 'font-medium' : 'text-muted-foreground')}>
                  {row ? computeIntervalDuration(row.general.totalTimeInSeconds) : '—'}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
