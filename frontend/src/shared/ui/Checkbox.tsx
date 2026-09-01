import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/shared/ui/cn';

export const Checkbox = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
>(({ className, ...props }, ref) => (
  <input ref={ref} type="checkbox" className={cn('size-3 accent-primary', className)} {...props} />
));

Checkbox.displayName = 'Checkbox';
