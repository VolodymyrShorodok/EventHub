import { Bookmark, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { EventItem } from '@/entities/event/model/types';
import { formatEventDate } from '@/entities/event/helpers/formatEventDate';

export function EventCard({ event }: { event: EventItem }) {
  const eventUrl = `/events/${event.id}`;

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[3px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,.04)]">
      <Link to={eventUrl} aria-label={`View ${event.title}`} className="absolute inset-0 z-0" />
      <img
        className="pointer-events-none min-h-32 w-full flex-1 object-cover"
        src={event.img}
        alt={event.title}
      />
      <div className="relative z-10 flex shrink-0 flex-col p-2.5 pointer-events-none">
        <div className="flex items-center justify-between">
          <h2 className="line-clamp-1 text-heading-2 text-color-heading">{event.title}</h2>
          <div className="flex gap-1">
            {event.category.map((item, index) => (
              <span
                className="inline-flex items-center justify-center rounded-full bg-accent-soft px-1.5 py-0.5 text-overline text-accent text-center"
                key={index}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2 text-caption text-color-body">
          <p className="flex items-center gap-1.5">
            <CalendarDays size={10} /> {formatEventDate(event.date)} · {event.time}
          </p>
          <p className="flex min-w-0 items-center gap-1.5 truncate text-right">
            <MapPin size={10} /> {event.location}
          </p>
        </div>
        <p className="mt-1 min-h-8 line-clamp-2 text-caption text-color-body">
          {event.description}
        </p>
        <div className="mt-1.5 flex gap-1.5">
          <button
            type="button"
            className="pointer-events-auto grid size-8 place-items-center border border-slate-200 text-accent"
          >
            <Bookmark size={14} />
          </button>
          <span className="flex h-8 flex-1 items-center justify-center bg-primary text-caption font-medium text-white transition hover:bg-primary-hover">
            View Details
          </span>
        </div>
      </div>
    </article>
  );
}
