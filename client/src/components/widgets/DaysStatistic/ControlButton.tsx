import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

export default function ControlButton({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button className={cn('cursor-pointer', className)} {...props}>
      {children}
    </button>
  );
}
