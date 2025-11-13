import { useState } from 'react';
import {
  Monitor, Home, Scale, Wrench, Stethoscope, Landmark,
  Scissors, BookOpen, Palette
} from 'lucide-react';
import StatusPill from './StatusPill';

export function TicketsList({ tickets = [], onUpdateStatus }) {
  const [expandedTicket, setExpandedTicket] = useState(null);

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Tech Support': Monitor,
      'Home Services': Home,
      'Legal Services': Scale,
      'Repairs & Maintenance': Wrench,
      'Health & Wellness': Stethoscope,
      'Accounting & Finance': Landmark,
      'Beauty & Grooming': Scissors,
      'Education': BookOpen,
      'Creative Services': Palette,
    };
    return iconMap[category] || Monitor;
  };

  const priorityChip = (priority) => {
    const map = {
      high: 'bg-rose-100 text-rose-700',
      medium: 'bg-amber-100 text-amber-700',
      low: 'bg-emerald-100 text-emerald-700',
    };
    const cls = map[priority] || 'bg-gray-100 text-gray-700';
    return (
      <span className={`px-2 py-0.5 text-xs rounded ${cls}`}>
        {priority}
      </span>
    );
  };

  const toggleExpand = (id) => {
    setExpandedTicket(expandedTicket === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {tickets.map((t) => {
        const Icon = getCategoryIcon(t.category);
        return (
          <article
            key={t.id}
            className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <header className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium truncate">{t.subject}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {t.name} • {t.email}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {t.category} • {new Date(t.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {priorityChip(t.priority)}
                <StatusPill status={t.status} />
              </div>
            </header>

            {expandedTicket === t.id && (
              <p className="text-sm text-gray-700 mt-3 whitespace-pre-line">
                {t.description}
              </p>
            )}

            <footer className="mt-3 flex flex-wrap items-center gap-2">
              <button
                className="text-sm px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => toggleExpand(t.id)}
                aria-expanded={expandedTicket === t.id}
              >
                {expandedTicket === t.id ? 'Hide details' : 'View details'}
              </button>

              <div className="ml-auto flex items-center gap-2">
                <button
                  className="text-xs px-2 py-1 border border-gray-200 rounded-lg hover:bg-gray-50"
                  onClick={() => onUpdateStatus?.(t.id, 'open')}
                >
                  Mark Open
                </button>
                <button
                  className="text-xs px-2 py-1 border border-gray-200 rounded-lg hover:bg-gray-50"
                  onClick={() => onUpdateStatus?.(t.id, 'in-progress')}
                >
                  In-Progress
                </button>
                <button
                  className="text-xs px-2 py-1 border border-gray-200 rounded-lg hover:bg-gray-50"
                  onClick={() => onUpdateStatus?.(t.id, 'resolved')}
                >
                  Resolved
                </button>
              </div>
            </footer>
          </article>
        );
      })}

      {tickets.length === 0 && (
        <div className="text-sm text-gray-500">No tickets yet.</div>
      )}
    </div>
  );
}
