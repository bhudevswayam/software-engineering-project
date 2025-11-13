import { Ticket, AlertTriangle, Loader, CheckCircle2 } from "lucide-react";

function Card({ icon: Icon, label, value, bar }) {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gray-900 text-white flex items-center justify-center">
          <Icon size={18} />
        </div>
        <div>
          <div className="text-sm text-gray-500">{label}</div>
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
        </div>
      </div>
      {bar != null && (
        <div className="mt-4 h-1.5 w-full rounded-full bg-gray-100">
          <div className="h-1.5 rounded-full bg-gray-900" style={{ width: `${bar}%` }} />
        </div>
      )}
    </div>
  );
}

export default function SupportStats({ tickets = [] }) {
  const total = tickets.length;
  const open = tickets.filter(t => t.status === "open").length;
  const inProgress = tickets.filter(t => t.status === "in-progress").length;
  const resolved = tickets.filter(t => t.status === "resolved").length;
  const pct = (n) => (total ? Math.round((n / total) * 100) : 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card icon={Ticket}        label="Total Tickets" value={total} />
      <Card icon={AlertTriangle} label="Open"          value={open}        bar={pct(open)} />
      <Card icon={Loader}        label="In-Progress"   value={inProgress}  bar={pct(inProgress)} />
      <Card icon={CheckCircle2}  label="Resolved"      value={resolved}    bar={pct(resolved)} />
    </div>
  );
}
