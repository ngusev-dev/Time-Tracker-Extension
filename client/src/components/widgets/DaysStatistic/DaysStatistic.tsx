import { ArrowBigLeft, ArrowBigRight, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Progress } from '../../ui/Progress';
import { useQuery } from '@apollo/client/react';
import {
  GET_WEEK_STATISTIC_QUERY,
  type GET_WEEK_STATISTIC_QUERY_RESPONSE,
  type THistoryItem,
} from '../../../lib/queries/user-timer-statistic';

import { WEEK_DAYS } from '../../../lib/constants/period.constants';
import { format, intervalToDuration } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import ControlButton from './ControlButton';

export function DaysStatistic() {
  const [weekOffset, setWeekOffset] = useState(0);

  const { data } = useQuery<GET_WEEK_STATISTIC_QUERY_RESPONSE>(GET_WEEK_STATISTIC_QUERY, {
    variables: { userId: 1, weekOffset },
  });

  const totalTimerValue = (row: THistoryItem) => {
    const duration = intervalToDuration({ start: 0, end: row.general.totalTimeInSeconds * 1000 });

    const parts = [];
    if (duration.days) parts.push(`${duration.days} д`);
    if (duration.hours) parts.push(`${duration.hours} ч`);
    if (duration.minutes) parts.push(`${duration.minutes} м`);
    if (duration.seconds) parts.push(`${duration.seconds} с`);

    return parts.join(' ');
  };

  const currentPeriodTime = () => (
    <>
      {data?.getWeekStatistic.startPeriod &&
        format(data?.getWeekStatistic.startPeriod, 'dd.MM.yyyy', {
          locale: ru,
        })}
      -
      {data?.getWeekStatistic.endPeriod &&
        format(data?.getWeekStatistic.endPeriod, 'dd.MM.yyyy', {
          locale: ru,
        })}
    </>
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Рабочие часы по дням
          </div>
          <div className="text-xs text-gray-600 flex gap-2">
            <ControlButton onClick={() => setWeekOffset((prev) => prev + 1)}>
              <ArrowBigLeft size={17} fill="black" />
            </ControlButton>
            <div className="w-30 flex justify-center">{currentPeriodTime()}</div>

            {weekOffset > 0 && (
              <ControlButton onClick={() => setWeekOffset((prev) => prev - 1)}>
                <ArrowBigRight size={17} fill="black" />
              </ControlButton>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {Object.entries(WEEK_DAYS).map(([key, value]) => {
            const row = data?.getWeekStatistic.history.find((x) => x.day === key);
            return (
              <div key={value} className="flex items-center gap-1 items-end">
                <div className="w-8 text-sm">{value}</div>
                <div className="flex-4">
                  <div className="text-right  text-sm text-muted-foreground">{row ? totalTimerValue(row) : '-'}</div>
                  <Progress progress={(row && +row.general.percent) ?? 0} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
