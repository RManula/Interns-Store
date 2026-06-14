"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, GraduationCap, Lock, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/store";
import { studentPlans } from "@/lib/data";
import { cn } from "@/lib/utils";

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

function cardType(n: string) {
  const d = n.replace(/\D/g, "");
  if (/^4/.test(d)) return "Visa";
  if (/^5[1-5]/.test(d)) return "Mastercard";
  if (/^3[47]/.test(d)) return "Amex";
  return null;
}

function formatCard(raw: string) {
  return raw.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export function StudentCheckoutClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { ready, user, upgradePlan } = useApp();

  const planName = params.get("plan") ?? "Plus";
  const plan = studentPlans.find((p) => p.name === planName) ?? studentPlans[1];
  const basePrice = plan.priceNum;

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const expiryRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);

  if (!ready) return <div className="py-40 text-center text-muted">Loading…</div>;

  if (!user) {
    router.replace(`/login?next=/checkout/student?plan=${encodeURIComponent(planName)}`);
    return <div className="py-40 text-center text-muted">Redirecting to sign in…</div>;
  }

  const gst = Math.round(basePrice * 0.1 * 100) / 100;
  const total = Math.round((basePrice + gst) * 100) / 100;

  const validate = (): string => {
    if (!cardName.trim()) return "Please enter the cardholder name.";
    const raw = cardNumber.replace(/\s/g, "");
    if (raw.length < 16) return "Please enter a valid 16-digit card number.";
    if (!luhn(raw)) return "Card number is invalid.";
    const [mm, yy] = expiry.split("/");
    if (!mm || !yy || parseInt(mm, 10) < 1 || parseInt(mm, 10) > 12)
      return "Please enter a valid expiry (MM/YY).";
    if (new Date(2000 + parseInt(yy, 10), parseInt(mm, 10) - 1) < new Date())
      return "Your card has expired.";
    if (cvc.replace(/\D/g, "").length < 3) return "Please enter a valid CVC.";
    return "";
  };

  const pay = async () => {
    const msg = validate();
    if (msg) { setError(msg); return; }
    setError("");
    setProcessing(true);

    await new Promise((r) => setTimeout(r, 2200));

    const raw = cardNumber.replace(/\s/g, "");
    const method = { type: cardType(raw) ?? "Card", last4: raw.slice(-4), expiry };
    upgradePlan(plan.name, method, total, `Student ${plan.name} Plan`);

    const orderNum = `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    router.push(
      `/checkout/success?plan=${encodeURIComponent(plan.name)}&total=${total}&order=${orderNum}&type=student`,
    );
  };

  return (
    <div className="min-h-screen bg-surface pb-24 pt-28">
      <div className="container-shell">
        <div className="mb-8">
          <Link href="/pricing#students" className="text-sm font-bold text-blue-700 hover:underline">
            ← Back to pricing
          </Link>
          <h1 className="mt-3 font-heading text-3xl font-semibold text-navy-950">
            Student checkout
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* Card form */}
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-2">
              <GraduationCap size={18} className="text-blue-600" />
              <h2 className="font-heading text-lg font-semibold text-navy-950">Payment details</h2>
            </div>

            <div className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-800">
              <strong>Test environment.</strong> Use card{" "}
              <code className="font-mono">4242 4242 4242 4242</code>, any future expiry, any 3-digit CVC.
            </div>

            <div className="space-y-4">
              <Field label="Cardholder name">
                <input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Jane Smith" autoComplete="cc-name" className={inputCls} />
              </Field>
              <Field label="Card number">
                <div className="relative">
                  <input
                    value={cardNumber}
                    onChange={(e) => {
                      const v = formatCard(e.target.value);
                      setCardNumber(v);
                      if (v.replace(/\s/g, "").length === 16) expiryRef.current?.focus();
                    }}
                    placeholder="0000 0000 0000 0000"
                    inputMode="numeric" autoComplete="cc-number" maxLength={19}
                    className={inputCls}
                  />
                  {cardType(cardNumber) && (
                    <span className="absolute end-3 top-1/2 -translate-y-1/2 rounded bg-navy-950/5 px-2 py-0.5 text-[0.65rem] font-extrabold text-navy-700">
                      {cardType(cardNumber)}
                    </span>
                  )}
                </div>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry">
                  <input ref={expiryRef} value={expiry}
                    onChange={(e) => { const v = formatExpiry(e.target.value); setExpiry(v); if (v.length === 5) cvcRef.current?.focus(); }}
                    placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp" maxLength={5} className={inputCls} />
                </Field>
                <Field label="CVC">
                  <input ref={cvcRef} value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="123" inputMode="numeric" autoComplete="cc-csc" maxLength={4} className={inputCls} />
                </Field>
              </div>
              <Field label="Billing postcode">
                <input value={postcode}
                  onChange={(e) => setPostcode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="4000" inputMode="numeric" autoComplete="postal-code" maxLength={4} className={inputCls} />
              </Field>
            </div>

            {error && (
              <p className="mt-4 rounded-lg bg-coral-500/10 px-4 py-2.5 text-sm font-semibold text-coral-600">{error}</p>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="mb-4 font-heading text-lg font-semibold text-navy-950">Order summary</h2>

              <div className="rounded-xl bg-navy-950 p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-white/50">
                  Student {plan.name}
                </p>
                <p className="mt-1 font-heading text-3xl font-semibold">
                  {plan.price}
                  <span className="ms-1 text-sm font-normal text-white/55">{plan.period}</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-white/75">
                      <Check size={13} className="text-mint-500" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Student {plan.name}</span>
                  <span className="font-semibold">${basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-2">
                  <span className="text-muted">GST (10%)</span>
                  <span className="font-semibold">${gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-base">
                  <span className="font-extrabold text-navy-950">Total due today</span>
                  <span className="font-extrabold text-navy-950">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button" onClick={pay} disabled={processing}
                className={cn(
                  "mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold text-white transition",
                  processing ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700",
                )}
              >
                {processing ? (
                  <><span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Processing…</>
                ) : (
                  <><Lock size={15} /> Pay ${total.toFixed(2)} AUD</>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
                <ShieldCheck size={13} className="text-mint-500" />
                Secured by 256-bit TLS encryption
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              By purchasing you agree to our{" "}
              <Link href="/privacy" className="underline hover:text-navy-900">Terms of Service</Link>.
              Cancel any time from your billing settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-sm shadow-black/5 transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-navy-900">{label}</span>
      {children}
    </label>
  );
}
