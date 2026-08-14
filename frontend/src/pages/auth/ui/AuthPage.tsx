import { CalendarDays, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../features/authentication/model/useAuth';
import { AuthForm } from '../../../features/authentication/ui/AuthForm';
import { AppContainer } from '../../../widgets/app-shell/ui/AppContainer';

export function AuthPage() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(
    pathname === '/register' ? 'register' : 'login',
  );

  if (user.role !== 'guest') return <Navigate to="/" replace />;

  return (
    <AppContainer>
      <main className="auth-layout grid gap-12 px-10 py-10 lg:grid-cols-2 lg:px-16">
        <section className="auth-panel auth-form-panel mx-auto w-full max-w-[430px]">
          <h1 className="text-[20px] font-bold text-slate-800">Welcome to Event Hub</h1>
          <p className="mt-1 text-[9px] leading-4 text-slate-500">
            Sign in to manage your registrations or create a new account to start exploring.
          </p>
          <div className="mt-5 grid grid-cols-2 bg-slate-100 p-1">
            <button
              onClick={() => setMode('login')}
              className={`auth-tab ${mode === 'login' ? 'auth-tab--active' : ''}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`auth-tab ${mode === 'register' ? 'auth-tab--active' : ''}`}
            >
              Sign Up
            </button>
          </div>
          <AuthForm mode={mode} />
          <div className="my-4 flex items-center gap-2 text-slate-400" style={{ fontSize: '8px' }}>
            <span className="h-px flex-1 bg-slate-200" />
            OR CONTINUE WITH
            <span className="h-px flex-1 bg-slate-200" />
          </div>
        </section>

        <section className="auth-panel auth-brand-panel mx-auto hidden w-full max-w-[430px] lg:flex">
          <div className="illustration">
            <div className="orb orb--one" />
            <div className="orb orb--two" />
            <div className="orb orb--three" />
            <div className="orbit" />
            <Sparkles className="relative z-10 text-[#267ee6]" size={46} fill="#8fc5ff" />
          </div>
          <h2 className="mt-5 text-center text-[15px] font-bold text-slate-800">
            Connect with your Community
          </h2>
          <p className="mx-auto mt-1 max-w-[300px] text-center text-[9px] leading-4 text-slate-500">
            Event Hub helps you discover the most exciting conferences, workshops, and meetups
            happening in your industry. Join thousands of organizers and attendees today.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="benefit">
              <CalendarDays size={13} />
              <span>
                <b>Verified Events</b>
                <small>Only high quality sessions</small>
              </span>
            </div>
            <div className="benefit">
              <Users size={13} />
              <span>
                <b>Global Reach</b>
                <small>Connect with real folks</small>
              </span>
            </div>
          </div>
        </section>
      </main>
    </AppContainer>
  );
}
