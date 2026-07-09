import type { Plan } from '@/entities/plan/types';
import { usePlanEditor } from './usePlanEditor';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import { useReplacePlanIntegrations } from '@/entities/plan/hooks';
import { IntegrationsSelectionDialog } from '../integrations-selection/IntegrationsSelectionDialog';

interface PlanEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: Plan | null;
}

export function PlanEditorDialog({ open, onOpenChange, plan }: PlanEditorDialogProps) {
  const { form, onSubmit, isPending } = usePlanEditor(plan, () => onOpenChange(false));
  const {
    register,
    formState: { errors },
  } = form;

  const [integrationsDialogOpen, setIntegrationsDialogOpen] = useState(false);
  const replaceIntegrations = useReplacePlanIntegrations();

  const handleIntegrationsConfirm = (integrationIds: number[]) => {
    if (!plan) return;
    replaceIntegrations.mutate({ planId: plan.id, integrationIds });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{plan ? 'Edit Subscription' : 'New subscription'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="subtitle">Sub title</Label>
            <Input id="subtitle" {...register('subtitle')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="monthlyPrice">Price / month</Label>
              <Input id="monthlyPrice" type="number" step="0.01" {...register('monthlyPrice')} />
              {errors.monthlyPrice && <span className="text-xs text-red-600">{errors.monthlyPrice.message}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="yearlyPrice">Price / year</Label>
              <Input id="yearlyPrice" type="number" step="0.01" {...register('yearlyPrice')} />
              {errors.yearlyPrice && <span className="text-xs text-red-600">{errors.yearlyPrice.message}</span>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register('isActive')} />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register('isPopular')} />
              Popular
            </label>
          </div>

          {plan && (
            <Button type="button" variant="outline" onClick={() => setIntegrationsDialogOpen(true)}>
              Manage Integrations
            </Button>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

      {plan && (
        <IntegrationsSelectionDialog
          open={integrationsDialogOpen}
          onOpenChange={setIntegrationsDialogOpen}
          initialSelectedIds={[]}
          onConfirm={handleIntegrationsConfirm}
        />
      )}
    </Dialog>
  );
}
