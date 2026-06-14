"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { useApp } from "@/lib/store";
import { plans, studentPlans, studentFeatures, employerFeatures, pricingFaqs } from "@/lib/data";
import { Bot } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";

function BillingToggle({ yearly, onChange }: { yearly: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="relative flex rounded-full border border-navy-800 bg-navy-900 p-1">
        <button
          type="button"
          onClick={() => onChange(false)}
          className="relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition"
        >
          {!yearly && (
            <motion.span
              layoutId="pricing-pill"
              className="absolute inset-0 rounded-full bg-blue-600 shadow-lg shadow-blue-600/30"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
            />
          )}
          <span className={cn("relative", !yearly ? "text-white" : "text-white/50")}>Monthly</span>
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          className="relative z-10 flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition"
        >
          {yearly && (
            <motion.span
              layoutId="pricing-pill"
              className="absolute inset-0 rounded-full bg-blue-600 shadow-lg shadow-blue-600/30"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
            />
          )}
          <span className={cn("relative", yearly ? "text-white" : "text-white/50")}>Yearly</span>
          <span className="relative rounded-full bg-coral-500 px-2 py-0.5 text-[0.6rem] font-extrabold uppercase text-white">
            save 2 mo
          </span>
        </button>
      </div>
    </div>
  );
}

function PlanCard({
  name,
  description,
  priceNum,
  yearly,
  period,
  features,
  featured,
  badge,
  isCurrent,
  ctaLabel,
  ctaHref,
  dark,
}: {
  name: string;
  description: string;
  priceNum: number;
  yearly: boolean;
  period: string;
  features: string[];
  featured?: boolean;
  badge?: string;
  isCurrent: boolean;
  ctaLabel: string;
  ctaHref: string;
  dark: boolean;
}) {
  const isMonthly = period === "per month";
  const displayPrice = priceNum === 0 ? 0 : (yearly && isMonthly) ? Math.round(priceNum * 10) : priceNum;
  const suffix = priceNum === 0 ? "" : (yearly && isMonthly) ? "/year" : `/${period.replace("per ", "")}`;

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-[2rem] border p-8 transition",
        dark
          ? featured
            ? "border-blue-600/50 bg-gradient-to-b from-navy-800 to-navy-900 shadow-[0_0_60px_rgba(36,107,254,0.18),inset_0_1px_0_rgba(255,255,255,0.07)]"
            : "border-navy-800 bg-gradient-to-b from-navy-900 to-navy-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          : featured
            ? "border-blue-600 bg-navy-900 text-white shadow-[var(--shadow-glow)]"
            : "border-line bg-white shadow-[var(--shadow-sm)]",
      )}
    >
      {badge && !isCurrent && (
        <span className="absolute right-6 top-6 rounded-full bg-coral-500 px-3 py-1 text-[.62rem] font-extrabold uppercase text-white">
          {badge}
        </span>
      )}
      {isCurrent && (
        <span className="absolute right-6 top-6 rounded-full bg-mint-500/20 px-3 py-1 text-[.62rem] font-extrabold uppercase text-mint-500">
          Current plan
        </span>
      )}

      <div>
        <h2 className={cn("text-xl font-semibold", dark || featured ? "text-white" : "text-navy-950")}>
          {name}
        </h2>
        <p className={cn("mt-2 text-sm leading-6", dark || featured ? "text-white/50" : "text-muted")}>
          {description}
        </p>
      </div>

      <div className="mt-8 flex items-baseline gap-1">
        <span className={cn("font-heading text-5xl font-semibold", dark || featured ? "text-white" : "text-navy-950")}>
          {priceNum === 0 ? (
            "Free"
          ) : (
            <>
              <span className="text-2xl">$</span>
              <NumberFlow value={displayPrice} />
            </>
          )}
        </span>
        <span className={cn("text-sm", dark || featured ? "text-white/40" : "text-muted")}>
          {priceNum > 0 && suffix}
        </span>
      </div>
      {yearly && priceNum > 0 && isMonthly && (
        <AnimatePresence>
          <motion.p
            key="savings"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-xs font-semibold text-mint-500"
          >
            Billed annually · save ${Math.round(priceNum * 2)}/year
          </motion.p>
        </AnimatePresence>
      )}

      <ul className="mt-8 flex-1 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check size={16} className="mt-0.5 shrink-0 text-mint-500" />
            <span className={dark || featured ? "text-white/80" : "text-navy-900"}>{f}</span>
          </li>
        ))}
      </ul>

      {isCurrent ? (
        <Link
          href="/billing"
          className={cn(
            "mt-8 block w-full rounded-full py-3 text-center text-sm font-extrabold transition",
            dark || featured ? "bg-white/10 text-white hover:bg-white/20" : "border border-line hover:bg-blue-50",
          )}
        >
          Manage billing
        </Link>
      ) : (
        <Link
          href={ctaHref}
          className={cn(
            "mt-8 block w-full rounded-full py-3 text-center text-sm font-extrabold transition",
            featured
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500"
              : dark
                ? "border border-navy-700 text-white/80 hover:border-blue-500/50 hover:text-white"
                : "border border-blue-600 text-blue-700 hover:bg-blue-50",
          )}
        >
          {ctaLabel}
        </Link>
      )}
    </article>
  );
}

export function PricingClient() {
  const { user, activePlan } = useApp();
  const [tab, setTab] = useState<"students" | "employers">(
    user?.role === "employer" ? "employers" : "students",
  );
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-20 pt-36 text-center text-white" style={{ background: "linear-gradient(160deg, #061329 0%, #0b1f46 55%, #07152f 100%)" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(36,107,254,0.18), transparent)" }}
        />
        <div className="container-shell relative z-10">
          <span className="eyebrow !text-blue-300">Transparent pricing</span>
          <h1 className="display-title mx-auto mt-5 max-w-3xl">
            Simple plans for<br />
            <span className="text-gradient">students and employers.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/55">
            Students get powerful free tools. Upgrade for career-boosting features.
            Employers hire on flexible plans.
          </p>

          {/* Tab switcher */}
          <div className="mt-10 inline-flex rounded-full border border-navy-800 bg-navy-900/80 p-1 backdrop-blur-sm">
            {(["students", "employers"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "relative rounded-full px-6 py-2.5 text-sm font-bold capitalize transition",
                )}
              >
                {tab === t && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className={cn("relative", tab === t ? "text-navy-950" : "text-white/60")}>
                  {t === "students" ? "For Students" : "For Employers"}
                </span>
              </button>
            ))}
          </div>

          {/* Billing toggle */}
          <div className="mt-6">
            <BillingToggle yearly={yearly} onChange={setYearly} />
          </div>
        </div>
      </section>

      {/* ── STUDENT PLANS ─────────────────────────────────────────────── */}
      {tab === "students" && (
        <>
        <section
          id="students"
          className="section-pad"
          style={{ background: "linear-gradient(180deg, #07152f 0%, #0b1f46 100%)" }}
        >
          <div className="container-shell">
            {user?.role === "student" && activePlan !== "Free" && (
              <div className="mb-8 rounded-2xl border border-blue-800/40 bg-blue-950/40 px-6 py-4 text-sm text-blue-200">
                You are on the <strong>Student {activePlan}</strong> plan.{" "}
                <Link href="/billing" className="font-bold text-blue-400 hover:underline">
                  Manage billing →
                </Link>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-3">
              {studentPlans.map((plan) => {
                const isCurrent = user?.role === "student" && activePlan === plan.name;
                return (
                  <PlanCard
                    key={plan.name}
                    name={`Student ${plan.name}`}
                    description={plan.description}
                    priceNum={plan.priceNum}
                    yearly={yearly}
                    period={plan.period}
                    features={plan.features}
                    featured={plan.featured}
                    badge={plan.badge ?? undefined}
                    isCurrent={isCurrent}
                    ctaLabel={isCurrent ? "Current plan" : plan.ctaLabel}
                    ctaHref={plan.ctaHref}
                    dark={true}
                  />
                );
              })}
            </div>

            <p className="mt-8 text-center text-sm text-white/40">
              All student plans include a 7-day free trial. Cancel any time from your{" "}
              <Link href="/billing" className="font-semibold text-blue-400 hover:underline">billing settings</Link>.
            </p>

            {/* AI bot subtle callout */}
            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-navy-800 bg-navy-900/50 p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-600/20 text-blue-400">
                <Bot size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white/80">AI Career Bot — included in Plus &amp; Pro</p>
                <p className="mt-1 text-xs leading-5 text-white/45">
                  Paid plans unlock your personal AI assistant that helps you find internships, review your CV,
                  prepare for interviews, and answer career questions — available 24/7 in the bottom corner of every page.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Student feature comparison table */}
        <section className="section-pad bg-surface">
          <div className="container-shell">
            <h2 className="mb-2 text-center font-heading text-2xl font-semibold text-navy-950">Compare student plans</h2>
            <p className="mb-8 text-center text-sm text-muted">Everything you get at each tier, side by side.</p>
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-line bg-navy-950 text-white">
                    <th className="w-1/2 px-6 py-4 text-left font-semibold">Feature</th>
                    {studentPlans.map((p) => (
                      <th key={p.name} className={cn("px-4 py-4 text-center font-semibold", p.featured && "bg-blue-700/30")}>
                        {p.name}
                        <span className="ms-1.5 text-xs font-normal text-white/50">{p.price}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {studentFeatures.map((section) => (
                    <>
                      <tr key={section.category} className="border-b border-line bg-blue-50/60">
                        <td colSpan={4} className="px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest text-navy-700">
                          {section.category}
                        </td>
                      </tr>
                      {section.rows.map((row) => (
                        <tr key={row.label} className="border-b border-line last:border-0 hover:bg-blue-50/30">
                          <td className="px-6 py-3.5 font-medium text-navy-900">{row.label}</td>
                          {row.values.map((val, i) => (
                            <td key={i} className={cn("px-4 py-3.5 text-center", studentPlans[i]?.featured && "bg-blue-50/40")}>
                              {val === true ? (
                                <Check size={17} className="mx-auto text-mint-500" />
                              ) : val === false ? (
                                <X size={15} className="mx-auto text-red-400" />
                              ) : (
                                <span className="text-xs font-semibold text-navy-950">{val}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        </>
      )}

      {/* ── EMPLOYER PLANS ────────────────────────────────────────────── */}
      {tab === "employers" && (
        <>
          <section
            id="employers"
            className="section-pad"
            style={{ background: "linear-gradient(180deg, #07152f 0%, #0b1f46 100%)" }}
          >
            <div className="container-shell">
              {user?.role === "employer" && (
                <div className="mb-8 rounded-2xl border border-blue-800/40 bg-blue-950/40 px-6 py-4 text-sm text-blue-200">
                  You are on the <strong>{activePlan}</strong> plan.{" "}
                  <Link href="/billing" className="font-bold text-blue-400 hover:underline">
                    Manage billing →
                  </Link>
                </div>
              )}

              <div className="grid gap-5 lg:grid-cols-3">
                {plans.map((plan) => {
                  const isCurrent = user?.role === "employer" && activePlan === plan.name;
                  return (
                    <PlanCard
                      key={plan.name}
                      name={plan.name}
                      description={plan.description}
                      priceNum={plan.priceNum}
                      yearly={yearly}
                      period={plan.period}
                      features={plan.features}
                      featured={plan.featured}
                      isCurrent={isCurrent}
                      ctaLabel={isCurrent ? "Current plan" : `Choose ${plan.name}`}
                      ctaHref={`/checkout?plan=${plan.name}`}
                      dark={true}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          {/* Feature comparison table */}
          <section className="section-pad bg-surface">
            <div className="container-shell">
              <h2 className="mb-10 text-center font-heading text-2xl font-semibold text-navy-950">
                Compare all features
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-line">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="border-b border-line bg-navy-950 text-white">
                      <th className="w-1/2 px-6 py-4 text-left font-semibold">Feature</th>
                      {plans.map((p) => (
                        <th key={p.name} className="px-4 py-4 text-center font-semibold">
                          {p.name}
                          <span className="ms-1.5 text-xs font-normal text-white/50">{p.price}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {employerFeatures.map((section) => (
                      <>
                        <tr key={section.category} className="border-b border-line bg-blue-50/60">
                          <td colSpan={4} className="px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest text-navy-700">
                            {section.category}
                          </td>
                        </tr>
                        {section.rows.map((row) => (
                          <tr key={row.label} className="border-b border-line last:border-0 hover:bg-blue-50/30">
                            <td className="px-6 py-3.5 font-medium text-navy-900">{row.label}</td>
                            {row.values.map((val, i) => (
                              <td key={i} className="px-4 py-3.5 text-center">
                                {val === true ? (
                                  <Check size={17} className="mx-auto text-mint-500" />
                                ) : val === false ? (
                                  <X size={15} className="mx-auto text-red-400" />
                                ) : (
                                  <span className="font-semibold text-navy-950">{val}</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-6 text-center text-sm text-muted">
                All employer plans include a 14-day money-back guarantee. Questions?{" "}
                <Link href="/contact" className="font-bold text-blue-700 hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </section>
        </>
      )}

      {/* Shared pricing FAQ */}
      <section className="section-pad bg-white">
        <div className="container-shell max-w-3xl">
          <div className="text-center">
            <span className="eyebrow justify-center">Pricing FAQ</span>
            <h2 className="section-title mt-5 text-navy-950">Billing questions, answered.</h2>
          </div>
          <div className="mt-10">
            <Accordion items={[...pricingFaqs]} />
          </div>
        </div>
      </section>
    </div>
  );
}
