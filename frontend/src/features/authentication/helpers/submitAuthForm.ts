import type { AuthFormValues, AuthField } from '@/features/authentication/types';
import type { CurrentUser } from '@/entities/user/types';

type Mode = 'login' | 'register';

type AuthResponse = {
  accessToken: string;
  user: CurrentUser;
};

export class AuthRequestError extends Error {
  constructor(
    message: string,
    public readonly field?: AuthField,
  ) {
    super(message);
  }
}

const apiUrl = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export async function submitAuthForm(mode: Mode, values: AuthFormValues): Promise<AuthResponse> {
  const payload =
    mode === 'register'
      ? {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
          password: values.password,
          keepSignedIn: values.keepSignedIn,
        }
      : {
          email: values.email,
          password: values.password,
          keepSignedIn: values.keepSignedIn,
        };

  let response: Response;
  try {
    response = await fetch(`${apiUrl}/auth/${mode === 'register' ? 'register' : 'login'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new AuthRequestError('Unable to connect to the server. Please try again.');
  }

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const error = getError(body, 'Unable to sign in. Please try again.');
    throw new AuthRequestError(error.message, error.field);
  }
  if (!isAuthResponse(body)) {
    throw new AuthRequestError('The server returned an invalid authentication response.');
  }

  return body;
}

function getError(body: unknown, fallback: string): { message: string; field?: AuthField } {
  if (!body || typeof body !== 'object' || !('message' in body)) return { message: fallback };

  const response = body as { message?: unknown; field?: unknown };
  const message = Array.isArray(response.message)
    ? response.message[0] || fallback
    : typeof response.message === 'string'
      ? response.message
      : fallback;
  const field = isAuthField(response.field) ? response.field : undefined;
  return { message, field };
}

function isAuthField(field: unknown): field is AuthField {
  return ['firstName', 'lastName', 'phone', 'email', 'password'].includes(field as string);
}

function isAuthResponse(body: unknown): body is AuthResponse {
  if (!body || typeof body !== 'object') return false;

  const response = body as Partial<AuthResponse>;
  return typeof response.accessToken === 'string' && Boolean(response.user);
}
