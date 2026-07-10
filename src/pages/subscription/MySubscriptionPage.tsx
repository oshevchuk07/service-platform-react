import { useCancelPlan } from '@/entities/user/hooks';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/shared/ui/button';
import { Link } from 'react-router';

export function MySubscriptionPage() {
  const { user } = useAuth();
  const cancelPlan = useCancelPlan();

  if (!user?.plan) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500">You didnt has active subscription</p>
        <Button className="w-fit">
          <Link to="/app/pricing">Chouse plan</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-6">
      <h1 className="text-lg font-semibold">My subscription</h1>
      <p className="text-sm text-gray-600">Plan: {user.plan.name}</p>
      <div className="flex gap-2">
        <Button variant="outline">
          <Link to="/app/pricing">Change plan</Link>
        </Button>
        <Button variant="outline" className="text-red-600" disabled={cancelPlan.isPending} onClick={() => cancelPlan.mutate(user.id)}>
          Cancel subscription
        </Button>
      </div>
    </div>
  );
}
