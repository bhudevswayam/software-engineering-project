export default function SectionCard({ title, extra, children }) {
  return (
    <section className="rounded-2xl border border-gray-200/80 bg-white shadow-sm">
      {(title || extra) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/70">
          {title && <h2 className="text-sm font-medium text-gray-800">{title}</h2>}
          {extra}
        </div>
      )}
      <div className="px-6 py-6">{children}</div>
    </section>
  );
}
