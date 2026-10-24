import { FileSpreadsheet } from 'lucide-react';
import { ReportExport } from '@/features/report';
import { PageHeader } from '@/shared/ui/PageHeader';

export function ReportPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader icon={FileSpreadsheet} title="Отчёт" />
      <ReportExport />
    </div>
  );
}
