import { ArrowBigLeft, ArrowBigRight, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Progress } from '../../ui/Progress';

import { WEEK_DAYS } from '../../../lib/constants/period.constants';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import ControlButton from './ControlButton';
import { computeIntervalDuration } from '../../../lib/helper/time.helper';
import { useGetWeekStatisticQuery } from '@/graphql/generated/output';

export function DaysStatistic() {
  const [weekOffset, setWeekOffset] = useState(0);

  const { data } = useGetWeekStatisticQuery({
    variables: { weekOffset },
  });

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
                  <div className="text-right  text-sm text-muted-foreground">
                    {row ? computeIntervalDuration(row.general.totalTimeInSeconds) : '-'}
                  </div>
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
