"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { plans } from "@/lib/data";
import type { CartAddOn } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EmployerGate } from "@/components/ui/EmployerGate";

const ADD_ONS: CartAddOn[] = [
  { label: "Featured job ad boost", price: 25 },
  { label: "Priority applicant review", price: 15 },
];

function luhn(n: string) {
  const digits = n.replace(/\D/g, "");
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (alt) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
    alt = !alt;
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
  const d = raw.replace(/\D/g, "").slice(0, 16);
  return d.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  if (d.length >= 3) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return d;
}

export function CheckoutClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { ready, user, setCart, clearCart, upgradePlan } = useApp();

  const planName = params.get("plan") ?? "Growth";
  const plan = plans.find((p) => p.name === planName) ?? plans[1];
  const basePrice = parseInt(plan.price.replace(/\D/g, ""), 10);

  const [selectedAddOns, setSelectedAddOns] = useState<CartAddOn[]>([]);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const expiryRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);

  if (!ready) {
    return <div className="py-40 text-center text-muted">Loading…</div>;
  }

  if (!user || user.role !== "employer") {
    return (
      <EmployerGate
        feature="Checkout"
        returnTo={`/checkout?plan=${encodeURIComponent(planName)}`}
      />
    );
  }

  const addOnTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const subtotal = basePrice + addOnTotal;
  const gst = Math.round(subtotal * 0.1 * 100) / 100;
  const total = Math.round((subtotal + gst) * 100) / 100;

  const toggleAddOn = (addOn: CartAddOn) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.label === addOn.label)
        ? prev.filter((a) => a.label !== addOn.label)
        : [...prev, addOn],
    );
  };

  const validate = (): string => {
    if (!cardName.trim()) return "Please enter the cardholder name.";
    const rawCard = cardNumber.replace(/\s/g, "");
    if (rawCard.length < 16) return "Please enter a valid 16-digit card number.";
    if (!luhn(rawCard)) return "Card number is invalid.";
    const [mm, yy] = expiry.split("/");
    if (!mm || !yy || parseInt(mm, 10) < 1 || parseInt(mm, 10) > 12)
      return "Please enter a valid expiry (MM/YY).";
    const expDate = new Date(2000 + parseInt(yy, 10), parseInt(mm, 10) - 1);
    if (expDate < new Date()) return "Your card has expired.";
    if (cvc.replace(/\D/g, "").length < 3) return "Please enter a valid CVC.";
    return "";
  };

  const pay = async () => {
    const msg = validate();
    if (msg) { setError(msg); return; }
    setError("");
    setProcessing(true);

    setCart({ plan: plan.name, basePrice, period: plan.period, addOns: selectedAddOns });

    await new Promise((r) => setTimeout(r, 2200));

    const rawCard = cardNumber.replace(/\s/g, "");
    const method = { type: cardType(rawCard) ?? "Card", last4: rawCard.slice(-4), expiry };
    upgradePlan(plan.name, method, total, `${plan.name} Plan`);

    const orderNum = `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    clearCart();
    router.push(
      `/checkout/success?plan=${encodeURIComponent(plan.name)}&total=${total}&order=${orderNum}`,
    );
  };

  return (
    <div className="min-h-screen bg-surface pt-28 pb-24">
      <div className="container-shell">
        <div className="mb-8">
          <Link href="/pricing" className="text-sm font-bold text-blue-700 hover:underline">
            ← Back to pricing
          </Link>
          <h1 className="mt-3 font-heading text-3xl font-semibold text-navy-950">
            Checkout
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* Payment form */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
              <div className="mb-5 flex items-center gap-2">
                <CreditCard size={18} className="text-blue-600" />
                <h2 className="font-heading text-lg font-semibold text-navy-950">
                  Payment details
                </h2>
              </div>

              {/* Test card info */}
              <div className="mb-5 rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-800">
                <strong>Test environment.</strong> Use card{" "}
                <code className="font-mono">4242 4242 4242 4242</code>, any future expiry, any
                3-digit CVC.
              </div>

              <div className="space-y-4">
                <CardField label="Cardholder name">
                  <input
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Jane Smith"
                    autoComplete="cc-name"
                    className={inputCls}
                  />
                </CardField>

                <CardField label="Card number">
                  <div className="relative">
                    <input
                      value={cardNumber}
                      onChange={(e) => {
                        const v = formatCard(e.target.value);
                        setCardNumber(v);
                        if (v.replace(/\s/g, "").length === 16) expiryRef.current?.focus();
                      }}
                      placeholder="0000 0000 0000 0000"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      maxLength={19}
                      className={inputCls}
                    />
                    {cardType(cardNumber) && (
                      <span className="absolute end-3 top-1/2 -translate-y-1/2 rounded bg-navy-950/5 px-2 py-0.5 text-[0.65rem] font-extrabold text-navy-700">
                        {cardType(cardNumber)}
                      </span>
                    )}
                  </div>
                </CardField>

                <div className="grid grid-cols-2 gap-4">
                  <CardField label="Expiry">
                    <input
                      ref={expiryRef}
                      value={expiry}
                      onChange={(e) => {
                        const v = formatExpiry(e.target.value);
                        setExpiry(v);
                        if (v.length === 5) cvcRef.current?.focus();
                      }}
                      placeholder="MM/YY"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      maxLength={5}
                      className={inputCls}
                    />
                  </CardField>
                  <CardField label="CVC">
                    <input
                      ref={cvcRef}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="123"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      maxLength={4}
                      className={inputCls}
                    />
                  </CardField>
                </div>

                <CardField label="Billing postcode">
                  <input
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="4000"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={4}
                    className={inputCls}
                  />
                </CardField>
              </div>

              {error && (
                <p className="mt-4 rounded-lg bg-coral-500/10 px-4 py-2.5 text-sm font-semibold text-coral-600">
                  {error}
                </p>
              )}
            </div>

            {/* Optional add-ons */}
            {plan.name !== "Scale" && (
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-heading text-lg font-semibold text-navy-950">
                  Optional add-ons
                </h2>
                <div className="space-y-3">
                  {ADD_ONS.map((addOn) => {
                    const active = selectedAddOns.some((a) => a.label === addOn.label);
                    return (
                      <button
                        key={addOn.label}
                        type="button"
                        onClick={() => toggleAddOn(addOn)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl border p-4 text-left transition",
                          active
                            ? "border-blue-600 bg-blue-50"
                            : "border-line hover:border-blue-300",
                        )}
                      >
                        <span>
                          <span className="block text-sm font-bold text-navy-950">
                            {addOn.label}
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-blue-700">
                            +${addOn.price}/mo
                          </span>
                          <span
                            className={cn(
                              "grid size-5 place-items-center rounded-full border transition",
                              active
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-line bg-white",
                            )}
                          >
                            {active && <Check size={12} />}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="mb-4 font-heading text-lg font-semibold text-navy-950">
                Order summary
              </h2>

              <div className="rounded-xl bg-navy-950 p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-white/50">
                  {plan.name} plan
                </p>
                <p className="mt-1 font-heading text-3xl font-semibold">
                  {plan.price}
                  <span className="ms-1 text-sm font-normal text-white/55">{plan.period}</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-white/75">
                      <Check size={13} className="text-mint-500" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">{plan.name} plan</span>
                  <span className="font-semibold">${basePrice}.00</span>
                </div>
                {selectedAddOns.map((a) => (
                  <div key={a.label} className="flex justify-between">
                    <span className="text-muted">{a.label}</span>
                    <span className="font-semibold">+${a.price}.00</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-line pt-2">
                  <span className="text-muted">Subtotal (ex-GST)</span>
                  <span className="font-semibold">${subtotal}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">GST (10%)</span>
                  <span className="font-semibold">${gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-base">
                  <span className="font-extrabold text-navy-950">Total due today</span>
                  <span className="font-extrabold text-navy-950">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={pay}
                disabled={processing}
                className={cn(
                  "mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold text-white transition",
                  processing
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700",
                )}
              >
                {processing ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Processing…
                  </>
                ) : (
                  <>
                    <Lock size={15} /> Pay ${total.toFixed(2)} AUD
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
                <ShieldCheck size={13} className="text-mint-500" />
                Secured by 256-bit TLS encryption
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-muted">
              By completing purchase you agree to our{" "}
              <Link href="/privacy" className="underline hover:text-navy-900">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-sm shadow-black/5 transition focus:border-blue-500 focus:outline-none focus:ring-[3px] focus:ring-blue-500/20";

function CardField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-navy-900">{label}</span>
      {children}
    </label>
  );
}
