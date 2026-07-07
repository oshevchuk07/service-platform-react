import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginFormValues } from './loginSchema';
import { loginRequest } from '../../../entities/user/api';
import { setAccessToken } from '../../../shared/lib/tokenStorage';
import { AUTH_QUERY_KEY } from '../../../providers/AuthProvider';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: LoginFormValues) => loginRequest(values),
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      queryClient.setQueryData(AUTH_QUERY_KEY, data.user);
      navigate('/app');
    },
  });
}
