import { useIsFetching } from '@tanstack/react-query';
import { useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router';

export function Topbar() {
  const { user, logout } = useAuth();
  const isFetching = useIsFetching();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 px-6">
      <div className="h-0.5 w-full max-w-24">{isFetching > 0 && <div className="h-0.5 animate-pulse rounded bg-gray-900" />}</div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          {user?.firstName} {user?.lastName} · {user?.role}
        </span>
        <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-gray-900">
          Logout
        </button>
      </div>
    </header>
  );
}
