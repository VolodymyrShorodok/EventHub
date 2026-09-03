import { ChevronRight, Eye, EyeOff, Mail } from 'lucide-react';
import { useState } from 'react';
import { useAuthForm } from '@/features/authentication/model/useAuthForm';
import { Button } from '@/shared/ui/Button';
import { CheckboxField } from '@/shared/ui/CheckboxField';
import { InputField } from '@/shared/ui/InputField';

type Props = { mode: 'login' | 'register' };

export function AuthForm({ mode }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const {
    register,
    handleSubmit,
    onSubmit,
    formState: { errors, isSubmitting },
  } = useAuthForm(mode);
  const submitLabel = isSubmitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Sign Up';

  return (
    <form className="mt-5 space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>
      {mode === 'register' && (
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="First name"
            placeholder="Alex"
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <InputField
            label="Last name"
            placeholder="Morgan"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
          <InputField
            label="Phone number"
            type="tel"
            className="col-span-2 w-full"
            placeholder="+38(000) 111-22-33"
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>
      )}
      <InputField
        label="Email Address"
        type="email"
        placeholder="name@company.com"
        leading={<Mail size={15} />}
        error={errors.email?.message}
        {...register('email')}
      />
      <InputField
        label="Password"
        type={isPasswordVisible ? 'text' : 'password'}
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        placeholder="••••••••"
        error={errors.password?.message}
        trailing={
          <PasswordVisibilityButton
            isVisible={isPasswordVisible}
            onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
          />
        }
        {...register('password')}
      />
      {mode === 'register' && (
        <InputField
          label="Repeat password"
          type={isConfirmationVisible ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          trailing={
            <PasswordVisibilityButton
              isVisible={isConfirmationVisible}
              onClick={() => setIsConfirmationVisible((isVisible) => !isVisible)}
            />
          }
          {...register('confirmPassword')}
        />
      )}
      <div className="flex items-center justify-between text-caption">
        <CheckboxField label="Keep me signed in" {...register('keepSignedIn')} />
        <button type="button" className="text-accent">
          Forgot password?
        </button>
      </div>
      {errors.root?.message && (
        <p className="text-caption text-danger-soft" role="alert">
          {errors.root.message}
        </p>
      )}
      <Button
        disabled={isSubmitting}
        className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary text-ui font-medium text-white transition hover:bg-primary-hover disabled:cursor-wait disabled:opacity-70"
      >
        {submitLabel} <ChevronRight size={12} />
      </Button>
    </form>
  );
}

function PasswordVisibilityButton({
  isVisible,
  onClick,
}: {
  isVisible: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid size-6 shrink-0 place-items-center rounded text-slate-400 transition hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      aria-label={isVisible ? 'Hide password' : 'Show password'}
    >
      {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );
}
