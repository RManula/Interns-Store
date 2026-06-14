"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Flag, ShieldAlert } from "lucide-react";

const REASONS = [
  "Asks for payment to apply",
  "Looks like a scam / fake employer",
  "Misleading pay or unpaid without disclosure",
  "Discriminatory or offensive content",
  "Spam or duplicate listing",
  "Other",
];

function ReportForm() {
  const params = useSearchParams();
  const listingId = params.get("listingId") ?? "";

  const [reference, setReference] = useState(listingId);
  const [reason, setReason] = useState(REASONS[0]);
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!reference.trim()) next.reference = "Add the listing link or ID you're reporting.";
    if (!details.trim() || details.trim().length < 10) next.details = "Please add a few words about the problem.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email or leave it blank.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-mint-500/15 text-emerald-600">
          <CheckCircle2 size={28} />
        </span>
        <h2 className="mt-5 font-heading text-2xl font-semibold text-navy-950">Report received</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Thanks for helping keep Interns Store safe. Our team reviews every report and may follow up if we need more detail.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/browse" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">Back to browse</Link>
          <Link href="/security" className="rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-navy-900 hover:bg-blue-50">Safety tips</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-line bg-white p-6 sm:p-8">
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-bold text-navy-900">Listing link or ID</label>
          <input
            value={reference}
            onChange={(e) => { setReference(e.target.value); setErrors((x) => ({ ...x, reference: "" })); }}
            placeholder="https://internsstore… or listing ID"
            className={`h-12 w-full rounded-xl border bg-white px-3.5 text-sm text-ink shadow-sm transition focus:outline-none focus:ring-[3px] ${errors.reference ? "border-red-400 focus:ring-red-400/20" : "border-line focus:border-blue-500 focus:ring-blue-500/20"}`}
          />
          {errors.reference && <p className="mt-1 text-xs font-medium text-red-600">{errors.reference}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-navy-900">Reason</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="h-12 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20"
          >
            {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-navy-900">What's wrong?</label>
          <textarea
            value={details}
            rows={4}
            onChange={(e) => { setDetails(e.target.value); setErrors((x) => ({ ...x, details: "" })); }}
            placeholder="Tell us what looks suspicious or unsafe…"
            className={`w-full rounded-xl border bg-white p-3.5 text-sm text-ink shadow-sm transition focus:outline-none focus:ring-[3px] ${errors.details ? "border-red-400 focus:ring-red-400/20" : "border-line focus:border-blue-500 focus:ring-blue-500/20"}`}
          />
          {errors.details && <p className="mt-1 text-xs font-medium text-red-600">{errors.details}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-navy-900">Your email <span className="font-normal text-muted">(optional)</span></label>
          <input
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: "" })); }}
            placeholder="So we can follow up if needed"
            className={`h-12 w-full rounded-xl border bg-white px-3.5 text-sm text-ink shadow-sm transition focus:outline-none focus:ring-[3px] ${errors.email ? "border-red-400 focus:ring-red-400/20" : "border-line focus:border-blue-500 focus:ring-blue-500/20"}`}
          />
          {errors.email && <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>}
        </div>

        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-coral-500 py-3 text-sm font-extrabold text-white transition hover:bg-coral-600">
          <Flag size={16} /> Submit report
        </button>
      </div>
    </form>
  );
}

export default function ReportListingPage() {
  return (
    <div>
      <section className="mesh-dark px-4 pb-14 pt-32 text-white">
        <div className="container-shell max-w-2xl">
          <span className="eyebrow !text-blue-100">Trust & safety</span>
          <h1 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">Report a listing</h1>
          <p className="mt-4 flex items-start gap-2 text-white/65">
            <ShieldAlert size={18} className="mt-0.5 shrink-0 text-coral-500" />
            Spotted something suspicious or unsafe? Tell us and our team will review it.
          </p>
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="container-shell max-w-2xl">
          <Suspense fallback={<div className="text-center text-muted">Loading…</div>}>
            <ReportForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
