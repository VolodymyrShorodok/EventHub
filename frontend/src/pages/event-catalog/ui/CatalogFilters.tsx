import type { EventTag } from '@/entities/event/types';
import { Input } from '@/shared/ui/Input';

type Props = {
  categories: EventTag[];
  category: EventTag | '';
  dateFrom: string;
  dateTo: string;
  minDate: string;
  hasActiveFilters: boolean;
  onCategoryChange: (category: EventTag | '') => void;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  onClear: () => void;
};

export function CatalogFilters({
  categories,
  category,
  dateFrom,
  dateTo,
  minDate,
  hasActiveFilters,
  onCategoryChange,
  onDateFromChange,
  onDateToChange,
  onClear,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="flex items-center gap-2 text-ui font-medium text-slate-600">
        <span>Category</span>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as EventTag | '')}
          className="h-8 rounded-md border border-slate-200 bg-white px-2 text-ui font-normal text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-ui font-medium text-slate-600">
        From
        <Input
          type="date"
          lang='en'
          min={minDate}
          value={dateFrom}
          onChange={(event) => onDateFromChange(event.target.value)}
        />
      </label>

      <label className="flex items-center gap-2 text-ui font-medium text-slate-600">
        To
        <Input
          type="date"
          lang="en"
          min={minDate}
          value={dateTo}
          onChange={(event) => onDateToChange(event.target.value)}
        />
      </label>

      <div className="ml-auto flex items-center gap-2">
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="h-9 px-3 text-ui font-medium text-accent hover:text-primary-hover"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
