import { NavLink } from 'react-router';
import { useAuth } from '../../providers/AuthProvider';
import { navItems } from './navConfig';

export function Sidebar() {
  const { user } = useAuth();

  const visibleItems = navItems.filter((item) => !item.roles || (user && item.roles.includes(user.role)));

  return (
    <nav className="flex flex-col gap-1 p-3">
      {visibleItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/app'}
          className={({ isActive }) =>
            `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
