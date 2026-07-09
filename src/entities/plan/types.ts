export interface CreatePlanPayload {
  name: string;
  description?: string;
  subtitle?: string;
  isActive?: boolean;
  isPopular?: boolean;
  monthlyPrice?: number;
  yearlyPrice?: number;
  oldMonthlyPrice?: number;
  oldYearlyPrice?: number;
}

export type UpdatePlanPayload = Partial<CreatePlanPayload>;

export interface PlanIntegrationItem {
  id: number;
  name: string;
  url: string | null;
  logoImage: string | null;
  isActive: boolean;
}

export type PlanFeatures = Record<string, PlanIntegrationItem[]>;

export interface Plan {
  id: number;
  name: string;
  description: string | null;
  subtitle: string | null;
  isActive: boolean;
  isPopular: boolean;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  oldMonthlyPrice: number | null;
  oldYearlyPrice: number | null;
  createdAt: string;
  updatedAt: string;
  features: PlanFeatures;
}
