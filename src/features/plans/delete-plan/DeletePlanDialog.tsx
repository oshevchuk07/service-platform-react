import { useDeletePlan } from '@/entities/plan/hooks';
import type { Plan } from '@/entities/plan/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';

interface DeletePlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: Plan | null;
}

export function DeletePlanDialog({ open, onOpenChange, plan }: DeletePlanDialogProps) {
  const deletePlan = useDeletePlan();

  const handleConfirm = () => {
    if (!plan) return;
    deletePlan.mutate(plan.id, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remo subscription plan?</AlertDialogTitle>
          <AlertDialogDescription>Plan "{plan?.name}" will be removes with all related information</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Скасувати</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={deletePlan.isPending}>
            {deletePlan.isPending ? 'Removing...' : 'Remove'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
