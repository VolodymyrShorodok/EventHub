import type { EventItem } from '@/entities/event/types';
import { getEventFacts } from '@/pages/event-details/helpers/getEventFacts';

export function EventFacts({ event }: { event: EventItem }) {
  return (
    <div className="mt-6 grid gap-5 rounded-[10px] border border-slate-200 bg-white p-5 sm:grid-cols-2">
      {getEventFacts(event).map(({ icon: Icon, label, value }) => (
        <div className="flex items-center gap-3" key={label}>
          <span className="grid h-[42px] w-[42px] place-items-center rounded-md bg-surface-fact text-primary">
            <Icon size={19} />
          </span>
          <p className="m-0">
            <small className="block text-overline font-bold uppercase tracking-[0.08em] text-slate-400">
              {label}
            </small>
            <b className="mt-1 block max-w-[210px] text-ui leading-4 text-slate-600">{value}</b>
          </p>
        </div>
      ))}
    </div>
  );
}
