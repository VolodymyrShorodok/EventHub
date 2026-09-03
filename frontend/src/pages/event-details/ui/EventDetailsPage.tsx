import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEventQuery } from '@/entities/event/api/queries';
import type { EventDetailsTab } from '@/pages/event-details/types';
import { RegistrationCard } from '@/features/event-registration/ui/RegistrationCard';
import { SimilarEvents } from '@/widgets/similar-events/ui/SimilarEvents';
import { EventDetailHero } from '@/pages/event-details/ui/EventDetailHero';
import { EventDetailsTabs } from '@/pages/event-details/ui/EventDetailsTabs';
import { EventFacts } from '@/pages/event-details/ui/EventFacts';
import { EventOverview } from '@/pages/event-details/ui/EventOverview';
import { EventSpeakers } from '@/pages/event-details/ui/EventSpeakers';
import { OrganizerCard } from '@/pages/event-details/ui/OrganizerCard';
import { FullScreenLoader } from '@/shared/ui/Loader';
import type { EventTag } from '@/entities/event/types';

export function EventDetailsPage() {
  const { eventId } = useParams();
  const { data: event, isLoading, isError } = useEventQuery(eventId);
  const [activeTab, setActiveTab] = useState<EventDetailsTab>('about');

  if (isLoading) return <FullScreenLoader />;

  if (isError) {
    return (
      <main className="mx-auto grid min-h-80 max-w-300 place-items-center px-6 py-7 text-center">
        <div>
          <h1 className="text-heading-1 text-slate-800">Unable to load the event</h1>
          <p className="mt-2 text-body text-slate-500">Please try again in a moment.</p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-ui font-semibold text-white hover:bg-primary-hover"
          >
            Back to events
          </Link>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="mx-auto grid min-h-80 max-w-300 place-items-center px-6 py-7 text-center">
        <div>
          <h1 className="text-heading-1 text-slate-800">Event not found</h1>
          <p className="mt-2 text-body text-slate-500">
            This event may have been removed or the link is incorrect.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-ui font-semibold text-white hover:bg-primary-hover"
          >
            Back to events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-300 px-6 py-7 md:px-10">
      <EventDetailHero eventImg={event.img} />
      <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1fr)_295px]">
        <section className="min-w-0">
          <div className="flex flex-wrap gap-2">
            {event.category.map((item: EventTag) => (
              <span
                className="inline-flex items-center justify-center rounded-full bg-accent-soft px-2.5 py-1 text-caption font-bold text-accent"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>

          <h1 className="mt-4 max-w-[660px] text-heading-1 tracking-[-0.05em] text-slate-800">
            {event.title}
          </h1>
          <EventFacts event={event} />
          <EventDetailsTabs activeTab={activeTab} onChange={setActiveTab} />
          {activeTab === 'about' && <EventOverview event={event} />}
          {activeTab === 'speakers' && <EventSpeakers event={event} />}
        </section>
        <aside className="flex flex-col gap-4">
          <RegistrationCard benefits={event.benefits} />
          <OrganizerCard creator={event.createdBy} />
        </aside>
      </div>
      <SimilarEvents category={event.category} id={Number(eventId)} />
    </main>
  );
}
