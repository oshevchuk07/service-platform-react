import { useIntegrationGroups } from '@/entities/integration/hooks';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { useEffect, useState } from 'react';

interface IntegrationsSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialSelectedIds: number[];
  onConfirm: (ids: number[]) => void;
}

export function IntegrationsSelectionDialog({ open, onOpenChange, initialSelectedIds, onConfirm }: IntegrationsSelectionDialogProps) {
  const { data, isLoading } = useIntegrationGroups();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (open) {
      // todo: check it
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIds(new Set(initialSelectedIds));
    }
  }, [open, initialSelectedIds]);

  const toggle = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const handleConfirm = () => {
    onConfirm(Array.from(selectedIds));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select integrations</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : (
          <div className="flex flex-col gap-5">
            {data?.data.map((group) => (
              <div key={group.id} className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-gray-700">{group.name}</h3>
                <div className="flex flex-col gap-1.5 pl-2">
                  {group.integrations.map((integration) => (
                    <label key={integration.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={selectedIds.has(integration.id)} onChange={() => toggle(integration.id)} />
                      {integration.name}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button type="button" onClick={handleConfirm}>
            Confirm ({selectedIds.size})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
