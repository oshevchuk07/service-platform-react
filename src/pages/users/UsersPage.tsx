import { useState } from 'react';
import { useUsers } from '../../entities/user/hooks';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Button } from '@/shared/ui/button';

export function UsersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useUsers({ page, limit: 20 });

  if (isLoading) return <div className="text-sm text-gray-500">Loading...</div>;
  if (isError) return <div className="text-sm text-red-600">Unable to load users</div>;
  if (!data || data.data.length === 0) return <div className="text-sm text-gray-500">No data available</div>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Users</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Plan ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.planId ?? '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center gap-2">
        <Button variant="outline" disabled={!data.meta.hasPreviousPage} onClick={() => setPage((p) => p - 1)}>
          Prev
        </Button>
        <span className="text-sm text-gray-500">
          Page {data.meta.page} of {data.meta.totalPages}
        </span>
        <Button variant="outline" disabled={!data.meta.hasNextPage} onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
