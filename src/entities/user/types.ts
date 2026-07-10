import type { Plan } from '../plan/types';

export type BackendRole = 'ADMIN' | 'USER';

export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: BackendRole;
  isActive: boolean;
  avatar: string | null;
  planId: number | null;
  plan?: Plan | null;
}

export interface UserListItem {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: BackendRole;
  planId: number | null;
  paymentType: string;
}

export interface UpdateUserPayload {
  email?: string;
  firstName?: string;
  lastName?: string;
  planId?: number;
}
