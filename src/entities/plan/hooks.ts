import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPlans, fetchPlanById, createPlan, updatePlan, deletePlan } from './api';
import type { PaginationParams } from '../../shared/types/pagination';
import type { CreatePlanPayload, UpdatePlanPayload } from './types';
import { toast } from 'sonner';

const plansKeys = {
  all: ['plans'] as const,
  list: (params: PaginationParams) => [...plansKeys.all, 'list', params] as const,
  detail: (id: number) => [...plansKeys.all, 'detail', id] as const,
};

export function usePlans(params: PaginationParams) {
  return useQuery({
    queryKey: plansKeys.list(params),
    queryFn: () => fetchPlans(params),
  });
}

export function usePlan(id: number) {
  return useQuery({
    queryKey: plansKeys.detail(id),
    queryFn: () => fetchPlanById(id),
    enabled: !!id,
  });
}

export function useCreatePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePlanPayload) => createPlan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plansKeys.all });
      toast.success('Plan created');
    },
  });
}

export function useUpdatePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePlanPayload }) => updatePlan(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plansKeys.all });
      toast.success('Plan updated');
    },
  });
}

export function useDeletePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plansKeys.all });
      toast.success('Plan removed');
    },
  });
}
