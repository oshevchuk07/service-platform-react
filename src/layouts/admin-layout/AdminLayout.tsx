import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-gray-200 bg-white">
        <div className="p-4 font-semibold">ServicePlatform</div>
        <Sidebar />
      </aside>
      <div className="flex-1">
        <Topbar />
        <main className="p-6">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}
