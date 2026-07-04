import { apiClient } from '../../shared/lib/apiClient';
import type { AuthUser } from './types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

export function loginRequest(payload: LoginPayload) {
  return apiClient.post<LoginResponse>('/auth/login', payload).then((res) => res.data);
}

export function fetchProfile() {
  return apiClient.get<AuthUser>('/auth/profile').then((res) => res.data);
}
