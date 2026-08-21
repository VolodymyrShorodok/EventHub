import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEventQuery } from '@/entities/event/api/queries';
import type { EventDetailsTab } from '@/pages/event-details/helpers/types';
import { RegistrationCard } from '@/features/event-registration/ui/RegistrationCard';
import { SimilarEvents } from '@/widgets/similar-events/ui/SimilarEvents';
import { EventDetailHero } from '@/pages/event-details/ui/EventDetailHero';
import { EventDetailsTabs } from '@/pages/event-details/ui/EventDetailsTabs';
import { EventFacts } from '@/pages/event-details/ui/EventFacts';
import { EventOverview } from '@/pages/event-details/ui/EventOverview';
import { EventSpeakers } from '@/pages/event-details/ui/EventSpeakers';
import { OrganizerCard } from '@/pages/event-details/ui/OrganizerCard';
import { FullScreenLoader } from '@/shared/ui/Loader';
import type { EventTag } from '@/entities/event/model/types';

export function EventDetailsPage() {
  const { eventId } = useParams();
  const { data: event, isLoading } = useEventQuery(eventId);
  const [activeTab, setActiveTab] = useState<EventDetailsTab>('about');

  if (isLoading || !event) return <FullScreenLoader />;

  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-7 md:px-10">
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
        <aside className="flex flex-col gap-[18px]">
          <RegistrationCard benefits={event.benefits} />
          <OrganizerCard creator={event.createdBy} />
        </aside>
      </div>
      <SimilarEvents category={event.category} id={Number(eventId)} />
    </main>
  );
}
