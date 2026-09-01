import { ChevronDown, ChevronUp, Plus, SlidersHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { EventCard } from '@/entities/event/ui/EventCard';
import { EventTable } from '@/entities/event/ui/EventTable';
import { useAuth } from '@/features/authentication/model/useAuth';
import { useEventCatalog } from '@/pages/event-catalog/model/useEventCatalog';
import { CatalogFilters } from '@/pages/event-catalog/ui/CatalogFilters';
import { CatalogPagination } from '@/pages/event-catalog/ui/CatalogPagination';
import { CatalogViewSwitcher } from '@/pages/event-catalog/ui/CatalogViewSwitcher';
import { FullScreenLoader } from '@/shared/ui/Loader';
import { Button } from '@/shared/ui/Button';

export function EventCatalogPage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { user } = useAuth();
  const {
    view,
    changeView,
    category,
    dateFrom,
    dateTo,
    categories,
    updateCategory,
    updateDateFrom,
    updateDateTo,
    clearFilters,
    hasActiveFilters,
    visibleEvents,
    hasEvents,
    currentPage,
    totalPages,
    goToPage,
    isLoading,
    isError,
  } = useEventCatalog();
  const today = new Date().toISOString().slice(0, 10);

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
          <div className="relative flex items-start rounded-md border border-slate-200 bg-slate-50  shadow-sm">
            <button
              type="button"
              aria-expanded={isFiltersOpen}
              aria-controls="catalog-filters"
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
              {isFiltersOpen ? (
                <ChevronUp size={14} className="ml-1 text-slate-500" />
              ) : (
                <ChevronDown size={14} className="ml-1 text-slate-500" />
              )}
            </button>
          </div>
          <CatalogViewSwitcher value={view} onChange={changeView} />
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

      <div
        id="catalog-filters"
        className={clsx(
          'mt-3 overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 ease-out',
          isFiltersOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <CatalogFilters
          categories={categories}
          category={category}
          dateFrom={dateFrom}
          dateTo={dateTo}
          minDate={today}
          hasActiveFilters={hasActiveFilters}
          onCategoryChange={updateCategory}
          onDateFromChange={updateDateFrom}
          onDateToChange={updateDateTo}
          onClear={clearFilters}
        />
      </div>

      <section className="mt-1 flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
          {isLoading && <FullScreenLoader />}
          {isError && (
            <p className="py-14 text-center text-sm text-slate-400">
              Unable to load events. Please try again.
            </p>
          )}
          {!isLoading && !isError && (
            <>
              {view === 'grid' ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleEvents.map((event) => (
                    <EventCard event={event} key={event.id} />
                  ))}
                </div>
              ) : (
                <EventTable items={visibleEvents} />
              )}
              {!hasEvents && (
                <p className="py-14 text-center text-sm text-slate-400">No events found.</p>
              )}
            </>
          )}
        </div>

        {!isLoading && !isError && hasEvents && (
          <CatalogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={goToPage}
          />
        )}
      </section>
    </main>
  );
}
