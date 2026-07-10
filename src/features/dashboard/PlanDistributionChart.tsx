import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PlanDistributionChartProps {
  data: { name: string; users: number }[];
}

export function PlanDistributionChart({ data }: PlanDistributionChartProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <h2 className="mb-4 text-sm font-medium text-gray-700">Users by plan</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis allowDecimals={false} fontSize={12} />
          <Tooltip />
          <Bar dataKey="users" fill="#111827" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
