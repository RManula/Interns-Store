"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useApp } from "@/lib/store";
import { companies } from "@/lib/data";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { cn } from "@/lib/utils";

export default function ReviewsPage() {
  const router = useRouter();
  const { ready, user, reviews } = useApp();
  const [companyId, setCompanyId] = useState(companies[0]?.id ?? "");

  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/reviews");
  }, [ready, user, router]);

  if (!ready || !user) {
    return <div className="container-shell py-40 text-center text-muted">Loading…</div>;
  }

  const mine = reviews.filter((r) => r.authorName === user.name);
  const selected = companies.find((c) => c.id === companyId);

  return (
    <div className="bg-surface pb-24 pt-28">
      <div className="container-shell max-w-2xl">
        <p className="text-sm font-bold text-blue-700">Feedback</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold text-navy-950">Leave a review</h1>
        <p className="mt-2 text-muted">Share your experience of an internship to help other students and employers.</p>

        <div className="mt-7 rounded-2xl border border-line bg-white p-6">
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-navy-900">Company</span>
            <select
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="h-12 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20"
            >
              {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <div className="mt-5">
            {selected && <ReviewForm companyId={selected.id} companyName={selected.name} />}
          </div>
        </div>

        {mine.length > 0 && (
          <div className="mt-8">
            <h2 className="font-heading text-lg font-semibold text-navy-950">Your reviews</h2>
            <div className="mt-4 space-y-3">
              {mine.map((r) => (
                <div key={r.id} className="rounded-2xl border border-line bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex gap-0.5" aria-label={`${r.rating} out of 5`}>
                      {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={14} className={cn(n <= r.rating ? "fill-amber-400 text-amber-400" : "text-line")} />)}
                    </span>
                    <span className="text-xs text-muted">{r.companyName}</span>
                  </div>
                  <p className="mt-2 font-heading text-sm font-semibold text-navy-950">{r.title}</p>
                  <p className="mt-1 text-sm leading-6 text-ink">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
