import { zodResolver } from '@hookform/resolvers/zod';
import { Minus, Plus, Ticket } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../../authentication/model/useAuth';

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
    setValue('quantity', Math.max(1, nextValue), { shouldDirty: true });
  const onSubmit = async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 350));
  };
  if (user.role === 'guest')
    return (
      <section className="registration-card">
        <RegistrationHeader />
        <div className="registration-body">
          <p className="price">
            $499 <small>/ person</small>
          </p>
          <p className="early-bird">Sign in or sign up to join this event.</p>
          <Link to="/login" className="register-button flex items-center justify-center">
            Sign In to Join
          </Link>
          <p className="cancellation">Registration is available to registered participants.</p>
          <Included benefits={benefits} />
        </div>
      </section>
    );
  if (user.role === 'admin')
    return (
      <section className="registration-card">
        <RegistrationHeader />
        <div className="registration-body">
          <p className="price">Admin view</p>
          <p className="early-bird">Administrators can manage participants from the admin panel.</p>
          <Link to="/" className="register-button flex items-center justify-center">
            Open Admin Events
          </Link>
        </div>
      </section>
    );
  return (
    <section className="registration-card">
      <RegistrationHeader />
      <form className="registration-body" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('quantity', { valueAsNumber: true, min: 1 })} />
        <p className="price">
          $499 <small>/ person</small>
        </p>
        <p className="early-bird">Early bird pricing ends soon. Includes full access.</p>
        <div className="quantity">
          <b>Quantity</b>
          <div>
            <button
              type="button"
              onClick={() => updateQuantity(quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus size={13} />
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>
        <button
          disabled={isSubmitting || isSubmitSuccessful}
          className="register-button disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitSuccessful
            ? 'Registration Complete'
            : isSubmitting
              ? 'Registering...'
              : 'Register Now'}
        </button>
        <p className="cancellation">No cancellation fees up to 14 days before.</p>
      </form>
    </section>
  );
}

function RegistrationHeader() {
  return (
    <div className="registration-head">
      <b>Registration</b>
      <span>
        Ends in <strong>2d 14h</strong>
      </span>
    </div>
  );
}
function Included({ benefits }: { benefits: string[] | undefined }) {
  return (
    <div className="included">
      <b>
        <Ticket size={14} /> What's Included
      </b>
      <ul>
        {benefits?.map((i) => {
          return <li key={i}>{i}</li>;
        })}
      </ul>
    </div>
  );
}
