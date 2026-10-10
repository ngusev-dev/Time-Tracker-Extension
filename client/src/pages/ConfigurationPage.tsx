import { Settings } from 'lucide-react';
import { TaskTypeManager } from '@/features/task-type';
import { PageHeader } from '@/shared/ui/PageHeader';

export function ConfigurationPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader icon={Settings} title="Конфигурация" />
      <TaskTypeManager />
    </div>
  );
}
