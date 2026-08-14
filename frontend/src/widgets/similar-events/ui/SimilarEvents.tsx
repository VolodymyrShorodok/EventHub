import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEventsQuery } from '../../../entities/event/api/queries';
import type { EventTag } from '../../../entities/event/model/types';
export function SimilarEvents({ category }: { category: EventTag[] }) {
  const { data: events = [] } = useEventsQuery();
  return (
    <section className="similar-events">
      <div className="similar-heading">
        <div>
          <h2>Similar Events</h2>
          <p>You might also be interested in these upcoming gatherings.</p>
        </div>
        <Link to="/">
          View All Events <ChevronRight size={15} />
        </Link>
      </div>
      <div className="similar-grid">
        {events
          .filter((event) => event.category.some((c) => category.includes(c)))
          .map((item) => (
            <article className="similar-card" key={item.id}>
              <img src={item.img}></img>

              <div>
                {item.category.map((item, index) => (
                  <span className="detail-category" key={index}>
                    {item}
                  </span>
                ))}
                <p className=" similar-tag ">{item.date}</p>
                <h3>{item.title}</h3>
                <small>Exploring modern data stacks and real-time processing at scale.</small>
                <Link to={`/events/${item.id}`}>View Details</Link>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
