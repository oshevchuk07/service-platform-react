/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, type ReactNode } from 'react';
import type { AuthUser } from '../entities/user/types';
import { clearAuthTokens, getAccessToken } from '../shared/lib/tokenStorage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProfile } from '../entities/user/api';

export const AUTH_QUERY_KEY = ['auth-profile'] as const;

interface AuthContextValue {
  user: AuthUser | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const hasToken = !!getAccessToken();

  const { data, isLoading, isError } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: fetchProfile,
    enabled: hasToken,
    retry: false,
  });

  if (isError) {
    clearAuthTokens();
  }

  const user = isError ? null : (data ?? null);

  const logout = useCallback(() => {
    clearAuthTokens();
    queryClient.setQueryData(AUTH_QUERY_KEY, null);
    queryClient.clear();
  }, [queryClient]);

  const isBootstrapping = hasToken && isLoading;

  if (isBootstrapping) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">Loading...</div>;
  }

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
}

// todo sepatare it to new file
 
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
