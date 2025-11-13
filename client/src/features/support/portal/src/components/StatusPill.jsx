export default function StatusPill({ status }) {
  const map = {
    open:        "bg-amber-100 text-amber-800",
    "in-progress":"bg-blue-100 text-blue-800",
    resolved:    "bg-emerald-100 text-emerald-800",
  };
  return (
    <span className={`px-2 py-0.5 text-xs rounded ${map[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}
