import type { EventItem } from '@/entities/event/types';

/** Filters event entities by the text fields available in every list view. */
export function filterEvents(events: EventItem[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return events;

  return events.filter(
    (event) =>
      event.title.toLowerCase().includes(normalizedQuery) ||
      event.location.toLowerCase().includes(normalizedQuery),
  );
}
