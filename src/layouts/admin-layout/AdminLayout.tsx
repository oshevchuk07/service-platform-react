import { Outlet } from 'react-router';

export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-gray-200 bg-white">
        <div className="p-4 font-semibold">Service Platform</div>
      </aside>
      <div className="flex-1">
        <header className="h-14 border-b border-gray-200 bg-white">Header</header>
        <main className="p-6">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}
