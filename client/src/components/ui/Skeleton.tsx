import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export default function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('bg-gray-300 h-5 w-full animate-pulse rounded-xs', className)} {...props} />;
}
