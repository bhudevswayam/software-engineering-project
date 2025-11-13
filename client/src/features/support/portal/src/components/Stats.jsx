export function Stats({ tickets = [] }) {
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
  };

  const Card = ({ label, value }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
      <Card label="Total Tickets" value={stats.total} />
      <Card label="Open" value={stats.open} />
      <Card label="In Progress" value={stats.inProgress} />
      <Card label="Resolved" value={stats.resolved} />
    </div>
  );
}
