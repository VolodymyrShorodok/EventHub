import type { InputHTMLAttributes } from 'react';
import { Checkbox } from '@/shared/ui/Checkbox';

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function CheckboxField({ label, ...props }: Props) {
  return (
    <label className="flex items-center gap-1.5 text-slate-500">
      <Checkbox className="size-3 accent-primary" {...props} /> {label}
    </label>
  );
}
