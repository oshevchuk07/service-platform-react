export type BackendRole = 'ADMIN' | 'USER';

export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: BackendRole;
}

export interface UserListItem {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: BackendRole;
  planId: number | null;
}

export interface UpdateUserPayload {
  email?: string;
  firstName?: string;
  lastName?: string;
  planId?: number;
}
