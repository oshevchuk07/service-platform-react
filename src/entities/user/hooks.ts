import type { PaginationParams } from '@/shared/types/pagination';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, updateUser } from './api';
import type { UpdateUserPayload } from './types';
import { toast } from 'sonner';

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
