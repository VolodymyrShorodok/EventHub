import { CalendarDays, Info } from 'lucide-react';

export function OrganizerCard({ creator }: { creator: string }) {
  return (
    <>
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white p-[17px_14px_14px] shadow-sm">
        <b className="text-ui-sm font-semibold uppercase tracking-[0.08em] text-slate-600">
          Hosted by
        </b>
        <div className="mt-3 flex items-center gap-2.5">
          <span className="grid h-8.5 w-8.5 place-items-center rounded-full bg-primary text-white">
            <CalendarDays size={17} />
          </span>
          <p className="m-0">
            <strong className="block text-ui-sm font-semibold text-slate-600">{creator}</strong>
            <small className="mt-1 block text-overline text-slate-400">Verified Organizer</small>
          </p>
        </div>
        <button
          type="button"
          className="mt-3 h-7.5 w-full rounded-md border border-slate-200 bg-slate-50 text-overline font-semibold text-slate-600"
        >
          Contact Organizer
        </button>
      </section>
      <div className="flex gap-2.5 rounded-md border border-slate-200 bg-white p-[10px_14px] text-primary shadow-sm">
        <Info size={16} />
        <p className="m-0">
          <b className="block text-overline font-bold uppercase tracking-[0.08em] text-primary">
            Helpful tip
          </b>
          <span className="mt-1 block text-overline leading-3.75 text-slate-500">
            Group registration for 5+ people qualifies for a 15% discount. Contact our sales team
            for more info.
          </span>
        </p>
      </div>
    </>
  );
}
