import type { AuthFormValues as _AuthFormValues } from '@/features/authentication/model/authSchema';
import type { CurrentUser } from '@/entities/user/types';

export type AuthFormValues = _AuthFormValues;

export type AuthField = Exclude<keyof AuthFormValues, 'keepSignedIn' | 'confirmPassword'>;

export type AuthContextValue = {
  user: CurrentUser;
  accessToken: string | null;
  authenticate: (
    session: { accessToken: string; user: CurrentUser },
    keepSignedIn: boolean,
  ) => void;
  signOut: () => void;
};
