import { Award, Download, Globe2, Video } from 'lucide-react';
import type { EventItem } from '../../../entities/event/model/types';

const benefits = [
  { icon: Globe2, title: 'Global Access', text: 'Stream keynotes live from anywhere.' },
  { icon: Video, title: 'Session Recordings', text: 'Access 30 days of replays.' },
  { icon: Award, title: 'Certified Learning', text: 'Earn official CPE credits.' },
  { icon: Download, title: 'Resources', text: 'Download all slides and toolkits.' },
];

export function EventOverview({ event }: { event: EventItem }) {
  return (
    <section className="detail-overview">
      <h2>Event Overview</h2>
      <p>
        {event.description} Join fellow professionals for a full day of practical sessions,
        inspiring presentations, and meaningful networking opportunities.
      </p>
      <div className="detail-benefits">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div className="detail-benefit" key={title}>
            <span>
              <Icon size={14} />
            </span>
            <p>
              <b>{title}</b>
              <small>{text}</small>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
