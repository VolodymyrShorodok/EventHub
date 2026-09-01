import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

type Props = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function CatalogPagination({ currentPage, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-3 flex shrink-0 items-center justify-center gap-1" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="grid size-8 place-items-center rounded border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft size={15} />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          onClick={() => onChange(pageNumber)}
          className={clsx(
            'grid size-8 place-items-center rounded border text-ui-sm transition',
            pageNumber === currentPage
              ? 'border-primary bg-primary text-white'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50',
          )}
          aria-current={pageNumber === currentPage ? 'page' : undefined}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="grid size-8 place-items-center rounded border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight size={15} />
      </button>
    </nav>
  );
}
