import type { Plan } from './types';

export function getSelectedIntegrationIds(plan: Plan): number[] {
  return Object.values(plan.features)
    .flat()
    .map((integration) => integration.id);
}
