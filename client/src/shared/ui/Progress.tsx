import { cn } from '@/shared/lib/utils';

type Props = {
  progress: number;
  className?: string;
};
export function Progress({ progress, className }: Props) {
  return (
    <div className={cn('h-2 w-full bg-muted rounded-full overflow-hidden', className)}>
      <span
        className="bg-brand h-full block rounded-full transition-[width] duration-500 ease-out"
        style={{
          width: `${Math.min(Math.max(progress, 0), 100)}%`,
        }}
      />
    </div>
  );
}
