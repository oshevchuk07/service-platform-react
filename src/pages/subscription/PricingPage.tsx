import { usePlans } from '@/entities/plan/hooks';
import { useAssignPlan } from '@/entities/user/hooks';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';

type BillingCycle = 'MONTHLY' | 'YEARLY';

export function PricingPage() {
  const { user } = useAuth();
  const { data, isLoading } = usePlans({ page: 1, limit: 100 });
  const assignPlan = useAssignPlan();
  const [cycle, setCycle] = useState<BillingCycle>('MONTHLY');

  if (isLoading) return <div className="text-sm text-gray-500">Loading..</div>;

  const activePlans = data?.data.filter((plan) => plan.isActive) ?? [];

  const handleSubscribe = (planId: number) => {
    if (!user) return;
    assignPlan.mutate({ userId: user.id, payload: { planId, paymentType: cycle } });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Select subscription</h1>
        <div className="flex gap-2 rounded-md border border-gray-200 p-1">
          <button
            onClick={() => setCycle('MONTHLY')}
            className={`rounded px-3 py-1 text-sm ${cycle === 'MONTHLY' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setCycle('YEARLY')}
            className={`rounded px-3 py-1 text-sm ${cycle === 'YEARLY' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activePlans.map((plan) => {
          const price = cycle === 'MONTHLY' ? plan.monthlyPrice : plan.yearlyPrice;
          const isCurrent = user?.planId === plan.id;

          return (
            <div
              key={plan.id}
              className={`flex flex-col gap-3 rounded-lg border p-6 ${plan.isPopular ? 'border-gray-900 shadow-sm' : 'border-gray-200'}`}
            >
              {plan.isPopular && <span className="text-xs font-medium text-gray-900">Popular</span>}
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              {plan.subtitle && <p className="text-sm text-gray-500">{plan.subtitle}</p>}
              <div className="text-2xl font-bold">
                {price ?? '—'} <span className="text-sm font-normal text-gray-500">/ {cycle === 'MONTHLY' ? 'month' : 'year'}</span>
              </div>

              <Button disabled={isCurrent || assignPlan.isPending} onClick={() => handleSubscribe(plan.id)}>
                {isCurrent ? 'Current' : 'Subscribe'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
