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
}

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
