import { CalendarDays, Clock3, MapPin, Users, type LucideIcon } from 'lucide-react';
import type { EventItem } from '@/entities/event/model/types';
import { formatEventDate } from '@/entities/event/helpers/formatEventDate';
import { formatAttendance } from '@/pages/event-details/helpers/formatAttendance';

export type EventFact = { icon: LucideIcon; label: string; value: string };

export function getEventFacts(event: EventItem): EventFact[] {
  return [
    { icon: CalendarDays, label: 'Date', value: formatEventDate(event.date) },
    { icon: Clock3, label: 'Time', value: event.time },
    { icon: MapPin, label: 'Location', value: event.location },
    { icon: Users, label: 'Attendance', value: formatAttendance(event.totalPeople) },
  ];
}
