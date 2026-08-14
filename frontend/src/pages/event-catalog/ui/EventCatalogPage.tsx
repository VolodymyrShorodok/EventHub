import { Grid2X2, List, Plus, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useEventsQuery } from '../../../entities/event/api/queries';
import { EventCard } from '../../../entities/event/ui/EventCard';
import { EventTable } from '../../../entities/event/ui/EventTable';
import { EventSearch } from '../../../features/event-search/ui/EventSearch';
import { useAuth } from '../../../features/authentication/model/useAuth';
import { AppContainer } from '../../../widgets/app-shell/ui/AppContainer';
import { filterEvents } from '../helpers/filterEvents';

export function EventCatalogPage() {
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const { user } = useAuth();
  const { data: events = [], isLoading } = useEventsQuery();
  const filteredEvents = useMemo(() => filterEvents(events, query), [events, query]);

  return (
    <AppContainer>
      <main className="px-5 py-5 sm:px-7">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-slate-800">Event Catalog</h1>
            <p className="mt-0.5 text-[9px] text-slate-500">
              Discover and register for the latest conferences, workshops, and networking events.
            </p>
          </div>
          {user.role === 'admin' && (
            <button className="create-event-button hidden sm:flex">
              <Plus size={12} /> Create Event
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <EventSearch value={query} onChange={setQuery} />
          <div className="flex gap-2 ">
            <button className="btn-outline">
              <SlidersHorizontal size={15} />
              Advanced Filters
            </button>
            <div className="flex overflow-hidden rounded-sm border border-slate-200">
              <button
                onClick={() => setView('grid')}
                className={`view-button ${view === 'grid' ? 'view-button--active' : ''}`}
              >
                <Grid2X2 size={15} /> Grid
              </button>
              <button
                onClick={() => setView('table')}
                className={`view-button ${view === 'table' ? 'view-button--active' : ''}`}
              >
                <List size={15} /> Table
              </button>
            </div>
          </div>
        </div>

        <section className="mt-6">
          {isLoading ? (
            <p className="py-14 text-center text-sm text-slate-400">Loading events...</p>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard event={event} key={event.id} />
              ))}
            </div>
          ) : (
            <EventTable items={filteredEvents} />
          )}
          {!isLoading && filteredEvents.length === 0 && (
            <p className="py-14 text-center text-sm text-slate-400">No events found.</p>
          )}
        </section>
      </main>
    </AppContainer>
  );
}
