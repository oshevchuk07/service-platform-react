import type { Plan } from '@/entities/plan/types';
import { planEditorSchema, type PlanEditorFormValues } from './planEditorSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePlan, useUpdatePlan } from '@/entities/plan/hooks';
import { useEffect } from 'react';

const emptyDefaults: PlanEditorFormValues = {
  name: '',
  subtitle: '',
  description: '',
  monthlyPrice: undefined,
  yearlyPrice: undefined,
  isActive: true,
  isPopular: false,
};

export function usePlanEditor(plan: Plan | null, onSuccess: () => void) {
  const form = useForm<PlanEditorFormValues>({
    resolver: zodResolver(planEditorSchema),
    defaultValues: emptyDefaults,
  });

  const createPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();

  const isPending = createPlan.isPending || updatePlan.isPending;

  useEffect(() => {
    form.reset(
      plan
        ? {
            name: plan.name,
            subtitle: plan.subtitle ?? '',
            description: plan.description ?? '',
            monthlyPrice: plan.monthlyPrice ?? undefined,
            yearlyPrice: plan.yearlyPrice ?? undefined,
            isActive: plan.isActive,
            isPopular: plan.isPopular,
          }
        : emptyDefaults,
    );
  }, [plan, form]);

  const onSubmit = form.handleSubmit((values) => {
    const action = plan ? updatePlan.mutateAsync({ id: plan.id, payload: values }) : createPlan.mutateAsync(values);
    action.then(onSuccess);
  });

  return { form, onSubmit, isPending };
}
