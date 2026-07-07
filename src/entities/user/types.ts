export type BackendRole = 'ADMIN' | 'USER';

export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: BackendRole;
}
