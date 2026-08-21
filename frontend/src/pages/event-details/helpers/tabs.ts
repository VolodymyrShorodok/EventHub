import type { EventDetailsTab } from '@/pages/event-details/helpers/types';

export const eventDetailsTabs: Array<{ value: EventDetailsTab; label: string }> = [
  { value: 'about', label: 'About Event' },
  { value: 'speakers', label: 'Speakers' },
];
