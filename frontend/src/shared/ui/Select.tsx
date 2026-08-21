import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/shared/ui/cn';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-body-sm text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    />
  ),
);

Select.displayName = 'Select';
