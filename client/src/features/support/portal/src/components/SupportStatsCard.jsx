// SupportStatsCards.jsx
import { Ticket, AlertCircle, Settings, CheckCircle2 } from "lucide-react";

export default function SupportStatsCards({
  totalTickets = 0,
  openTickets = 0,
  inProgressTickets = 0,
  resolvedTickets = 0,
}) {
  const Card = ({ icon: Icon, label, value, bg, ring }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center overflow-hidden ${ring}`}>
          <Icon className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-semibold leading-tight">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-6 mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card icon={Ticket}      label="Total Tickets" value={totalTickets}     bg="bg-blue-600"   ring="ring-4 ring-blue-50" />
        <Card icon={AlertCircle} label="Open"          value={openTickets}      bg="bg-orange-500" ring="ring-4 ring-orange-50" />
        <Card icon={Settings}    label="In-Progress"   value={inProgressTickets} bg="bg-blue-500"   ring="ring-4 ring-blue-50" />
        <Card icon={CheckCircle2}label="Resolved"      value={resolvedTickets}  bg="bg-green-600"  ring="ring-4 ring-green-50" />
      </div>
    </div>
  );
}
