import type { AuthFormValues } from '@/features/authentication/model/authSchema';

export async function submitAuthForm(values: AuthFormValues) {
  await new Promise((resolve) => window.setTimeout(() => resolve(values), 400));
}
