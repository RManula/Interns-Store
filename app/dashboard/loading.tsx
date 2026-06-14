export default function DashboardLoading() {
  return (
    <div className="bg-surface pb-24 pt-28">
      <div className="container-shell">
        <div className="h-4 w-32 animate-pulse rounded bg-line" />
        <div className="mt-3 h-9 w-72 animate-pulse rounded-lg bg-line" />

        {/* stat cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-line bg-white p-5">
              <div className="size-10 animate-pulse rounded-xl bg-line" />
              <div className="mt-3 h-7 w-16 animate-pulse rounded bg-line" />
              <div className="mt-2 h-3 w-24 animate-pulse rounded bg-line" />
            </div>
          ))}
        </div>

        {/* panels */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-line bg-white p-6">
            <div className="h-5 w-40 animate-pulse rounded bg-line" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-xl bg-surface" />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5">
            <div className="h-5 w-28 animate-pulse rounded bg-line" />
            <div className="mt-4 space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-3 w-full animate-pulse rounded bg-line" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
