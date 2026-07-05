import z from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email required').email('incorrect email'),
  password: z.string().min(6, 'Min 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
