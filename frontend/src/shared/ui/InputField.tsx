import type { InputHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Input } from '@/shared/ui/Input';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export function InputField({ label, error, leading, trailing, id, className, ...props }: Props) {
  return (
    <label htmlFor={id} className={clsx('block text-ui font-semibold text-slate-600', className)}>
      {label}
      <div className="mt-1 flex h-10.5 items-center gap-2 rounded-md border border-border-soft bg-white px-2.75 text-slate-400">
        {leading}
        <Input
          id={id}
          {...props}
          className="h-auto w-full rounded-none border-0 bg-transparent px-0 py-0 text-ui text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0"
        />
        {trailing}
      </div>
      {error && <span className="mt-1 block text-overline font-normal text-red-500">{error}</span>}
    </label>
  );
}
