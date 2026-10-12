import { observer } from 'mobx-react-lite';
import { cn } from '@/shared/lib/utils';
import { TaskTypeStore } from './TaskType.store';
import { TaskTypeLabel } from './TaskTypeLabel';

type TaskTypeBadgeProps = {
  /** Id типа или подтипа, как его хранит запись истории */
  taskTypeId: string | null | undefined;
  className?: string;
};

/** Тип задачи в карточках истории; ничего не рендерит, если тип не выбран */
export const TaskTypeBadge = observer(({ taskTypeId, className }: TaskTypeBadgeProps) => {
  const found = TaskTypeStore.find(taskTypeId);
  if (!found) return null;

  return <TaskTypeLabel {...found} className={cn('text-xs font-medium', className)} />;
});
