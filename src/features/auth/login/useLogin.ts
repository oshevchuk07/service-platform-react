import { useNavigate } from 'react-router';
import { useAuth } from '../../../providers/AuthProvider';
import { useMutation } from '@tanstack/react-query';
import type { LoginFormValues } from './loginSchema';
import { loginRequest } from '../../../entities/user/api';
import { setAccessToken } from '../../../shared/lib/tokenStorage';

export function useLogin() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: LoginFormValues) => loginRequest(values),
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      setUser(data.user);
      navigate('/app');
    },
  });
}
