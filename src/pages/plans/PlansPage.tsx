import { useState } from 'react';
import { usePlans } from '../../entities/plan/hooks';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Button } from '@/shared/ui/button';
import type { Plan } from '@/entities/plan/types';
import { PlanEditorDialog } from '@/features/plans/plan-editor/PlanEditorDialog';

export function PlansPage() {
  const [page, setPage] = useState(1);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading, isError } = usePlans({ page, limit: 20 });

  const openCreateDialog = () => {
    setEditingPlan(null);
    setDialogOpen(true);
  };

  const openEditDialog = (plan: Plan) => {
    setEditingPlan(plan);
    setDialogOpen(true);
  };

  if (isLoading) return <div className="text-sm text-gray-500">Loading..</div>;
  if (isError) return <div className="text-sm text-red-600">Unable to load plan list</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Plans</h1>
        <Button onClick={openCreateDialog}>+ New Plan</Button>
      </div>

      {!data || data.data.length === 0 ? (
        <div className="text-sm text-gray-500">No data to show</div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Monthly</TableHead>
                <TableHead>Yearly</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.monthlyPrice ?? '—'}</TableCell>
                  <TableCell>{plan.yearlyPrice ?? '—'}</TableCell>
                  <TableCell>{plan.isActive ? '✓' : '—'}</TableCell>
                  <TableCell>{plan.isPopular ? '✓' : '—'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(plan)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center gap-2">
            <Button variant="outline" disabled={!data.meta.hasPreviousPage} onClick={() => setPage((p) => p - 1)}>
              Prev
            </Button>
            <span className="text-sm text-gray-500">
              Сторінка {data.meta.page} of {data.meta.totalPages}
            </span>
            <Button variant="outline" disabled={!data.meta.hasNextPage} onClick={() => setPage((p) => p + 1)}>
              Next
            </Button>
          </div>
        </>
      )}

      <PlanEditorDialog open={dialogOpen} onOpenChange={setDialogOpen} plan={editingPlan} />
    </div>
  );
}
