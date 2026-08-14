import {
  Bookmark,
  CalendarDays,
  LayoutDashboard,
  LogIn,
  LogOut,
  Search,
  Settings,
  Users,
} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../../features/authentication/model/useAuth';
import { Brand } from './Brand';

const baseItems = [['Events Discovery', '/', Search]] as const;
const memberItems = [
  ['Saved Events', '#', Bookmark],
  ['My Dashboard', '#', LayoutDashboard],
] as const;
const adminItems = [
  ['Admin Overview', '#', LayoutDashboard],
  ['Event Management', '#', CalendarDays],
  ['Participants', '#', Users],
] as const;

export function Sidebar() {
  const { user, setRole } = useAuth();
  const items = [
    ...baseItems,
    ...(user.role !== 'guest' ? memberItems : []),
    ...(user.role === 'admin' ? adminItems : []),
  ];
  return (
    <aside className="flex w-[240px] shrink-0 flex-col border-r border-slate-200 bg-[#f8fafc] px-4 py-4">
      <Brand />
      <nav className="mt-2 space-y-1">
        {items.map(([label, to, Icon]) => (
          <NavLink
            key={label}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex h-8 items-center gap-2 rounded-md px-2 text-[11px] transition ${isActive ? 'bg-[#eff6ff] font-medium text-[#1976d2]' : 'text-slate-600 hover:bg-slate-100'}`
            }
          >
            <Icon size={12} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t border-slate-200 pt-3">
        {user.role !== 'guest' && (
          <a href="#" className="sidebar-bottom-link">
            <Settings size={12} /> Settings
          </a>
        )}
        {user.role === 'guest' ? (
          <Link to="/Sign-in" className="sidebar-bottom-link">
            <LogIn size={12} /> Sign In
          </Link>
        ) : (
          <button className="sidebar-bottom-link w-full" onClick={() => setRole('guest')}>
            <LogOut size={12} /> Sign Out
          </button>
        )}
      </div>
    </aside>
  );
}
