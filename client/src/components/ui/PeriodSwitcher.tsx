import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from './Button';

type Props = {
  label: ReactNode;
  onPrev: () => void;
  onNext: () => void;
  canNext?: boolean;
  className?: string;
};

export function PeriodSwitcher({ label, onPrev, onNext, canNext = true, className }: Props) {
  return (
    <div className={cn('inline-flex items-center gap-0.5 rounded-full border bg-card p-0.5 shadow-xs', className)}>
      <Button variant="ghost" size="icon-sm" className="size-7 rounded-full" onClick={onPrev} aria-label="Назад">
        <ChevronLeft />
      </Button>
      <div className="min-w-24 px-1 text-center text-xs font-medium tabular-nums">{label}</div>
      <Button
        variant="ghost"
        size="icon-sm"
        className="size-7 rounded-full"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Вперёд"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
