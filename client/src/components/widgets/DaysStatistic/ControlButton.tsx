import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';
import { cn } from '../../../lib/utils/util';

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
