import type { BackendRole } from '../../entities/user/types';

export interface NavItem {
  label: string;
  path: string;
  roles?: BackendRole[];
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/app' },
  { label: 'Plans', path: '/app/plans', roles: ['ADMIN'] },
  { label: 'Integrations', path: '/app/integrations', roles: ['ADMIN'] },
  { label: 'Users', path: '/app/users', roles: ['ADMIN'] },
  { label: 'My subscription', path: '/app/subscription', roles: ['USER'] },
];
