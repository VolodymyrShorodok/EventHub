import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, CircleHelp, Mail, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { submitAuthForm } from '../helpers/submitAuthForm';
import { useAuth } from '../model/useAuth';
import { accountRegistrationSchema, authSchema, type AuthFormValues } from '../model/authSchema';

type Props = { mode: 'login' | 'register' };

export function AuthForm({ mode }: Props) {
  const { setRole } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(
      mode === 'register' ? accountRegistrationSchema : authSchema,
    ) as unknown as Resolver<AuthFormValues>,
    defaultValues: {
      email: '',
      password: '',
      keepSignedIn: true,
      firstName: '',
      lastName: '',
      phone: '',
    },
  });
  const onSubmit = async (values: AuthFormValues) => {
    await submitAuthForm(values);
    setRole('member');
  };

  return (
    <form className="mt-5 space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>
      {mode === 'register' && (
        <div className="grid grid-cols-2 gap-3">
          <label className="field-label">
            First name
            <div className="field">
              <input placeholder="Alex" {...register('firstName')} />
            </div>
            {errors.firstName && (
              <span className="mt-1 block text-[10px] font-normal text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </label>
          <label className="field-label">
            Last name
            <div className="field">
              <input placeholder="Morgan" {...register('lastName')} />
            </div>
            {errors.lastName && (
              <span className="mt-1 block text-[10px] font-normal text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </label>
          <label className="field-label col-span-2">
            Phone number
            <div className="field">
              <input type="tel" placeholder="+1 555 000 0000" {...register('phone')} />
            </div>
            {errors.phone && (
              <span className="mt-1 block text-[10px] font-normal text-red-500">
                {errors.phone.message}
              </span>
            )}
          </label>
        </div>
      )}
      <label className="field-label">
        Email Address
        <div className="field">
          <Mail size={11} />
          <input type="email" placeholder="name@company.com" {...register('email')} />
        </div>
        {errors.email && (
          <span className="mt-1 block text-[10px] font-normal text-red-500">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="field-label">
        Password
        <div className="field">
          <CircleHelp size={11} />
          <input type="password" placeholder="••••••••" {...register('password')} />
          <button type="button" aria-label="Show password">
            <Sparkles size={10} />
          </button>
        </div>
        {errors.password && (
          <span className="mt-1 block text-[10px] font-normal text-red-500">
            {errors.password.message}
          </span>
        )}
      </label>
      <div className="flex items-center justify-between text-[9px]">
        <label className="flex items-center gap-1.5 text-slate-500">
          <input
            type="checkbox"
            className="size-3 accent-[#3292e6]"
            {...register('keepSignedIn')}
          />{' '}
          Keep me signed in
        </label>
        <a href="#" className="text-[#258be4]">
          Forgot password?
        </a>
      </div>
      <button
        disabled={isSubmitting}
        className="mt-1 flex h-8 w-full items-center justify-center gap-2 bg-[#3292e6] text-[10px] font-medium text-white disabled:cursor-wait disabled:opacity-70"
      >
        {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Sign Up'}{' '}
        <ChevronRight size={12} />
      </button>
    </form>
  );
}
