import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export default function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-muted h-5 w-full animate-pulse rounded-md', className)} {...props} />;
}
