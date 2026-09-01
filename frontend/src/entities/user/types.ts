export type UserRole = 'guest' | 'member' | 'admin';

export type CurrentUser = {
  id?: number;
  role: UserRole;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
};
