import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/shared/ui/cn';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'min-h-24 w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-body-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60',
      className,
    )}
    {...props}
  />
));

Textarea.displayName = 'Textarea';
