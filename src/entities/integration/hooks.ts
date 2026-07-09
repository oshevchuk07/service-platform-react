import { useQuery } from '@tanstack/react-query';
import { fetchIntegrationGroups } from './api';

const integrationsKeys = {
  all: ['integrations'] as const,
  groups: ['fetchIntegrations', 'groups'] as const,
};

export function useIntegrationGroups() {
  return useQuery({
    queryKey: integrationsKeys.groups,
    queryFn: () => fetchIntegrationGroups({ page: 1, limit: 100 }),
    staleTime: 30_000,
  });
}
