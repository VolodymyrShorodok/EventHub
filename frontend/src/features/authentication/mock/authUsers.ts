import type { CurrentUser, UserRole } from '@/entities/user/model/types';

export const authUsers: Record<UserRole, CurrentUser> = {
  guest: {
    role: 'guest',
    firstName: 'Guest',
    email: '',
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
};
