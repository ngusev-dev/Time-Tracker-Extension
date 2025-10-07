import { Header } from './components/Header';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
import { BarChart3 } from 'lucide-react';
import { Progress } from './components/ui/progress';

const weeklyData = [
  { day: 'Пн', hours: 42, percentage: 95 },
  { day: 'Вт', hours: 38, percentage: 86 },
  { day: 'Ср', hours: 45, percentage: 100 },
  { day: 'Чт', hours: 41, percentage: 91 },
  { day: 'Пт', hours: 39, percentage: 87 },
  { day: 'Сб', hours: 12, percentage: 27 },
  { day: 'Вс', hours: 8, percentage: 18 },
];

function App() {
  return (
    <div className="h-[450px] w-[550px]">
      <Header />
      <main className="p-3 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">📊 Обзор</h2>
          <div className="text-xs text-gray-600">Пятница, 25 июля 2025</div>
        </div>

        <div className="flex flex-col gap-2">
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

          <Card>
            <CardHeader>
              <CardTitle>⚡ Быстрая статистика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Активных проектов</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Задач в работе</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Средняя эффективность</span>
                  <span className="font-medium">90.6%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;
