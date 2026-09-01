import { useEffect, useMemo, useState } from 'react';
import { useEventsQuery } from '@/entities/event/api/queries';
import { filterEvents } from '@/entities/event/helpers/filterEvents';
import type { EventTag } from '@/entities/event/types';
import { useCatalogUrlState } from '@/pages/event-catalog/model/useCatalogUrlState';

export type CatalogView = 'grid' | 'table';

export function useEventCatalog() {
  const [view, setView] = useState<CatalogView>('grid');
  const [category, setCategory] = useState<EventTag | ''>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const { query, page, updatePage } = useCatalogUrlState();
  const { data: events = [], isLoading, isError } = useEventsQuery();

  const categories = useMemo(
    () => [...new Set(events.flatMap((event) => event.category))],
    [events],
  );
  const filteredEvents = useMemo(
    () =>
      filterEvents(events, query).filter(
        (event) =>
          (!category || event.category.includes(category)) &&
          (!dateFrom || event.date >= dateFrom) &&
          (!dateTo || event.date <= dateTo),
      ),
    [category, dateFrom, dateTo, events, query],
  );

  const pageSize = view === 'grid' ? 9 : 8;
  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleEvents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEvents.slice(start, start + pageSize);
  }, [currentPage, filteredEvents, pageSize]);

  useEffect(() => {
    if (page !== currentPage) updatePage(currentPage, totalPages);
  }, [currentPage, page, totalPages, updatePage]);

  const resetToFirstPage = () => updatePage(1, totalPages);
  const updateCategory = (nextCategory: EventTag | '') => {
    setCategory(nextCategory);
    resetToFirstPage();
  };
  const updateDateFrom = (nextDate: string) => {
    setDateFrom(nextDate);
    resetToFirstPage();
  };
  const updateDateTo = (nextDate: string) => {
    setDateTo(nextDate);
    resetToFirstPage();
  };
  const clearFilters = () => {
    setCategory('');
    setDateFrom('');
    setDateTo('');
    resetToFirstPage();
  };
  const changeView = (nextView: CatalogView) => {
    setView(nextView);
    resetToFirstPage();
  };

  return {
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
    hasActiveFilters: Boolean(category || dateFrom || dateTo),
    visibleEvents,
    hasEvents: filteredEvents.length > 0,
    currentPage,
    totalPages,
    goToPage: (nextPage: number) => updatePage(nextPage, totalPages),
    isLoading,
    isError,
  };
}
