import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export function QuickStatistic() {
  return (
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
  );
}
