import { useDashboardStats } from '../../entities/dashboard/useDashboardStats';
import { StatsCards } from '../../features/dashboard/StatsCards';
import { PlanDistributionChart } from '../../features/dashboard/PlanDistributionChart';

export function DashboardPage() {
  const { stats, isLoading, isError } = useDashboardStats();

  if (isLoading) return <div className="text-sm text-gray-500">Loading stats...</div>;
  if (isError) return <div className="text-sm text-red-600">Unable to load stats</div>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <StatsCards totalUsers={stats.totalUsers} activeSubscriptions={stats.activeSubscriptions} mrr={stats.mrr} />
      <PlanDistributionChart data={stats.byPlan} />
    </div>
  );
}
