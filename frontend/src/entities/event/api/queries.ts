import { useQuery } from '@tanstack/react-query';
import { events } from '../model/events';

const delay = <T>(data: T) =>
  new Promise<T>((resolve) => window.setTimeout(() => resolve(data), 120));

export const eventQueryKeys = {
  all: ['events'] as const,
  detail: (eventId: number) => [...eventQueryKeys.all, eventId] as const,
};

export function useEventsQuery() {
  return useQuery({ queryKey: eventQueryKeys.all, queryFn: () => delay(events) });
}

export function useEventQuery(eventId: number) {
  return useQuery({
    queryKey: eventQueryKeys.detail(eventId),
    queryFn: () => delay(events.find((event) => event.id === eventId)),
    enabled: Number.isFinite(eventId),
  });
}
