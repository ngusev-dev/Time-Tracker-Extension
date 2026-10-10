import { observer } from 'mobx-react-lite';
import { cn } from '@/shared/lib/utils';
import { TaskTypeStore } from './TaskType.store';
import { TaskTypeLabel } from './TaskTypeLabel';

type TaskTypeBadgeProps = {
  timerId: string;
  className?: string;
};

/** Тип задачи в карточках истории; ничего не рендерит, если тип не выбран */
export const TaskTypeBadge = observer(({ timerId, className }: TaskTypeBadgeProps) => {
  const selected = TaskTypeStore.getByTimerId(timerId);
  if (!selected) return null;

  return <TaskTypeLabel {...selected} className={cn('text-xs font-medium', className)} />;
});
