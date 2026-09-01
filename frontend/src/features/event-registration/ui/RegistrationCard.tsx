import { zodResolver } from '@hookform/resolvers/zod';
import { Ticket } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '@/features/authentication/model/useAuth';
import { QuantityField } from '@/shared/ui/QuantityField';

type RegistrationValues = { quantity: number };
const registrationSchema = z.object({ quantity: z.number().int().min(1) });

export function RegistrationCard({ benefits }: { benefits: string[] | undefined }) {
  const { user } = useAuth();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<RegistrationValues>({
    defaultValues: { quantity: 1 },
    resolver: zodResolver(registrationSchema),
  });
  const quantity = watch('quantity');
  const updateQuantity = (nextValue: number) =>
    setValue('quantity', nextValue, { shouldDirty: true, shouldValidate: true });
  const onSubmit = async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 350));
  };
  const registrationLabel = isSubmitSuccessful
    ? 'Registration Complete'
    : isSubmitting
      ? 'Registering...'
      : 'Register Now';
  if (user.role === 'guest')
    return (
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <RegistrationHeader />
        <div className="p-[17px_18px]">
          <p className="m-0 text-price font-extrabold tracking-[-0.04em] text-slate-800">
            $499 <small className="text-caption font-semibold text-slate-400">/ person</small>
          </p>
          <p className="mt-1 text-caption text-slate-400">Sign in or sign up to join this event.</p>
          <Link
            to="/sign-in"
            className="mt-4 flex h-9.75 w-full items-center justify-center rounded-md bg-primary text-caption font-bold text-white transition hover:bg-primary-hover"
          >
            Sign In to Join
          </Link>
          <p className="mt-3.25 mb-4.75 text-center text-overline text-slate-400">
            Registration is available to registered participants.
          </p>
          <Included benefits={benefits} />
        </div>
      </section>
    );
  if (user.role === 'admin')
    return (
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <RegistrationHeader />
        <div className="p-[17px_18px]">
          <p className="m-0 text-price font-extrabold tracking-[-0.04em] text-slate-800">
            Admin view
          </p>
          <p className="mt-1 text-caption text-slate-400">
            Administrators can manage participants from the admin panel.
          </p>
          <Link
            to="/"
            className="mt-4 flex h-9.75 w-full items-center justify-center rounded-md bg-primary text-caption font-bold text-white transition hover:bg-primary-hover"
          >
            Open Admin Events
          </Link>
        </div>
      </section>
    );
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <RegistrationHeader />
      <form className="p-[17px_18px]" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('quantity', { valueAsNumber: true, min: 1 })} />
        <p className="m-0 text-price font-extrabold tracking-[-0.04em] text-slate-800">
          $499 <small className="text-caption font-semibold text-slate-400">/ person</small>
        </p>
        <p className="mt-1 text-caption text-slate-400">
          Early bird pricing ends soon. Includes full access.
        </p>
        <div className="mt-5 flex items-center justify-between rounded-md border border-slate-200 bg-white px-2.5 py-2.25 text-ui text-slate-600">
          <b className="font-semibold">Quantity</b>
          <QuantityField value={quantity} onChange={updateQuantity} />
        </div>
        <button
          disabled={isSubmitting || isSubmitSuccessful}
          type="submit"
          className="mt-4 flex h-9.75 w-full items-center justify-center rounded-md bg-primary text-caption font-bold text-white transition hover:bg-primary-hover disabled:cursor-wait disabled:opacity-70"
        >
          {registrationLabel}
        </button>
        <p className="mt-3.25 mb-4.75 text-center text-overline text-slate-400">
          No cancellation fees up to 14 days before.
        </p>
      </form>
    </section>
  );
}

function RegistrationHeader() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-4.5 py-4 text-caption font-bold uppercase tracking-[0.08em] text-slate-600">
      <b>Registration</b>
      <span className="text-slate-400 normal-case">
        Ends in <strong className="text-danger-soft">2d 14h</strong>
      </span>
    </div>
  );
}
function Included({ benefits }: { benefits: string[] | undefined }) {
  return (
    <div className="border-t border-slate-200 pt-4.25">
      <b className="flex items-center gap-2 text-ui font-semibold text-slate-600">
        <Ticket size={14} /> What's Included
      </b>
      <ul className="mt-3 grid gap-2 p-0 text-ui text-slate-500">
        {benefits?.map((i) => {
          return (
            <li key={i} className="before:mr-2 before:text-primary before:content-['•']">
              {i}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
