import { Award, Download, Globe2, Video } from 'lucide-react';
import type { EventItem } from '@/entities/event/types';

const benefits = [
  { icon: Globe2, title: 'Global Access', text: 'Stream keynotes live from anywhere.' },
  { icon: Video, title: 'Session Recordings', text: 'Access 30 days of replays.' },
  { icon: Award, title: 'Certified Learning', text: 'Earn official CPE credits.' },
  { icon: Download, title: 'Resources', text: 'Download all slides and toolkits.' },
];

export function EventOverview({ event }: { event: EventItem }) {
  return (
    <section className="pt-[22px]">
      <h2 className="m-0 text-heading-2 tracking-[-0.03em] text-color-heading">Event Overview</h2>
      <p className="mt-4 max-w-[650px] text-body text-color-body">
        {event.description} Join fellow professionals for a full day of practical sessions,
        inspiring presentations, and meaningful networking opportunities.
      </p>
      <div className="mt-6 grid gap-[17px_30px] sm:grid-cols-2">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div className="flex gap-2.5" key={title}>
            <span className="grid h-[27px] w-[27px] place-items-center rounded-md bg-accent-soft text-primary">
              <Icon size={14} />
            </span>
            <p className="m-0">
              <b className="block text-body-sm font-semibold text-slate-600">{title}</b>
              <small className="mt-1 block text-caption text-color-muted">{text}</small>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
