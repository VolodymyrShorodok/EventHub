import type { EventItem } from '@/entities/event/model/types';

export function filterEvents(events: EventItem[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return events;

  return events.filter(
    (event) =>
      event.title.toLowerCase().includes(normalizedQuery) ||
      event.location.toLowerCase().includes(normalizedQuery),
  );
}
