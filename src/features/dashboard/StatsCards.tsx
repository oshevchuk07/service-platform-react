interface StatsCardsProps {
  totalUsers: number;
  activeSubscriptions: number;
  mrr: number;
}

export function StatsCards({ totalUsers, activeSubscriptions, mrr }: StatsCardsProps) {
  const cards = [
    { label: 'Users', value: totalUsers },
    { label: 'Active subscriptions', value: activeSubscriptions },
    { label: 'MRR', value: `$${mrr.toFixed(2)}` },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-500">{card.label}</div>
          <div className="text-2xl font-semibold">{card.value}</div>
        </div>
      ))}
    </div>
  );
}
