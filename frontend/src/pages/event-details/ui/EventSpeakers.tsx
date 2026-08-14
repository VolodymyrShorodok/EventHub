import type { EventItem } from '../../../entities/event/model/types';
import getInitials from '../../../helpers/getInitials';


export function EventSpeakers({ event }: { event: EventItem }) {
  return (
    <section className="event-program">
      <h2>Featured Speakers</h2>
      <p>Learn from leaders shaping the future.</p>
      <div className="speakers-grid">
        {event.speakers.map((speaker) => (
          <article className="speaker-card" key={speaker.name}>
            <span style={{ backgroundColor: speaker.color }}>{getInitials(speaker.name)}</span>
            <div>
              <h3>{speaker.name}</h3>
              <p>{speaker.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
