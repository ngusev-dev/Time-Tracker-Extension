import { ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { TaskTypeDot } from './TaskTypeDot';
import type { TTaskSubtype, TTaskType } from './types';

type TaskTypeLabelProps = {
  type: TTaskType;
  subtype?: TTaskSubtype;
  className?: string;
};

/** «Тип › Подтип» с цветной точкой; подтипа может не быть */
export function TaskTypeLabel({ type, subtype, className }: TaskTypeLabelProps) {
  return (
    <span className={cn('inline-flex min-w-0 items-center gap-1.5', className)}>
      <TaskTypeDot color={type.color} className="size-[0.8em]" />
      <span className={cn('truncate', { 'shrink-0 max-w-1/2': subtype })} style={{ color: type.color }}>
        {type.name}
      </span>
      {subtype && (
        <>
          <ChevronRight className="size-[1em] shrink-0 text-muted-foreground" />
          <span className="truncate">{subtype.name}</span>
        </>
      )}
    </span>
  );
}
