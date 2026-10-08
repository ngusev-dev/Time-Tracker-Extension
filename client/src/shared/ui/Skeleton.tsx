import { cn } from '@/shared/lib/utils';
import type { HTMLAttributes } from 'react';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-muted h-5 w-full animate-pulse rounded-md', className)} {...props} />;
}
