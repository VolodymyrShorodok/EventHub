import { useQuery } from '@tanstack/react-query';
import { events } from '@/entities/event/model/events';

const delay = <T,>(data: T) => new Promise<T>((resolve) => window.setTimeout(() => resolve(data), 1000));

export const eventQueryKeys = {
  all: ['events'] as const,
  detail: (eventId: string | undefined) => [...eventQueryKeys.all, eventId] as const,
};

export function useEventsQuery() {
  return useQuery({ queryKey: eventQueryKeys.all, queryFn: () => delay(events) });
}

export function useEventQuery(eventId: string | undefined) {
  return useQuery({
    queryKey: eventQueryKeys.detail(eventId),
    queryFn: () => delay(events.find((event) => String(event.id) === eventId)),
    enabled: Boolean(eventId),
  });
}
