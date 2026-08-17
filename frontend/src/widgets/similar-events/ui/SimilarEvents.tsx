import { ChevronRight } from 'lucide-react';
import { Link} from 'react-router-dom';
import { useEventsQuery } from '../../../entities/event/api/queries';
import type { EventTag } from '../../../entities/event/model/types';
export function SimilarEvents({ category, id }: { category: EventTag[]; id: number }) {
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
          .filter((event) => event.id !== id && event.category.some((c) => category.includes(c)))
          .map((item) => (
            <article className="similar-card " key={item.id}>
              <img src={item.img} />
              <div className="flex flex-col flex-1">
                <div className="flex gap-2 ">
                  {item.category.map((item, index) => (
                    <span className="detail-category" key={index}>
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col flex-1">
                  <p className=" similar-tag ">{item.date}</p>
                  <h3>{item.title}</h3>
                  <small>Exploring modern data stacks and real-time processing at scale.</small>
                </div>

                <Link
                  className="flex h-7 items-center justify-center bg-[#3292e6] text-[9px] font-medium text-white transition hover:bg-[#197fd4] mt-5  "
                  to={`/events/${item.id}`}
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
