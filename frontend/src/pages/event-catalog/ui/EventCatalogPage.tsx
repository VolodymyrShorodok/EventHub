import { ChevronLeft, ChevronRight, Grid2X2, List, Plus, SlidersHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import { useMemo, useState } from 'react';
import { useEventsQuery } from '@/entities/event/api/queries';
import type { EventTag } from '@/entities/event/model/types';
import { EventCard } from '@/entities/event/ui/EventCard';
import { EventTable } from '@/entities/event/ui/EventTable';
import { useAuth } from '@/features/authentication/model/useAuth';
import { filterEvents } from '@/pages/event-catalog/helpers/filterEvents';
import { useCatalogUrlState } from '@/pages/event-catalog/model/useCatalogUrlState';
import { FullScreenLoader } from '@/shared/ui/Loader';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

export function EventCatalogPage() {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [category, setCategory] = useState<EventTag | ''>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const { query, page, updatePage } = useCatalogUrlState();
  const { user } = useAuth();
  const { data: events = [], isLoading } = useEventsQuery();
  const categories = useMemo(
    () => [...new Set(events.flatMap((event) => event.category))],
    [events],
  );
  const hasActiveFilters = Boolean(category || dateFrom || dateTo);
  const filteredEvents = useMemo(
    () =>
      filterEvents(events, query).filter((event) => {
        const eventDate = new Date(event.date).getTime();
        const from = dateFrom ? new Date(dateFrom).getTime() : -Infinity;
        const to = dateTo ? new Date(dateTo).getTime() : Infinity;

        return (
          (!category || event.category.includes(category)) && eventDate >= from && eventDate <= to
        );
      }),
    [category, dateFrom, dateTo, events, query],
  );
  const pageSize = view === 'grid' ? 6 : 8;
  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleEvents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEvents.slice(start, start + pageSize);
  }, [currentPage, filteredEvents, pageSize]);
  const handleViewChange = (nextView: 'grid' | 'table') => {
    setView(nextView);
    updatePage(1, totalPages);
  };

  const catalogContent =
    view === 'grid' ? (
      <div className="grid h-full min-h-0 flex-1 auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {visibleEvents.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    ) : (
      <EventTable items={visibleEvents} />
    );

  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-page-title text-slate-800">Event Catalog</h1>
          <p className="mt-0.5 text-body-sm text-slate-500">
            Discover and register for the latest conferences, workshops, and networking events.
          </p>
        </div>
        <div className="flex max-w-[70%] flex-wrap items-start justify-end gap-2">
          <div className="relative flex items-start rounded-md border border-slate-200 bg-slate-50 p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setIsFiltersOpen((isOpen) => !isOpen)}
              className={clsx(
                'inline-flex shrink-0 items-center gap-2 rounded px-2.5 py-1.5 text-ui font-medium transition',
                isFiltersOpen
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-accent',
              )}
            >
              <SlidersHorizontal size={15} />
              Advanced Filters
            </button>
            {isFiltersOpen && (
              <div className="absolute right-full top-0 z-30 mr-2 flex min-w-max flex-wrap items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1 shadow-lg">
                <label className="flex items-center gap-2 text-ui font-medium text-slate-600">
                  <span>Category</span>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value as EventTag | '')}
                    className="h-7 rounded-md border border-slate-200 bg-white px-2 text-ui font-normal text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                    value={dateFrom}
                    onChange={(event) => setDateFrom(event.target.value)}
                  />
                </label>
                <label className="flex items-center gap-2 text-ui font-medium text-slate-600">
                  To
                  <Input
                    type="date"
                    value={dateTo}
                    onChange={(event) => setDateTo(event.target.value)}
                  />
                </label>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      setCategory('');
                      setDateFrom('');
                      setDateTo('');
                    }}
                    className="h-9 px-2 text-ui font-medium text-accent hover:text-primary-hover"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 self-center">
            <button
              type="button"
              onClick={() => handleViewChange('grid')}
              className={clsx(
                'view-button inline-flex items-center justify-center gap-1.5 rounded px-2.5 py-1.5',
                view === 'grid' && 'view-button--active bg-slate-200 shadow-sm',
              )}
            >
              <Grid2X2 size={15} /> Grid
            </button>
            <button
              type="button"
              onClick={() => handleViewChange('table')}
              className={clsx(
                'view-button inline-flex items-center justify-center gap-1.5 rounded px-2.5 py-1.5',
                view === 'table' && 'view-button--active bg-slate-200 shadow-sm',
              )}
            >
              <List size={15} /> Table
            </button>
          </div>
          {user.role === 'admin' && (
            <Button
              type="button"
              className="hidden h-10 items-center gap-2 rounded-md bg-primary px-4 text-ui font-semibold text-white shadow-sm hover:bg-primary-hover hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 sm:inline-flex"
            >
              <Plus size={15} strokeWidth={2.5} />
              Create Event
            </Button>
          )}
        </div>
      </div>

      <section className="mt-1 flex min-h-0 flex-1 flex-col overflow-hidden">
        {isLoading ? <FullScreenLoader /> : catalogContent}
        {!isLoading && filteredEvents.length === 0 && (
          <p className="py-14 text-center text-sm text-slate-400">No events found.</p>
        )}
        {!isLoading && filteredEvents.length > 0 && totalPages > 1 && (
          <nav
            className="flex shrink-0 items-center justify-center gap-1 pt-3"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={() => updatePage(currentPage - 1, totalPages)}
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
                onClick={() => updatePage(pageNumber, totalPages)}
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
              onClick={() => updatePage(currentPage + 1, totalPages)}
              disabled={currentPage === totalPages}
              className="grid size-8 place-items-center rounded border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </nav>
        )}
      </section>
    </main>
  );
}
