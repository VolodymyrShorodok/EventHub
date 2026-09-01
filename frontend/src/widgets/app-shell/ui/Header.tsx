import { BellDot, ChevronRight, Home, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAuth } from '@/features/authentication/model/useAuth';
import type { UserRole } from '@/entities/user/model/types';
import getInitials from '@/helpers/getInitials';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { useEventQuery, useEventsQuery } from '@/entities/event/api/queries';
import { filterEvents } from '@/pages/event-catalog/helpers/filterEvents';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { Loader } from '@/shared/ui/Loader';
import { formatEventDate } from '@/entities/event/helpers/formatEventDate';
const roleLabels: Record<UserRole, string> = {
  guest: 'Guest',
  member: 'Participant',
  admin: 'Administrator',
};

export function Header() {
  const { user, setRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const { pathname } = useLocation();
  const { data: events = [], isLoading: isEventsLoading } = useEventsQuery();

  const eventId = useMatch('/events/:eventId/*')?.params.eventId;

  const { data: event } = useEventQuery(eventId);

  const isEventDetails = Boolean(eventId);

  const pageName = pathname === '/' ? 'Events' : pathname.split('/').filter(Boolean).pop();
  const searchResults = useMemo(
    () => filterEvents(events, searchQuery).slice(0, 3),
    [events, searchQuery],
  );
  const showSearchResults = searchQuery.trim().length > 0;
  const searchUrl = `/?search=${encodeURIComponent(searchQuery.trim())}`;

  return (
    <header className="flex h-20 items-center border-b border-slate-200 bg-white px-5 shadow-sm">
      <div className="flex items-center gap-2 text-body-sm font-medium text-slate-600">
        <Link to="/">
          <Home size={12} />
        </Link>
        <ChevronRight size={10} />
        {isEventDetails ? (
          <>
            <Link to="/">Events</Link>

            <ChevronRight size={10} />

            <span>{event?.title}</span>
          </>
        ) : (
          <span>{pageName}</span>
        )}
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="relative hidden w-100 md:block">
          <label className="flex h-10 items-center gap-2 rounded-sm border border-slate-200 bg-slate-50 px-3 text-body text-slate-500">
            <Search size={14} />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="h-auto w-full rounded-none border-0 bg-transparent px-0 text-body outline-none placeholder:text-slate-400 focus:ring-0"
              placeholder="Search events..."
              aria-label="Search events"
            />
          </label>
          {showSearchResults && (
            <div className="absolute right-0 top-8 z-20 min-h-32 w-full overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
              {isEventsLoading ? (
                <div className="flex min-h-32 w-full items-center justify-center">
                  <Loader className="size-8" />
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="divide-y divide-slate-100">
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        to={`/events/${result.id}`}
                        onClick={() => setSearchQuery('')}
                        className="block px-3 py-2 transition hover:bg-slate-50"
                      >
                        <span className="block truncate text-ui-sm font-semibold text-slate-700">
                          {result.title}
                        </span>
                        <span className="mt-0.5 block truncate text-caption text-slate-400">
                          {formatEventDate(result.date)} · {result.location}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    to={searchUrl}
                    onClick={() => setSearchQuery('')}
                    className="block border-t border-slate-100 px-3 py-2 text-center text-caption font-semibold text-accent hover:bg-slate-50"
                  >
                    See all results
                  </Link>
                </>
              ) : (
                <p className="px-3 py-4 text-caption text-slate-400">No events found.</p>
              )}
            </div>
          )}
        </div>
        {user.role !== 'guest' && (
          <button className="relative text-slate-500" aria-label="Notifications">
            <BellDot size={14} />
          </button>
        )}
        <label className="flex items-center gap-1.5 text-ui font-medium text-slate-600">
          <span>{roleLabels[user.role]}</span>
          <Select
            value={user.role}
            onChange={(event) => setRole(event.target.value as UserRole)}
            aria-label="Select user role"
            className="h-auto max-w-[18px] cursor-pointer rounded-none border-0 bg-transparent px-0 text-ui text-slate-600 outline-none focus:ring-0"
          >
            <option value="guest">Guest</option>
            <option value="member">Participant</option>
            <option value="admin">Administrator</option>
          </Select>
        </label>
        <div className="flex items-center gap-x-2 border-l border-slate-200 pl-4">
          <div className="text-right leading-tight flex flex-col place-items-center justify-center">
            <p className="text-ui font-semibold text-slate-700">
              {[user.firstName, user.lastName].filter(Boolean).join(' ')}
            </p>
            <p className="text-ui-sm text-slate-600">
              {user.role === 'guest' ? (
                <>
                  <Link
                    to="/sign-in"
                    className="font-medium text-accent decoration-dotted underline-offset-2 transition hover:text-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    Sign in
                  </Link>{' '}
                  to join events
                </>
              ) : (
                user.email
              )}
            </p>
          </div>
          <div className="grid size-10 place-items-center rounded-full bg-slate-900 text-overline font-bold text-white text-lg">
            {getInitials(user.firstName, user.lastName)}
          </div>
        </div>
      </div>
    </header>
  );
}
