import type { PaginationParams } from '@/shared/types/pagination';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { assignUserPlan, fetchUsers, removeUserPlan, updateUser, type AssignPlanPayload } from './api';
import type { UpdateUserPayload } from './types';
import { toast } from 'sonner';
import { AUTH_QUERY_KEY } from '@/providers/AuthProvider';

const usersKeys = {
  all: ['users'] as const,
  list: (params: PaginationParams) => [...usersKeys.all, 'list', params] as const,
};

export function useUsers(params: PaginationParams) {
  return useQuery({
    queryKey: usersKeys.list(params),
    queryFn: () => fetchUsers(params),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateUserPayload }) => updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
      toast.success('Користувача оновлено');
    },
  });
}

export function useAssignPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, payload }: { userId: number; payload: AssignPlanPayload }) => assignUserPlan(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      toast.success('Subscription accepted');
    },
  });
}

export function useCancelPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => removeUserPlan(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      toast.success('Subscription was cancelled');
    },
  });
}
