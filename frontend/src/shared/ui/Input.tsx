import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/shared/ui/cn';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-body-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = 'Input';
