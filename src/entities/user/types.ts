export type UserRole = 'ADMIN' | 'CLIENT';

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
}
