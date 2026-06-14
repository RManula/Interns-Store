"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ReviewForm({
  companyId,
  companyName,
  onDone,
}: {
  companyId: string;
  companyName: string;
  onDone?: () => void;
}) {
  const { user, addReview } = useApp();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (rating === 0) return setError("Please choose a star rating.");
    if (!title.trim() || !body.trim()) return setError("Add a short title and your feedback.");
    addReview({
      companyId,
      companyName,
      authorName: user.name,
      authorRole: user.role,
      rating,
      title: title.trim(),
      body: body.trim(),
    });
    setRating(0);
    setTitle("");
    setBody("");
    setError("");
    onDone?.();
  };

  if (!user) {
    return <p className="text-sm text-muted">Please sign in to leave a review.</p>;
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <span className="mb-1.5 block text-sm font-bold text-navy-900">Your rating</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => { setRating(n); setError(""); }}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
            >
              <Star size={26} className={cn("transition", (hover || rating) >= n ? "fill-amber-400 text-amber-400" : "text-line")} />
            </button>
          ))}
        </div>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-bold text-navy-900">Title</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sum up your experience" className="h-12 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-bold text-navy-900">Your review</span>
        <textarea value={body} rows={4} onChange={(e) => setBody(e.target.value)} placeholder="What was the internship like? What did you learn?" className="w-full rounded-xl border border-line bg-white p-3.5 text-sm text-ink shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20" />
      </label>
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      <button type="submit" className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700">
        Submit review
      </button>
    </form>
  );
}
