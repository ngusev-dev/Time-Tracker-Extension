import { cn } from '@/shared/lib/utils';

export function TaskTypeDot({ color, className }: { color: string; className?: string }) {
  return <span className={cn('size-2.5 shrink-0 rounded-full', className)} style={{ backgroundColor: color }} />;
}
