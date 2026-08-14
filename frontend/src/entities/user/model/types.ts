export type UserRole = 'guest' | 'member' | 'admin';

export type CurrentUser = {
  role: UserRole;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
};
