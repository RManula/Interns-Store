export default function BrowseLoading() {
  return (
    <div>
      {/* search header skeleton */}
      <section className="mesh-dark pb-8 pt-32 text-white">
        <div className="container-shell">
          <div className="h-9 w-64 animate-pulse rounded-lg bg-white/15" />
          <div className="mt-3 h-4 w-80 animate-pulse rounded bg-white/10" />
          <div className="mt-6 h-16 animate-pulse rounded-2xl bg-white/15" />
        </div>
      </section>

      {/* results skeleton */}
      <section className="bg-surface">
        <div className="container-shell grid gap-6 py-8 lg:grid-cols-[minmax(0,420px)_1fr]">
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="size-11 animate-pulse rounded-xl bg-line" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 animate-pulse rounded bg-line" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-line" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-line" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-line" />
                </div>
              </div>
            ))}
          </div>
          <div className="hidden rounded-2xl border border-line bg-white p-8 lg:block">
            <div className="h-6 w-1/2 animate-pulse rounded bg-line" />
            <div className="mt-4 space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-3 w-full animate-pulse rounded bg-line" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
