import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import { AuthRequestError, submitAuthForm } from '@/features/authentication/helpers/submitAuthForm';
import { useAuth } from '@/features/authentication/model/useAuth';
import { useEffect } from 'react';

import {
  accountRegistrationSchema,
  authSchema,
  type AuthFormValues,
} from '@/features/authentication/model/authSchema';

type Mode = 'login' | 'register';

export function useAuthForm(mode: Mode) {
  const { authenticate } = useAuth();
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
      confirmPassword: '',
    },
  });
  const { reset } = form;

  useEffect(() => {
    reset();
  }, [mode, reset]);

  const onSubmit = async (values: AuthFormValues) => {
    form.clearErrors();

    try {
      const session = await submitAuthForm(mode, values);
      authenticate(session, values.keepSignedIn);
    } catch (error) {
      if (error instanceof AuthRequestError && error.field) {
        form.setError(error.field, { message: error.message });
        return;
      }

      form.setError('root', {
        message:
          error instanceof AuthRequestError
            ? error.message
            : 'Unable to sign in. Please try again.',
      });
    }
  };
  return { ...form, onSubmit };
}
