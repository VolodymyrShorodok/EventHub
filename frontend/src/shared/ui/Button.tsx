import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/ui/cn';

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center transition disabled:cursor-wait disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
