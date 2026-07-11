import { describe, expect, it } from 'vitest';
import type { Plan } from './types';
import { getSelectedIntegrationIds } from './utils';

const mockPlan: Plan = {
  id: 1,
  name: 'Pro',
  description: null,
  subtitle: null,
  isActive: true,
  isPopular: false,
  monthlyPrice: 100,
  yearlyPrice: 1000,
  oldMonthlyPrice: null,
  oldYearlyPrice: null,
  createdAt: '',
  updatedAt: '',
  features: {
    erp: [{ id: 1, name: 'SAP', url: null, logoImage: null, isActive: true }],
    marketplaces: [
      { id: 2, name: 'Shopify', url: null, logoImage: null, isActive: true },
      { id: 3, name: 'Amazon', url: null, logoImage: null, isActive: true },
    ],
  },
};

describe('getSelectedIntegrationsIds', () => {
  it('flattens integration ids from all feature group', () => {
    expect(getSelectedIntegrationIds(mockPlan)).toEqual([1, 2, 3]);
  });

  it('returns empty array when plan has no features', () => {
    expect(getSelectedIntegrationIds({ ...mockPlan, features: {} })).toEqual([]);
  });
});
