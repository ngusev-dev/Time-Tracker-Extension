import { BarChart3 } from 'lucide-react';
import { DaysStatistic } from '@/features/statistics';
import { PageHeader } from '@/shared/ui/PageHeader';

export function StatisticPage() {
  return (
    <div className="flex flex-col gap-3">
      <PageHeader icon={BarChart3} title="Статистика" />

      <div className="flex flex-col gap-2">
        <DaysStatistic />
      </div>
    </div>
  );
}
