"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Search, Trash2 } from "lucide-react";
import { useApp } from "@/lib/store";

export default function SavedSearchesPage() {
  const router = useRouter();
  const { ready, user, recentSearches, clearRecentSearches } = useApp();

  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/saved-searches");
  }, [ready, user, router]);

  if (!ready || !user) {
    return <div className="container-shell py-40 text-center text-muted">Loading…</div>;
  }

  const toQuery = (s: { q: string; location: string; field: string }) => {
    const p = new URLSearchParams();
    if (s.q) p.set("q", s.q);
    if (s.location) p.set("location", s.location);
    if (s.field) p.set("field", s.field);
    return p.toString();
  };

  return (
    <div className="bg-surface pb-24 pt-28">
      <div className="container-shell max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-blue-700">Saved searches</p>
            <h1 className="mt-1 font-heading text-3xl font-semibold text-navy-950">Your search alerts</h1>
          </div>
          {recentSearches.length > 0 && (
            <button onClick={clearRecentSearches} className="flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-coral-600 hover:bg-coral-500/10">
              <Trash2 size={15} /> Clear all
            </button>
          )}
        </div>

        {recentSearches.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-line bg-white p-10 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
              <Search size={22} />
            </span>
            <p className="mt-4 font-heading text-lg font-semibold text-navy-950">No saved searches yet</p>
            <p className="mt-1 text-sm text-muted">Run a search on Browse and it will appear here so you can re-run it or get alerts.</p>
            <Link href="/browse" className="mt-5 inline-block rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
              Search internships
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            {recentSearches.map((s) => (
              <div key={s.id} className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate font-heading text-sm font-semibold text-navy-950">
                    {[s.q, s.location, s.field].filter(Boolean).join(" · ") || "All internships"}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                    <Bell size={12} /> Weekly alert · last run recently
                  </p>
                </div>
                <Link href={`/browse${toQuery(s) ? `?${toQuery(s)}` : ""}`} className="shrink-0 rounded-full bg-blue-600 px-5 py-2 text-center text-sm font-bold text-white hover:bg-blue-700">
                  Search again
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
