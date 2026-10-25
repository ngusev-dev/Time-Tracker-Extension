import { CalendarPlus } from 'lucide-react';
import { ManualSessionForm } from '@/features/manual-session';
import { PageHeader } from '@/shared/ui/PageHeader';

export function AddSessionPage() {
  return (
    <div className="flex flex-col gap-3">
      <PageHeader icon={CalendarPlus} title="Добавить сессию" />
      <ManualSessionForm />
    </div>
  );
}
