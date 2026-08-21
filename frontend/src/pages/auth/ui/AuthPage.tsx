import { CalendarDays, Users } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/authentication/model/useAuth';
import { AuthForm } from '@/features/authentication/ui/AuthForm';
import { OrbitIllustration } from '@/pages/auth/ui/OrbitIllustration';

export function AuthPage() {
  const { user } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  if (user.role !== 'guest') return <Navigate to="/" replace />;

  return (
    <main className="grid min-h-full items-stretch gap-12 px-10 py-10 lg:grid-cols-2 lg:px-16">
      <section className="mx-auto flex w-full max-w-107.5 flex-col justify-center">
        <h1 className="text-heading-1 text-slate-800">Welcome to Event Hub</h1>
        <p className="mt-1 text-body-sm leading-6 text-slate-500">
          Sign in to manage your registrations or create a new account to start exploring.
        </p>
        <div className="mt-5 grid grid-cols-2 bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={clsx(
              'h-9 text-ui font-medium transition',
              mode === 'login' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500',
            )}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={clsx(
              'h-9 text-ui font-medium transition',
              mode === 'register' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500',
            )}
          >
            Sign Up
          </button>
        </div>
        <AuthForm key={mode} mode={mode} />
        <div className="my-4 flex items-center gap-2 text-micro font-medium uppercase tracking-[0.12em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          <span>Or continue with</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
      </section>

      <section className="mx-auto hidden w-full max-w-107.5 flex-col justify-center lg:flex">
        <OrbitIllustration />
        <h2 className="mt-5 text-center text-price font-bold tracking-[-0.03em] text-slate-800">
          Connect with your Community
        </h2>
        <p className="mx-auto mt-1 max-w-107.5 text-center text-heading-3 leading-7 text-slate-500">
          Event Hub helps you discover the most exciting conferences, workshops, and meetups
          happening in your industry. Join thousands of organizers and attendees today.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="flex gap-1.75 rounded-[5px] border border-surface-benefit bg-white p-3.75 text-accent">
            <CalendarDays size={21} />
            <span>
              <b className="block text-ui font-semibold text-slate-700">Verified Events</b>
              <small className="mt-px block text-ui-sm text-slate-400">
                Only high quality sessions
              </small>
            </span>
          </div>
          <div className="flex gap-1.75 rounded-[5px] border border-surface-benefit bg-white p-3.75 text-accent">
            <Users size={21} />
            <span>
              <b className="block text-ui font-semibold text-slate-700">Global Reach</b>
              <small className="mt-px block text-ui-sm text-slate-400">
                Connect with real folks
              </small>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
