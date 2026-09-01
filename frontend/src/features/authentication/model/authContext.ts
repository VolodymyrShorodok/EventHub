import { createContext } from 'react';
import type { CurrentUser, UserRole } from '@/entities/user/model/types';
export { authUsers } from '@/features/authentication/mock/authUsers';

/* Mock users live in the mock layer; this module only owns the context contract. */
/* export const authUsers: Record<UserRole, CurrentUser> = {
  guest: {
    role: 'guest',
    firstName: 'Guest',
    email: 'Sign in to join events',
    phone: '+380 000 111 22',
  },
  member: {
    role: 'member',
    firstName: 'Alex',
    lastName: 'Smith',
    email: 'alex@example.com',
    phone: '+380 000 333 44',
  },
  admin: {
    role: 'admin',
    firstName: 'Alex',
    lastName: 'Doe',
    email: 'admin@eventhub.io',
    phone: '+380 000 555 66',
  },
}; */

export type AuthContextValue = {
  user: CurrentUser;
  setRole: (role: UserRole) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
