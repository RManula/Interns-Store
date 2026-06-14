import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { plans } from "@/lib/data";

export const metadata: Metadata = { title: "Pricing & Plans" };

export default function PricingPage() {
  return (
    <>
      <section className="mesh-dark pb-20 pt-36 text-center text-white">
        <div className="container-shell">
          <span className="eyebrow !text-blue-100">Employer pricing</span>
          <h1 className="display-title mx-auto mt-5 max-w-4xl">Simple plans for better early-career hiring.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">Start with one internship listing or build a repeatable student talent pipeline.</p>
        </div>
      </section>
      <section className="section-pad mesh-light">
        <div className="container-shell grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className={`relative rounded-[2rem] border p-8 ${plan.featured ? "border-blue-600 bg-navy-900 text-white shadow-[var(--shadow-glow)]" : "border-line bg-white shadow-[var(--shadow-sm)]"}`}>
              {plan.featured && <span className="absolute right-6 top-6 rounded-full bg-coral-500 px-3 py-1 text-[.65rem] font-extrabold uppercase">Most popular</span>}
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              <p className={`mt-3 text-sm leading-6 ${plan.featured ? "text-white/55" : "text-muted"}`}>{plan.description}</p>
              <p className="mt-8"><strong className="font-heading text-5xl">{plan.price}</strong> <span className={plan.featured ? "text-white/45" : "text-muted"}>{plan.period}</span></p>
              <div className="mt-8 space-y-4">{plan.features.map((feature) => <p key={feature} className="flex items-center gap-3 text-sm font-semibold"><Check size={17} className="text-mint-500" />{feature}</p>)}</div>
              <Button href={`/post?plan=${plan.name.toLowerCase()}`} variant={plan.featured ? "primary" : "secondary"} className="mt-10 w-full">Choose {plan.name}</Button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
