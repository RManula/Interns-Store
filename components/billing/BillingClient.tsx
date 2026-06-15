"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Check,
  CreditCard,
  FileText,
  RefreshCw,
  ShieldCheck,
  X,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { plans, studentPlans } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";
import type { PaymentMethod } from "@/lib/types";

function luhn(n: string) {
  const digits = n.replace(/\D/g, "");
  let sum = 0, alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (alt) { d *= 2; if (d > 9) d -= 9; }
    sum += d; alt = !alt;
  }
  return sum % 10 === 0;
}

function formatCard(raw: string) {
  return raw.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}
function cardTypeName(n: string) {
  const d = n.replace(/\D/g, "");
  if (/^4/.test(d)) return "Visa";
  if (/^5[1-5]/.test(d)) return "Mastercard";
  if (/^3[47]/.test(d)) return "Amex";
  return null;
}

const STATUS_STYLE: Record<string, string> = {
  Paid: "bg-mint-500/15 text-emerald-700",
  Failed: "bg-coral-500/10 text-coral-600",
  Refunded: "bg-amber-50 text-amber-700",
};

export function BillingClient() {
  const router = useRouter();
  const { ready, user, activePlan, paymentMethod, paymentHistory, updatePaymentMethod, cancelPlan } = useApp();

  const [showUpdateCard, setShowUpdateCard] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  // Card form state
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardError, setCardError] = useState("");
  const [cardSaved, setCardSaved] = useState(false);
  const expiryRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/billing");
  }, [ready, user, router]);

  if (!ready || !user) {
    return <div className="py-40 text-center text-muted">Loading…</div>;
  }

  const isEmployer = user.role === "employer";
  const allPlans = isEmployer ? plans : studentPlans;
  const currentPlanData = allPlans.find((p) => p.name === activePlan);
  const isPaid = activePlan !== "Basic" && activePlan !== "Free";

  // Compute next renewal (approx 1 month from last payment, or just today +30)
  const lastPayment = paymentHistory[0];
  const nextRenewal = lastPayment
    ? new Date(new Date(lastPayment.date).getTime() + 30 * 24 * 60 * 60 * 1000)
        .toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })
    : null;

  const saveCard = () => {
    if (!cardName.trim()) { setCardError("Please enter the cardholder name."); return; }
    const raw = cardNumber.replace(/\s/g, "");
    if (raw.length < 16 || !luhn(raw)) { setCardError("Please enter a valid card number."); return; }
    const [mm, yy] = expiry.split("/");
    if (!mm || !yy || new Date(2000 + parseInt(yy, 10), parseInt(mm, 10) - 1) < new Date()) {
      setCardError("Please enter a valid expiry."); return;
    }
    if (cvc.replace(/\D/g, "").length < 3) { setCardError("Please enter a valid CVC."); return; }
    const method: PaymentMethod = {
      type: cardTypeName(raw) ?? "Card",
      last4: raw.slice(-4),
      expiry,
    };
    updatePaymentMethod(method);
    setCardSaved(true);
    setCardError("");
    setTimeout(() => { setShowUpdateCard(false); setCardSaved(false); }, 1500);
  };

  const handleCancel = () => {
    cancelPlan();
    setCancelled(true);
    setShowCancel(false);
  };

  return (
    <div className="min-h-screen bg-surface pb-24 pt-28">
      <div className="container-shell max-w-3xl">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm font-bold text-blue-700 hover:underline">← Dashboard</Link>
          <h1 className="mt-3 font-heading text-3xl font-semibold text-navy-950">Billing & payments</h1>
          <p className="mt-1 text-muted">{user.name} · {user.email}</p>
        </div>

        <div className="space-y-6">
          {/* ── Current plan ────────────────────────────────── */}
          <Panel title="Current plan" icon={FileText}>
            {cancelled ? (
              <div className="flex items-center gap-3 rounded-xl bg-mint-500/10 px-4 py-3 text-sm text-emerald-700">
                <Check size={16} /> Your plan has been cancelled. You are now on the Free plan.
              </div>
            ) : (
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-heading text-xl font-semibold text-navy-950">
                    {isEmployer ? "" : "Student "}{activePlan}
                  </p>
                  {currentPlanData && (
                    <p className="mt-1 text-sm text-muted">{currentPlanData.description}</p>
                  )}
                  {currentPlanData && "price" in currentPlanData && (
                    <p className="mt-1 text-sm font-bold text-navy-950">
                      {currentPlanData.price}{" "}
                      <span className="font-normal text-muted">{currentPlanData.period}</span>
                    </p>
                  )}
                  {nextRenewal && isPaid && (
                    <p className="mt-1 text-xs text-muted">Next renewal: {nextRenewal}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/pricing"
                    className="rounded-xl border border-blue-600 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50"
                  >
                    {isPaid ? "Change plan" : "Upgrade"}
                  </Link>
                  {isPaid && (
                    <button
                      type="button"
                      onClick={() => setShowCancel(true)}
                      className="rounded-xl border border-line px-4 py-2 text-sm font-bold text-muted hover:border-coral-500/50 hover:text-coral-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )}
          </Panel>

          {/* ── Payment method ──────────────────────────────── */}
          <Panel title="Payment method" icon={CreditCard}>
            {paymentMethod ? (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-line bg-white font-bold text-xs text-navy-950">
                    {paymentMethod.type.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-950">
                      {paymentMethod.type} •••• {paymentMethod.last4}
                    </p>
                    <p className="text-xs text-muted">Expires {paymentMethod.expiry}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowUpdateCard(true); setCardSaved(false); setCardError(""); }}
                  className="flex items-center gap-1.5 rounded-xl border border-line px-4 py-2 text-sm font-bold text-navy-900 hover:bg-blue-50"
                >
                  <RefreshCw size={14} /> Update
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-muted">No payment method on file.</p>
                <button
                  type="button"
                  onClick={() => setShowUpdateCard(true)}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                >
                  Add payment method
                </button>
              </div>
            )}

            {/* Inline card update form */}
            {showUpdateCard && (
              <div className="mt-4 rounded-xl border border-line bg-blue-50/50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-navy-950">
                    {paymentMethod ? "Update card" : "Add card"}
                  </p>
                  <button type="button" onClick={() => setShowUpdateCard(false)}><X size={16} className="text-muted" /></button>
                </div>
                <div className="space-y-3">
                  <CardField label="Cardholder name">
                    <input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Jane Smith" className={inputCls} />
                  </CardField>
                  <CardField label="Card number">
                    <input value={cardNumber}
                      onChange={(e) => { const v = formatCard(e.target.value); setCardNumber(v); if (v.replace(/\s/g, "").length === 16) expiryRef.current?.focus(); }}
                      placeholder="0000 0000 0000 0000" inputMode="numeric" maxLength={19} className={inputCls} />
                  </CardField>
                  <div className="grid grid-cols-2 gap-3">
                    <CardField label="Expiry">
                      <input ref={expiryRef} value={expiry}
                        onChange={(e) => { const v = formatExpiry(e.target.value); setExpiry(v); if (v.length === 5) cvcRef.current?.focus(); }}
                        placeholder="MM/YY" inputMode="numeric" maxLength={5} className={inputCls} />
                    </CardField>
                    <CardField label="CVC">
                      <input ref={cvcRef} value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="123" inputMode="numeric" maxLength={4} className={inputCls} />
                    </CardField>
                  </div>
                </div>
                {cardError && <p className="mt-3 text-sm text-coral-600">{cardError}</p>}
                {cardSaved && (
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-emerald-600">
                    <Check size={15} /> Card updated successfully.
                  </p>
                )}
                <button type="button" onClick={saveCard}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
                  <ShieldCheck size={15} /> Save card
                </button>
              </div>
            )}
          </Panel>

          {/* ── Payment history ─────────────────────────────── */}
          <Panel title="Payment history" icon={FileText}>
            {paymentHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line text-xs font-bold uppercase tracking-wide text-muted">
                      <th className="pb-3 text-left">Date</th>
                      <th className="pb-3 text-left">Description</th>
                      <th className="pb-3 text-right">Amount</th>
                      <th className="pb-3 text-right">Status</th>
                      <th className="pb-3 text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((record) => (
                      <tr key={record.id} className="border-b border-line/60 last:border-0">
                        <td className="py-3 text-muted">{formatDate(record.date)}</td>
                        <td className="py-3 font-medium text-navy-900">{record.description}</td>
                        <td className="py-3 text-right font-semibold">${record.amount.toFixed(2)}</td>
                        <td className="py-3 text-right">
                          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold", STATUS_STYLE[record.status] ?? "")}>
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <Link
                            href={`/checkout/success?plan=${encodeURIComponent(record.description.replace(" Plan", ""))}&total=${record.amount}&order=${record.id.toUpperCase()}`}
                            className="text-xs font-bold text-blue-700 hover:underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted">No payment history yet.</p>
            )}
          </Panel>

          {/* ── Billing policies ────────────────────────────── */}
          <Panel title="Billing policies" icon={ShieldCheck}>
            <div className="space-y-3 text-sm text-muted">
              <PolicyRow title="Cancellation">
                You can cancel your subscription at any time. Access continues until the end of your
                current billing period. No partial refunds are issued.
              </PolicyRow>
              <PolicyRow title="Refunds">
                We offer a 14-day money-back guarantee on first-time employer subscriptions and a
                7-day guarantee on student plans. Contact us at hello@internsstore.com.au to
                request a refund.
              </PolicyRow>
              <PolicyRow title="Auto-renewal">
                Subscriptions automatically renew at the end of each billing period. You will
                receive an email reminder 3 days before renewal.
              </PolicyRow>
              <PolicyRow title="GST">
                All prices shown include 10% Australian GST. A tax invoice is emailed after each
                payment.
              </PolicyRow>
              <PolicyRow title="Security">
                Card details are encrypted and never stored on our servers. Payments are processed
                securely through our payment provider.
              </PolicyRow>
            </div>
          </Panel>
        </div>
      </div>

      {/* ── Cancel confirmation modal ────────────────────────── */}
      {showCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-coral-500/10">
                <AlertTriangle size={18} className="text-coral-600" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-navy-950">
                  Cancel your subscription?
                </h3>
                <p className="mt-2 text-sm text-muted">
                  You will lose access to{" "}
                  <strong className="text-navy-900">{activePlan} plan</strong> features at the
                  end of your current billing period and be moved to the Free plan.
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowCancel(false)}
                className="flex-1 rounded-xl border border-line py-2.5 text-sm font-bold text-navy-900 hover:bg-blue-50"
              >
                Keep my plan
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 rounded-xl bg-coral-500 py-2.5 text-sm font-bold text-white hover:bg-coral-600"
              >
                Yes, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-sm shadow-black/5 transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20";

function Panel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof CreditCard;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <Icon size={17} className="text-blue-600" />
        <h2 className="font-heading text-base font-semibold text-navy-950">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function CardField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-navy-900">{label}</span>
      {children}
    </label>
  );
}

function PolicyRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line/60 pb-3 last:border-0 last:pb-0">
      <p className="mb-1 font-bold text-navy-900">{title}</p>
      <p>{children}</p>
    </div>
  );
}
