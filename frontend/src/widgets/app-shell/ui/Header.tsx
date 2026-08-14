import { BellDot, ChevronRight, Home, Search } from 'lucide-react';
import { useAuth } from '../../../features/authentication/model/useAuth';
import type { UserRole } from '../../../entities/user/model/types';
import getInitials from '../../../helpers/getInitials';
import { Link, useLocation } from 'react-router-dom';
import { useEventQuery } from '../../../entities/event/api/queries';
const roleLabels: Record<UserRole, string> = {
  guest: 'Guest',
  member: 'Participant',
  admin: 'Administrator',
};

export function Header() {
  const { user, setRole } = useAuth();
  const { pathname } = useLocation();

  const eventId = pathname.startsWith('/events/') ? Number(pathname.split('/')[2]) : NaN;

  const { data: event } = useEventQuery(eventId);

  const isEventDetails = Number.isFinite(eventId);

  const pageName = pathname === '/' ? 'Events' : pathname.split('/').filter(Boolean).pop();
  return (
    <header className="flex h-11 items-center border-b border-slate-200 px-5">
      <div className="flex items-center gap-2 text-[10px] text-slate-500">
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
        <label className="hidden h-6 w-[150px] items-center gap-1.5 rounded-sm bg-slate-50 px-2 text-[9px] text-slate-400 md:flex">
          <Search size={10} />
          <input
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
            placeholder="Search events..."
          />
        </label>
        {user.role !== 'guest' && (
          <button className="relative text-slate-500" aria-label="Notifications">
            <BellDot size={14} />
            {/*  <span className="absolute -right-0.5 top-0 size-1 rounded-full bg-red-500" /> */}{' '}
          </button>
        )}
        <label className="role-switch">
          <span>{roleLabels[user.role]}</span>
          <select
            value={user.role}
            onChange={(event) => setRole(event.target.value as UserRole)}
            aria-label="Select user role"
          >
            <option value="guest">Guest</option>
            <option value="member">Participant</option>
            <option value="admin">Administrator</option>
          </select>
        </label>
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <div className="text-right leading-tight">
            <p className="text-[10px] font-semibold text-slate-700">
              {[user.firstName, user.lastName].filter(Boolean).join(' ')}
            </p>
            <p className="text-[9px] text-slate-400">{user.email}</p>
          </div>
          <div className="grid size-6 place-items-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
            {getInitials(user.firstName, user.lastName)}
          </div>
        </div>
      </div>
    </header>
  );
}
