import { Minus, Plus } from 'lucide-react';
import { cn } from '@/shared/ui/cn';

type QuantityFieldProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

export function QuantityField({
  value,
  onChange,
  min = 1,
  max,
  disabled = false,
  className,
  'aria-label': ariaLabel = 'Quantity',
}: QuantityFieldProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(max === undefined ? value + 1 : Math.min(max, value + 1));

  return (
    <div className={cn('flex items-center gap-3.5', className)} aria-label={ariaLabel}>
      <button
        type="button"
        onClick={decrease}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        className="grid h-[27px] w-[27px] place-items-center rounded-full border border-slate-200 bg-slate-50 text-color-body transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Minus size={13} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        onClick={increase}
        disabled={disabled || (max !== undefined && value >= max)}
        aria-label="Increase quantity"
        className="grid h-[27px] w-[27px] place-items-center rounded-full border border-slate-200 bg-slate-50 text-color-body transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus size={13} />
      </button>
    </div>
  );
}
