import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEventsQuery } from '@/entities/event/api/queries';
import type { EventTag } from '@/entities/event/types';
import { Loader } from '@/shared/ui/Loader';
import { formatEventDate } from '@/entities/event/helpers/formatEventDate';

export function SimilarEvents({ category, id }: { category: EventTag[]; id: number }) {
  const { data: events = [], isLoading } = useEventsQuery();

  return (
    <section className="mt-[125px] border-t border-slate-200 pt-9">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="m-0 text-heading-2 tracking-[-0.03em] text-color-heading">
            Similar Events
          </h2>
          <p className="mt-2 text-body-sm text-color-muted">
            You might also be interested in these upcoming gatherings.
          </p>
        </div>
        <Link to="/" className="flex items-center gap-2 text-body-sm font-semibold text-slate-600">
          View All Events <ChevronRight size={15} />
        </Link>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full flex min-h-32 items-center justify-center">
            <Loader className="size-8" />
          </div>
        ) : (
          events
            .filter((event) => event.id !== id && event.category.some((c) => category.includes(c)))
            .map((item) => (
              <article
                className="flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white"
                key={item.id}
              >
                <img src={item.img} alt={item.title} className="h-[150px] w-full object-cover" />
                <div className="flex flex-1 flex-col p-[11px_13px_14px]">
                  <div className="flex flex-wrap gap-2">
                    {item.category.map((tag, index) => (
                      <span
                        className="inline-flex items-center justify-center rounded-full bg-accent-soft px-2 py-1 text-overline text-accent"
                        key={index}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2 flex flex-1 flex-col">
                    <p className="mt-2 flex justify-end text-[11px] text-slate-400">
                      {formatEventDate(item.date)}
                    </p>
                    <h3 className="mt-3 text-heading-3 text-slate-700">{item.title}</h3>
                    <small className="mt-1 min-h-[30px] text-caption text-color-muted">
                      Exploring modern data stacks and real-time processing at scale.
                    </small>
                  </div>

                  <Link
                    className="mt-5 flex h-7 items-center justify-center bg-primary text-caption font-medium text-white transition hover:bg-primary-hover"
                    to={`/events/${item.id}`}
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))
        )}
      </div>
    </section>
  );
}
