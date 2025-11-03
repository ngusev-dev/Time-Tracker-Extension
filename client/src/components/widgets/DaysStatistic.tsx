import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { useQuery } from '@apollo/client/react';
import {
  GET_WEEK_STATISTIC_QUERY,
  type GET_WEEK_STATISTIC_QUERY_RESPONSE,
} from '../../lib/queries/user-timer-statistic';
import Skeleton from '../ui/Skeleton';
import { WEEK_DAYS } from '../../lib/constants/period.constants';
import type { TUserTimer } from '../../lib/queries/user-timer.queries';
import { format, intervalToDuration } from 'date-fns';
import { ru } from 'date-fns/locale';

export function DaysStatistic() {
  const { loading, data } = useQuery<GET_WEEK_STATISTIC_QUERY_RESPONSE>(GET_WEEK_STATISTIC_QUERY, {
    variables: { userId: 1, weekOffset: 0 },
  });

  if (loading) return <Skeleton className="w-full h-40" />;

  const totalTimerValue = (row: TUserTimer[]) => {
    const totalSeconds = row.reduce((acc, item) => (acc += item.totalTimeInSeconds), 0);
    const duration = intervalToDuration({ start: 0, end: totalSeconds * 1000 });

    const parts = [];
    if (duration.days) parts.push(`${duration.days} д`);
    if (duration.hours) parts.push(`${duration.hours} ч`);
    if (duration.minutes) parts.push(`${duration.minutes} м`);
    if (duration.seconds) parts.push(`${duration.seconds} с`);

    return parts.join(' ');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Рабочие часы по дням
          </div>
          <div className="text-xs text-gray-600">
            {data?.getWeekStatistic.startPeriod &&
              format(data?.getWeekStatistic.startPeriod, 'dd.MM.yyyy', {
                locale: ru,
              })}
            -
            {data?.getWeekStatistic.endPeriod &&
              format(data?.getWeekStatistic.endPeriod, 'dd.MM.yyyy', {
                locale: ru,
              })}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {data?.getWeekStatistic.history.map((row) => (
            <div key={row.day} className="flex items-center gap-1">
              <div className="w-8 text-sm">{WEEK_DAYS[row.day as keyof typeof WEEK_DAYS]}</div>
              <div className="flex-4">
                <div className="text-right  text-sm text-muted-foreground">{totalTimerValue(row.entries)}</div>
                <Progress progress={12} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
