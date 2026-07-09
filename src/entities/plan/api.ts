import { apiClient } from '../../shared/lib/apiClient';
import type { PaginatedResponse, PaginationParams } from '../../shared/types/pagination';
import type { Plan, CreatePlanPayload, UpdatePlanPayload } from './types';

export function fetchPlans(params: PaginationParams) {
  return apiClient.get<PaginatedResponse<Plan>>('/plans', { params }).then((res) => res.data);
}

export function fetchPlanById(id: number) {
  return apiClient.get<Plan>(`/plans/${id}`).then((res) => res.data);
}

export function createPlan(payload: CreatePlanPayload) {
  return apiClient.post<Plan>('/plans', payload).then((res) => res.data);
}

export function updatePlan(id: number, payload: UpdatePlanPayload) {
  return apiClient.put<Plan>(`/plans/${id}`, payload).then((res) => res.data);
}

export function deletePlan(id: number) {
  return apiClient.delete<void>(`/plans/${id}`).then((res) => res.data);
}

export function replacePlanIntegrations(planId: number, integrationIds: number[]) {
  return apiClient.put<void>('/plans/integrations', { planId, integrationIds }).then((res) => res.data);
}
