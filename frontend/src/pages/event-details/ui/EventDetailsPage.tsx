import { useState } from 'react';
import {  useParams } from 'react-router-dom';
import { useEventQuery } from '../../../entities/event/api/queries';
import { RegistrationCard } from '../../../features/event-registration/ui/RegistrationCard';
import { AppContainer } from '../../../widgets/app-shell/ui/AppContainer';
import { SimilarEvents } from '../../../widgets/similar-events/ui/SimilarEvents';
import type { EventDetailsTab } from '../helpers/types';
import { EventDetailHero } from './EventDetailHero';
import { EventDetailsTabs } from './EventDetailsTabs';
import { EventFacts } from './EventFacts';
import { EventOverview } from './EventOverview';
import { EventSpeakers } from './EventSpeakers';
import { OrganizerCard } from './OrganizerCard';

export function EventDetailsPage() {
  const { eventId } = useParams();
  const { data: event, isLoading } = useEventQuery(Number(eventId));
  const [activeTab, setActiveTab] = useState<EventDetailsTab>('about');

  if (isLoading || !event)
    return (
      <AppContainer>
        <main className="p-10 text-sm text-slate-400">Loading event...</main>
      </AppContainer>
    );

  return (
    <AppContainer>
      <main className="detail-page">
        <EventDetailHero eventImg={event.img} />
        <div className="detail-layout">
          <section className="min-w-0">
            {event.category.map((item, index) => (
              <span className="detail-category" key={index}>
                {item}
              </span>
            ))}

            <h1 className="detail-title">{event.title}</h1>
            <EventFacts event={event} />
            <EventDetailsTabs activeTab={activeTab} onChange={setActiveTab} />
            {activeTab === 'about' && <EventOverview event={event} />}
            {activeTab === 'speakers' && <EventSpeakers event={event} />}
          </section>
          <aside className="detail-aside">
            <RegistrationCard benefits={event.benefits} />
            <OrganizerCard creator={event.createdBy} />
          </aside>
        </div>
        <SimilarEvents category={event.category} />
      </main>
    </AppContainer>
  );
}
