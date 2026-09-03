import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { CurrentUser } from '@/entities/user/types';
import { AuthContext } from '@/features/authentication/model/authContext';
const sessionKey = 'eventhub.auth';
const guestUser: CurrentUser = { role: 'guest', firstName: 'Guest', email: '', phone: '' };
type StoredSession = { accessToken: string; user: CurrentUser };
function getInitialSession(): StoredSession | null {
  for (const storage of [sessionStorage, localStorage]) {
    const savedSession = storage.getItem(sessionKey);
    if (!savedSession) continue;
    try {
      const session = JSON.parse(savedSession) as StoredSession;
      if (typeof session.accessToken === 'string' && session.user?.role !== 'guest') {
        return session;
      }
    } catch {
      storage.removeItem(sessionKey);
    }
  }
  return null;
}
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<StoredSession | null>(getInitialSession);
  const authenticate = useCallback((nextSession: StoredSession, keepSignedIn: boolean) => {
    const activeStorage = keepSignedIn ? localStorage : sessionStorage;
    const inactiveStorage = keepSignedIn ? sessionStorage : localStorage;
    activeStorage.setItem(sessionKey, JSON.stringify(nextSession));
    inactiveStorage.removeItem(sessionKey);
    setSession(nextSession);
  }, []);
  const signOut = useCallback(() => {
    localStorage.removeItem(sessionKey);
    sessionStorage.removeItem(sessionKey);
    setSession(null);
  }, []);
  const value = useMemo(
    () => ({
      user: session?.user ?? guestUser,
      accessToken: session?.accessToken ?? null,
      authenticate,
      signOut,
    }),
    [authenticate, session, signOut],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
