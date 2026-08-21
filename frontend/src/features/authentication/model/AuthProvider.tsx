import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import type { UserRole } from '@/entities/user/model/types';
import { AuthContext, authUsers } from '@/features/authentication/model/authContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('guest');
  const value = useMemo(() => ({ user: authUsers[role], setRole }), [role]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
