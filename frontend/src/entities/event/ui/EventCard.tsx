import { Bookmark, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { EventItem } from '../model/types';

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="overflow-hidden rounded-[3px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,.04)]">
      <img src={event.img}></img>
      <div className="p-2.5 flex flex-col">
        <div className="flex justify-between place-items-center">
          <h2 className="line-clamp-2  text-[14px] font-semibold leading-4 text-slate-800">
            {event.title}
          </h2>
          <div className='gap-x-5'>
            {event.category.map((item, index) => (
              <span className="detail-category" key={index}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-1 space-y-1 text-[9px] text-slate-500">
          <p className="flex items-center gap-1.5">
            <CalendarDays size={10} /> {event.date} · {event.time}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={10} /> {event.location}
          </p>
        </div>
        <p className="mt-2 line-clamp-2 h-7 text-[9px] leading-[13px] text-slate-500">
          {event.description}
        </p>
        <div className="mt-2 flex gap-1.5">
          <button className="grid size-7 place-items-center border border-slate-200 text-[#258be4]">
            <Bookmark size={11} />
          </button>
          <Link
            to={`/events/${event.id}`}
            className="flex h-7 flex-1 items-center justify-center bg-[#3292e6] text-[9px] font-medium text-white transition hover:bg-[#197fd4]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
