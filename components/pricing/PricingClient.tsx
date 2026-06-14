"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { useApp } from "@/lib/store";
import { plans, studentPlans, employerFeatures } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PricingClient() {
  const { user, activePlan } = useApp();
  const [tab, setTab] = useState<"students" | "employers">(
    user?.role === "employer" ? "employers" : "students",
  );

  return (
    <div>
      {/* Hero */}
      <section className="mesh-dark pb-16 pt-36 text-center text-white">
        <div className="container-shell">
          <span className="eyebrow !text-blue-100">Transparent pricing</span>
          <h1 className="display-title mx-auto mt-5 max-w-3xl">
            Simple plans for students and employers.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/65">
            Students get powerful free tools. Upgrade for career-boosting features.
            Employers post and hire on flexible plans.
          </p>

          {/* Tab switcher */}
          <div className="mt-10 inline-flex rounded-full bg-white/10 p-1">
            {(["students", "employers"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full px-6 py-2 text-sm font-bold capitalize transition",
                  tab === t ? "bg-white text-navy-950" : "text-white/70 hover:text-white",
                )}
              >
                {t === "students" ? "For Students" : "For Employers"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT TAB ─────────────────────────────────────────────── */}
      {tab === "students" && (
        <section id="students" className="section-pad bg-surface">
          <div className="container-shell">
            {user?.role === "student" && activePlan !== "Free" && (
              <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-4 text-sm">
                You are on the <strong>Student {activePlan}</strong> plan.{" "}
                <Link href="/billing" className="font-bold text-blue-700 hover:underline">
                  Manage billing →
                </Link>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-3">
              {studentPlans.map((plan) => {
                const isCurrent =
                  user?.role === "student" && activePlan === plan.name;
                return (
                  <article
                    key={plan.name}
                    className={cn(
                      "relative rounded-[2rem] border p-8",
                      plan.featured
                        ? "border-blue-600 bg-navy-900 text-white shadow-[var(--shadow-glow)]"
                        : "border-line bg-white shadow-[var(--shadow-sm)]",
                    )}
                  >
                    {plan.badge && (
                      <span className="absolute right-6 top-6 rounded-full bg-coral-500 px-3 py-1 text-[.65rem] font-extrabold uppercase">
                        {plan.badge}
                      </span>
                    )}
                    {isCurrent && (
                      <span className="absolute left-6 top-6 rounded-full bg-mint-500/20 px-3 py-1 text-[.65rem] font-extrabold uppercase text-emerald-600">
                        Current plan
                      </span>
                    )}

                    <h2 className="mt-2 text-2xl font-semibold">Student {plan.name}</h2>
                    <p className={cn("mt-3 text-sm leading-6", plan.featured ? "text-white/55" : "text-muted")}>
                      {plan.description}
                    </p>
                    <p className="mt-8">
                      <strong className="font-heading text-5xl">{plan.price}</strong>
                      <span className={cn("ms-1", plan.featured ? "text-white/45" : "text-muted")}>
                        {plan.period}
                      </span>
                    </p>

                    <ul className="mt-8 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm font-semibold">
                          <Check
                            size={16}
                            className={cn("mt-0.5 shrink-0", plan.featured ? "text-mint-400" : "text-mint-500")}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {isCurrent ? (
                      <Link
                        href="/billing"
                        className={cn(
                          "mt-10 block w-full rounded-full py-3 text-center text-sm font-extrabold transition",
                          plan.featured
                            ? "bg-white/20 text-white hover:bg-white/30"
                            : "border border-line hover:bg-blue-50",
                        )}
                      >
                        Manage billing
                      </Link>
                    ) : (
                      <Link
                        href={plan.priceNum === 0 ? plan.ctaHref : plan.ctaHref}
                        className={cn(
                          "mt-10 block w-full rounded-full py-3 text-center text-sm font-extrabold transition",
                          plan.featured
                            ? "bg-blue-500 text-white hover:bg-blue-400"
                            : "border border-line hover:bg-blue-50",
                        )}
                      >
                        {plan.ctaLabel}
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>

            {/* Student FAQ note */}
            <p className="mt-8 text-center text-sm text-muted">
              All student plans include a 7-day free trial. Cancel any time from your{" "}
              <Link href="/billing" className="font-bold text-blue-700 hover:underline">billing settings</Link>.
            </p>
          </div>
        </section>
      )}

      {/* ── EMPLOYER TAB ────────────────────────────────────────────── */}
      {tab === "employers" && (
        <>
          <section id="employers" className="section-pad bg-surface">
            <div className="container-shell">
              {user?.role === "employer" && (
                <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-4 text-sm">
                  You are on the <strong>{activePlan}</strong> plan.{" "}
                  <Link href="/billing" className="font-bold text-blue-700 hover:underline">
                    Manage billing →
                  </Link>
                </div>
              )}

              {/* Plan cards */}
              <div className="grid gap-5 lg:grid-cols-3">
                {plans.map((plan) => {
                  const isCurrent = user?.role === "employer" && activePlan === plan.name;
                  return (
                    <article
                      key={plan.name}
                      className={cn(
                        "relative rounded-[2rem] border p-8",
                        plan.featured
                          ? "border-blue-600 bg-navy-900 text-white shadow-[var(--shadow-glow)]"
                          : "border-line bg-white shadow-[var(--shadow-sm)]",
                      )}
                    >
                      {plan.featured && !isCurrent && (
                        <span className="absolute right-6 top-6 rounded-full bg-coral-500 px-3 py-1 text-[.65rem] font-extrabold uppercase">
                          Most popular
                        </span>
                      )}
                      {isCurrent && (
                        <span className="absolute right-6 top-6 rounded-full bg-mint-500/20 px-3 py-1 text-[.65rem] font-extrabold uppercase text-emerald-400">
                          Current plan
                        </span>
                      )}

                      <h2 className="text-2xl font-semibold">{plan.name}</h2>
                      <p className={cn("mt-3 text-sm leading-6", plan.featured ? "text-white/55" : "text-muted")}>
                        {plan.description}
                      </p>
                      <p className="mt-8">
                        <strong className="font-heading text-5xl">{plan.price}</strong>
                        <span className={cn("ms-1", plan.featured ? "text-white/45" : "text-muted")}>
                          {plan.period}
                        </span>
                      </p>

                      <ul className="mt-8 space-y-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2.5 text-sm font-semibold">
                            <Check size={16} className={plan.featured ? "text-mint-400" : "text-mint-500"} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      {isCurrent ? (
                        <Link
                          href="/billing"
                          className={cn(
                            "mt-10 block w-full rounded-full py-3 text-center text-sm font-extrabold transition",
                            plan.featured
                              ? "bg-white/20 text-white hover:bg-white/30"
                              : "border border-line hover:bg-blue-50",
                          )}
                        >
                          Manage billing
                        </Link>
                      ) : (
                        <Link
                          href={`/checkout?plan=${plan.name}`}
                          className={cn(
                            "mt-10 block w-full rounded-full py-3 text-center text-sm font-extrabold transition",
                            plan.featured
                              ? "bg-blue-500 text-white hover:bg-blue-400"
                              : "border border-blue-600 text-blue-700 hover:bg-blue-50",
                          )}
                        >
                          Choose {plan.name}
                        </Link>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Feature comparison table */}
          <section className="section-pad bg-white">
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
                          <td
                            colSpan={4}
                            className="px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest text-navy-700"
                          >
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
                                  <X size={15} className="mx-auto text-muted" />
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
    </div>
  );
}
