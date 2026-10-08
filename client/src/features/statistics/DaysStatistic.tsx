import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/shared/ui/chart';

import { WEEK_DAYS } from './constants';
import { format, isSameMonth } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from 'recharts';
import { computeIntervalDuration } from '@/shared/lib/time';
import { useGetWeekStatisticQuery } from '@/shared/api/generated/output';
import { PeriodSwitcher } from '@/shared/ui/PeriodSwitcher';
import { Skeleton } from '@/shared/ui/Skeleton';

const chartConfig = {
  hours: { label: 'Часы', color: 'var(--brand)' },
} satisfies ChartConfig;

const formatWeekRange = (start: Date, end: Date) => {
  if (isSameMonth(start, end)) {
    return `${format(start, 'd')}–${format(end, 'd MMM', { locale: ru })}`;
  }
  return `${format(start, 'd MMM', { locale: ru })} – ${format(end, 'd MMM', { locale: ru })}`;
};

const formatShortDuration = (totalSeconds: number) => {
  if (!totalSeconds) return '';
  if (totalSeconds < 60) return '<1м';

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (!hours) return `${minutes}м`;
  return minutes ? `${hours}ч ${minutes}м` : `${hours}ч`;
};

export function DaysStatistic() {
  const [weekOffset, setWeekOffset] = useState(0);

  const { data, loading } = useGetWeekStatisticQuery({
    variables: { weekOffset },
  });

  const statistic = data?.getWeekStatistic;
  const today = format(new Date(), 'EEEE');

  const chartData = Object.entries(WEEK_DAYS).map(([key, label]) => {
    const seconds = statistic?.history.find((x) => x.day === key)?.general.totalTimeInSeconds ?? 0;

    return {
      day: key,
      label,
      seconds,
      hours: seconds / 3600,
      shortDuration: formatShortDuration(seconds),
      isCurrentDay: weekOffset === 0 && key === today,
    };
  });

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
        {loading && !data ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-40 w-full">
            <BarChart data={chartData} margin={{ top: 16, left: 0, right: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideIndicator
                    labelFormatter={(_, payload) => payload[0]?.payload.label}
                    formatter={(_, __, item) => computeIntervalDuration(item.payload.seconds) || '—'}
                  />
                }
              />
              <Bar dataKey="hours" radius={4}>
                {chartData.map((d) => (
                  <Cell
                    key={d.day}
                    fill="var(--color-hours)"
                    fillOpacity={d.isCurrentDay || weekOffset !== 0 ? 1 : 0.6}
                  />
                ))}
                <LabelList
                  dataKey="shortDuration"
                  position="top"
                  offset={4}
                  className="fill-foreground"
                  fontSize={10}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
