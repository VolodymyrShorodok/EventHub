import type { EventItem } from '@/entities/event/model/types';
import getInitials from '@/helpers/getInitials';

export function EventSpeakers({ event }: { event: EventItem }) {
  return (
    <section className="pt-[22px]">
      <h2 className="m-0 text-heading-2 font-bold tracking-[-0.03em] text-slate-700">
        Featured Speakers
      </h2>
      <p className="mt-2 text-caption text-slate-400">Learn from leaders shaping the future.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {event.speakers.map((speaker) => (
          <article
            className="flex min-h-[82px] items-center gap-3 rounded-lg border border-slate-200 bg-white p-3"
            key={speaker.name}
          >
            <span
              className="grid h-[42px] w-[42px] flex-none place-items-center rounded-full text-caption font-bold text-white"
              style={{ backgroundColor: speaker.color }}
            >
              {getInitials(speaker.name)}
            </span>
            <div>
              <h3 className="m-0 text-body-sm font-semibold text-slate-700">{speaker.name}</h3>
              <p className="mt-1 text-caption leading-[17px] text-slate-500">{speaker.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
