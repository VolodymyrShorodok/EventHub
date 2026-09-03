import { Grid2X2, List } from 'lucide-react';
import { clsx } from 'clsx';
import type { CatalogView } from '@/pages/event-catalog/model/useEventCatalog';

type Props = {
  value: CatalogView;
  onChange: (view: CatalogView) => void;
};

export function CatalogViewSwitcher({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 self-center">
      <button
        type="button"
        onClick={() => onChange('grid')}
        className={clsx(
          'view-button inline-flex items-center justify-center gap-1.5 rounded px-2.5 py-1.5',
          value === 'grid' && 'view-button--active bg-slate-200 shadow-sm',
        )}
      >
        <Grid2X2 size={15} /> Grid
      </button>
      <button
        type="button"
        onClick={() => onChange('table')}
        className={clsx(
          'view-button inline-flex items-center justify-center gap-1.5 rounded px-2.5 py-1.5',
          value === 'table' && 'view-button--active bg-slate-200 shadow-sm',
        )}
      >
        <List size={15} /> Table
      </button>
    </div>
  );
}
