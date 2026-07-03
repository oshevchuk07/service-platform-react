import { Outlet } from 'react-router';

export function LandingLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 p-4">Service platform</header>
      <Outlet></Outlet>
    </div>
  );
}
