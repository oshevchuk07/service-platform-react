import type { PaginatedResponse, PaginationParams } from '@/shared/types/pagination';
import { apiClient } from '../../shared/lib/apiClient';
import type { AuthUser, UpdateUserPayload, UserListItem } from './types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

export interface AssignPlanPayload {
  planId: number;
  paymentType?: 'MONTHLY' | 'YEARLY';
}

export function loginRequest(payload: LoginPayload) {
  return apiClient.post<LoginResponse>('/auth/login', payload).then((res) => res.data);
}

export function fetchProfile() {
  return apiClient.get<AuthUser>('/auth/profile').then((res) => res.data);
}

export function fetchUsers(params: PaginationParams) {
  return apiClient.get<PaginatedResponse<UserListItem>>('/users', { params }).then((res) => res.data);
}

export function updateUser(id: number, payload: UpdateUserPayload) {
  return apiClient.put<UserListItem>(`/users/${id}`, payload).then((res) => res.data);
}

export function fetchUserById(id: number) {
  return apiClient.get<UserListItem>(`/users/${id}`).then((res) => res.data);
}

export function removeUser(id: number) {
  return apiClient.delete<void>(`/users/${id}`).then((res) => res.data);
}

export function assignUserPlan(id: number, payload: AssignPlanPayload) {
  return apiClient.put<UserListItem>(`/users/${id}/plan`, payload).then((res) => res.data);
}

export function removeUserPlan(id: number) {
  return apiClient.delete<void>(`/users/${id}/plan`).then((res) => res.data);
}
