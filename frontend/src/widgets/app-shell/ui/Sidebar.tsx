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
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useAuth } from '@/features/authentication/model/useAuth';
import { Brand } from '@/widgets/app-shell/ui/Brand';
import { Button } from '@/shared/ui/Button';

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
  const { user, signOut } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isSignInPage = pathname === '/sign-in';
  const items = [
    ...baseItems,
    ...(user.role !== 'guest' ? memberItems : []),
    ...(user.role === 'admin' ? adminItems : []),
  ];
  return (
    <aside className="sticky top-0 flex h-screen w-[240px] shrink-0 self-start flex-col overflow-hidden border-r border-slate-200 bg-surface-sidebar px-4 py-4">
      <Brand />
      <nav className="mt-5 space-y-1">
        {items.map(([label, to, Icon]) => (
          <NavLink
            key={label}
            to={to}
            end={to === '/'}
            className={({ isActive }) => {
              const isSelected = to !== '#' && isActive;

              return clsx(
                'flex h-10 items-center gap-2 rounded-md px-3 text-ui transition',
                isSelected
                  ? 'bg-surface-active font-medium text-text-active shadow-[0_0_12px_rgba(37,139,228,0.22)]'
                  : 'text-slate-600 hover:bg-white hover:text-accent hover:shadow-sm',
              );
            }}
          >
            <Icon size={15} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto">
        {user.role !== 'guest' && (
          <a
            href="#"
            className="flex h-10 items-center gap-2 rounded-md px-3 text-ui text-slate-600 transition hover:bg-white hover:text-accent hover:shadow-sm"
          >
            <Settings size={15} /> Settings
          </a>
        )}
        {user.role !== 'guest' ? (
          <button
            type="button"
            className="relative mt-2 flex h-11 w-full items-center justify-center rounded-md bg-primary px-3 text-ui font-semibold text-white shadow-sm transition hover:bg-primary-hover hover:shadow-md аfocus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            onClick={signOut}
          >
            <LogOut className="absolute left-3" size={15} />
            <span>Sign Out</span>
          </button>
        ) : !isSignInPage ? (
          <Button
            type="button"
            onClick={() => navigate('/sign-in')}
            className="relative mt-2 h-11 w-full rounded-md bg-primary px-3 text-ui font-semibold text-white shadow-sm hover:bg-primary-hover hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <LogIn className="absolute left-3" size={15} />
            <span>Sign In</span>
          </Button>
        ) : null}
      </div>
    </aside>
  );
}
