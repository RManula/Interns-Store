"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ReviewForm } from "./ReviewForm";

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={14} className={cn(n <= value ? "fill-amber-400 text-amber-400" : "text-line")} />
      ))}
    </span>
  );
}

export function CompanyReviews({ companyId, companyName }: { companyId: string; companyName: string }) {
  const { user, reviews } = useApp();
  const [open, setOpen] = useState(false);

  const list = reviews.filter((r) => r.companyId === companyId);
  const avg = list.length ? (list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1) : null;

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold text-navy-950">
          Reviews {list.length > 0 && <span className="text-muted">({list.length})</span>}
        </h2>
        {avg && (
          <span className="flex items-center gap-2 text-sm font-bold text-navy-900">
            <Stars value={Math.round(Number(avg))} /> {avg}/5
          </span>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {list.length === 0 && <p className="text-sm text-muted">No reviews yet. Be the first to share your experience.</p>}
        {list.map((r) => (
          <div key={r.id} className="border-t border-line pt-4 first:border-0 first:pt-0">
            <div className="flex items-center justify-between gap-2">
              <Stars value={r.rating} />
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[0.6rem] font-extrabold uppercase text-blue-700">{r.authorRole}</span>
            </div>
            <p className="mt-2 font-heading text-sm font-semibold text-navy-950">{r.title}</p>
            <p className="mt-1 text-sm leading-6 text-ink">{r.body}</p>
            <p className="mt-1.5 text-xs text-muted">{r.authorName}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-line pt-5">
        {user ? (
          open ? (
            <ReviewForm companyId={companyId} companyName={companyName} onDone={() => setOpen(false)} />
          ) : (
            <button onClick={() => setOpen(true)} className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
              Write a review
            </button>
          )
        ) : (
          <Link href="/login" className="text-sm font-bold text-blue-700 hover:underline">Sign in to write a review →</Link>
        )}
      </div>
    </div>
  );
}
