export default function SupportHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#eef3ff] text-gray-900">
      <div className="px-6 py-10 md:px-10 md:py-12 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Fast, friendly support for your service needs
          </h1>
          <p className="mt-3 text-gray-600">
            Create a ticket in seconds and track progress in one place. Our team responds quickly and keeps you in the loop.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 border border-white/60">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Typical first response &lt; 1h
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 border border-white/60">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              24/7 tracking
            </div>
          </div>
        </div>

        {/* right illustration area (minimal) */}
        <div className="relative h-48 md:h-56">
          <div className="absolute inset-0 rounded-xl bg-white shadow-md" />
          {/* floating badges */}
          <div className="absolute -top-4 left-4 rounded-xl bg-white shadow-md px-4 py-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">✓</span>
              Service booked
            </div>
            <div className="mt-1 text-xs text-gray-500">2 minutes ago</div>
          </div>
          <div className="absolute -bottom-4 right-4 rounded-xl bg-white shadow-md px-4 py-3 text-sm">
            <div className="flex items-center gap-2">
              ⭐ <span className="font-medium">5.0</span> • “Great help!”
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
