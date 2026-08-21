import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/shared/ui/cn';

export const Radio = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
>(({ className, ...props }, ref) => (
  <input ref={ref} type="radio" className={cn('size-4 accent-primary', className)} {...props} />
));

Radio.displayName = 'Radio';
