// import { useState } from 'react';
// import {
//   Monitor, Home, Scale, Wrench, Stethoscope, Landmark,
//   Scissors, BookOpen, Palette
// } from 'lucide-react';
// import StatusPill from './StatusPill';

// export function TicketsList({ tickets = [], onUpdateStatus }) {
//   const [expandedTicket, setExpandedTicket] = useState(null);

//   const getCategoryIcon = (category) => {
//     const iconMap = {
//       'Tech Support': Monitor,
//       'Home Services': Home,
//       'Legal Services': Scale,
//       'Repairs & Maintenance': Wrench,
//       'Health & Wellness': Stethoscope,
//       'Accounting & Finance': Landmark,
//       'Beauty & Grooming': Scissors,
//       'Education': BookOpen,
//       'Creative Services': Palette,
//     };
//     return iconMap[category] || Monitor;
//   };

//   const priorityChip = (priority) => {
//     const map = {
//       high: 'bg-rose-100 text-rose-700',
//       medium: 'bg-amber-100 text-amber-700',
//       low: 'bg-emerald-100 text-emerald-700',
//     };
//     const cls = map[priority] || 'bg-gray-100 text-gray-700';
//     return (
//       <span className={`px-2 py-0.5 text-xs rounded ${cls}`}>
//         {priority}
//       </span>
//     );
//   };

//   const toggleExpand = (id) => {
//     setExpandedTicket(expandedTicket === id ? null : id);
//   };

//   return (
//     <div className="space-y-4">
//       {tickets.map((t) => {
//         const Icon = getCategoryIcon(t.category);
//         return (
//           <article
//             key={t.id}
//             className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
//           >
//             <header className="flex items-start justify-between gap-3">
//               <div className="flex items-start gap-3 min-w-0">
//                 <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
//                   <Icon size={18} className="text-white" />
//                 </div>
//                 <div className="min-w-0">
//                   <div className="font-medium truncate">{t.subject}</div>
//                   <div className="text-sm text-gray-500 truncate">
//                     {t.name} • {t.email}
//                   </div>
//                   <div className="text-xs text-gray-400 mt-1">
//                     {t.category} • {new Date(t.createdAt).toLocaleString()}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 shrink-0">
//                 {priorityChip(t.priority)}
//                 <StatusPill status={t.status} />
//               </div>
//             </header>

//             {expandedTicket === t.id && (
//               <p className="text-sm text-gray-700 mt-3 whitespace-pre-line">
//                 {t.description}
//               </p>
//             )}

//             <footer className="mt-3 flex flex-wrap items-center gap-2">
//               <button
//                 className="text-sm px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50"
//                 onClick={() => toggleExpand(t.id)}
//                 aria-expanded={expandedTicket === t.id}
//               >
//                 {expandedTicket === t.id ? 'Hide details' : 'View details'}
//               </button>

//               <div className="ml-auto flex items-center gap-2">
//                 <button
//                   className="text-xs px-2 py-1 border border-gray-200 rounded-lg hover:bg-gray-50"
//                   onClick={() => onUpdateStatus?.(t.id, 'open')}
//                 >
//                   Mark Open
//                 </button>
//                 <button
//                   className="text-xs px-2 py-1 border border-gray-200 rounded-lg hover:bg-gray-50"
//                   onClick={() => onUpdateStatus?.(t.id, 'in-progress')}
//                 >
//                   In-Progress
//                 </button>
//                 <button
//                   className="text-xs px-2 py-1 border border-gray-200 rounded-lg hover:bg-gray-50"
//                   onClick={() => onUpdateStatus?.(t.id, 'resolved')}
//                 >
//                   Resolved
//                 </button>
//               </div>
//             </footer>
//           </article>
//         );
//       })}

//       {tickets.length === 0 && (
//         <div className="text-sm text-gray-500">No tickets yet.</div>
//       )}
//     </div>
//   );
// }

import { useMemo } from "react";
import {
  User2, Clock3, Tag, Monitor, Home, Scale, Wrench, Stethoscope,
  Landmark, Scissors, BookOpen, Palette, Building2
} from "lucide-react";

/* --- Pills --- */
const StatusPill = ({ status }) => {
  const map = {
    open:        "bg-amber-100 text-amber-800",
    "in-progress":"bg-blue-100 text-blue-800",
    resolved:    "bg-emerald-100 text-emerald-800",
  };
  const label =
    status === "in-progress"
      ? "In-Progress"
      : status?.charAt(0).toUpperCase() + status?.slice(1);
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${map[status] || "bg-gray-100 text-gray-700"}`}>
      {label}
    </span>
  );
};

const PriorityPill = ({ priority }) => {
  const map = {
    high:   "bg-rose-100 text-rose-700",
    medium: "bg-yellow-100 text-yellow-700",
    low:    "bg-gray-100 text-gray-800",
  };
  const label = priority?.charAt(0).toUpperCase() + priority?.slice(1);
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${map[priority] || "bg-gray-100 text-gray-800"}`}>
      {label}
    </span>
  );
};

const CategoryChip = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">{children}</span>
);

/* --- Category glyphs --- */
const CATEGORY_ICON = {
  "Tech Support": Monitor,
  "Home Services": Home,
  "Legal Services": Scale,
  "Repairs & Maintenance": Wrench,
  "Health & Wellness": Stethoscope,
  "Accounting & Finance": Landmark,
  "Beauty & Grooming": Scissors,
  Education: BookOpen,
  "Creative Services": Palette,
};

const relTime = (d) => {
  const ms = Date.now() - new Date(d).getTime();
  const h = Math.max(1, Math.floor(ms / 36e5));
  return h < 24 ? `${h}h ago` : `${Math.floor(h / 24)}d ago`;
};

const formatId = (id) => `#${String(id).padStart(10, "0")}`;

export function TicketsList({ tickets = [], onUpdateStatus }) {
  const rows = useMemo(() => tickets, [tickets]);

  return (
    <div className="space-y-4">
      {rows.map((t) => {
        const CatIcon = CATEGORY_ICON[t.category] || Building2;

        return (
          <article
            key={t.id}
            className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* header row */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight flex flex-wrap items-center gap-x-2">
                  <span>{t.subject}</span>
                  <span className="text-gray-400 font-normal">{formatId(t.id)}</span>
                </h3>

                {t.description && (
                  <p className="mt-2 text-gray-700">
                    {t.description}
                  </p>
                )}
              </div>

              {/* force pills for every row */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <StatusPill status={String(t.status).toLowerCase()} />
                <PriorityPill priority={String(t.priority).toLowerCase()} />
              </div>
            </div>

            {/* meta row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-600">
              <span className="inline-flex items-center gap-2">
                <User2 className="h-4 w-4" />
                End User
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {relTime(t.createdAt)}
              </span>

              <span className="inline-flex items-center gap-2">
                <User2 className="h-4 w-4" />
                By {t.name}
              </span>

              <span className="inline-flex items-center gap-2">
                <CatIcon className="h-4 w-4 text-gray-500" />
                <CategoryChip>{t.category}</CategoryChip>
              </span>
            </div>
          </article>
        );
      })}

      {rows.length === 0 && (
        <div className="text-sm text-gray-500">No tickets yet.</div>
      )}
    </div>
  );
}
