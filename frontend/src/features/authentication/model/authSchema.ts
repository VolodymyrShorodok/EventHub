import { z } from 'zod';

export const authSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must contain at least 8 characters.'),
  keepSignedIn: z.boolean(),
});

export const accountRegistrationSchema = authSchema
  .extend({
    firstName: z.string().trim().min(2, 'Enter your first name.'),
    lastName: z.string().trim().min(2, 'Enter your last name.'),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9 ()-]{10,20}$/, 'Enter a valid phone number.'),
    confirmPassword: z.string().min(1, 'Repeat your password.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type AuthFormValues = z.infer<typeof accountRegistrationSchema>;
