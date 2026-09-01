import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import { submitAuthForm } from '@/features/authentication/helpers/submitAuthForm';
import { useAuth } from '@/features/authentication/model/useAuth';
import {
  accountRegistrationSchema,
  authSchema,
  type AuthFormValues,
} from '@/features/authentication/model/authSchema';

type Mode = 'login' | 'register';

export function useAuthForm(mode: Mode) {
  const { setRole } = useAuth();
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(
      mode === 'register' ? accountRegistrationSchema : authSchema,
    ) as unknown as Resolver<AuthFormValues>,
    defaultValues: {
      email: '',
      password: '',
      keepSignedIn: false,
      firstName: '',
      lastName: '',
      phone: '',
    },
  });
  const onSubmit = async (values: AuthFormValues) => {
    await submitAuthForm(values);
    setRole('member');
  };
  return { ...form, onSubmit };
}
