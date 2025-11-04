import { DaysStatistic } from '../components/widgets/DaysStatistic/DaysStatistic';

export function StatisticPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">📊 Статистика</h2>
      </div>

      <div className="flex flex-col gap-2">
        <DaysStatistic />
      </div>
    </div>
  );
}
