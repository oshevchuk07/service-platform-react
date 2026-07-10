import { useMemo } from 'react';
import { usePlans } from '../plan/hooks';
import { useUsers } from '../user/hooks';

export function useDashboardStats() {
  const plansQuery = usePlans({ page: 1, limit: 100 });
  const usersQuery = useUsers({ page: 1, limit: 100 });

  const isLoading = plansQuery.isLoading || usersQuery.isLoading;
  const isError = plansQuery.isError || usersQuery.isError;

  const stats = useMemo(() => {
    const plans = plansQuery.data?.data ?? [];
    const users = usersQuery.data?.data ?? [];

    const totalUsers = users.length;
    const subscribedUsers = users.filter((u) => u.planId !== null);
    const activeSubscriptions = subscribedUsers.length;

    const mrr = subscribedUsers.reduce((sum, user) => {
      const plan = plans.find((p) => p.id === user.planId);
      if (!plan) return sum;
      if (user.paymentType === 'YEARLY' && plan.yearlyPrice) {
        return sum + plan.yearlyPrice / 12;
      }
      return sum + (plan.monthlyPrice ?? 0);
    }, 0);

    const byPlan = plans.map((plan) => ({
      name: plan.name,
      users: users.filter((u) => u.planId === plan.id).length,
    }));

    return { totalUsers, activeSubscriptions, mrr, byPlan };
  }, [plansQuery.data, usersQuery.data]);

  return { stats, isLoading, isError };
}
