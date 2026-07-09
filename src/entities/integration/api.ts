import { apiClient } from '../../shared/lib/apiClient';
import type { PaginatedResponse, PaginationParams } from '../../shared/types/pagination';
import type { Integration, IntegrationGroupWithItems } from './types';

export function fetchIntegrationGroups(params: PaginationParams) {
  return apiClient.get<PaginatedResponse<IntegrationGroupWithItems>>('/integrations/groups', { params }).then((res) => res.data);
}

export function fetchIntegrations(params: PaginationParams) {
  return apiClient.get<PaginatedResponse<Integration>>('/integrations', { params }).then((res) => res.data);
}
