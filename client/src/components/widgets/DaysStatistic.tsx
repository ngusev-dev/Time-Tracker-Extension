import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Progress } from '../ui/Progress';

const weeklyData = [
  { day: 'Пн', hours: 42, percentage: 95 },
  { day: 'Вт', hours: 38, percentage: 86 },
  { day: 'Ср', hours: 45, percentage: 100 },
  { day: 'Чт', hours: 41, percentage: 91 },
  { day: 'Пт', hours: 39, percentage: 87 },
  { day: 'Сб', hours: 12, percentage: 27 },
  { day: 'Вс', hours: 8, percentage: 18 },
];

export function DaysStatistic() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Рабочие часы по дням
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {weeklyData.map((day) => (
            <div key={day.day} className="flex items-center gap-4">
              <div className="w-8 text-sm">{day.day}</div>
              <div className="flex-1">
                <Progress progress={day.percentage} />
              </div>
              <div className="w-12 text-sm text-muted-foreground text-right">{day.hours}ч</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
