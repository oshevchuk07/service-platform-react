import z from 'zod';

export const planEditorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  monthlyPrice: z.coerce.number().min(0, 'Price must be >= 0').optional(),
  yearlyPrice: z.coerce.number().min(0, 'Price must be >= 0').optional(),
  isActive: z.boolean(),
  isPopular: z.boolean(),
});

export type PlanEditorFormValues = z.infer<typeof planEditorSchema>;
