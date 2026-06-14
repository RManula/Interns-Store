import type { Metadata } from "next";
import Link from "next/link";
import { LifeBuoy, Mail, ShieldAlert } from "lucide-react";

export const metadata: Metadata = { title: "Help Centre — Interns Store" };

const FAQS: { q: string; a: string }[] = [
  { q: "How do I search for internships?", a: "Use the search bar on the Browse page. Filter by keyword, location, study field, work type, pay status and more. Save a search to get alerts." },
  { q: "Do I need an account to apply?", a: "You can browse and save without an account, but you'll be asked to sign in or register before submitting an application." },
  { q: "Is Interns Store free for students?", a: "Yes — the core platform is always free. Plus and Pro plans add extras like the AI career assistant and profile boosts." },
  { q: "How do I edit my profile?", a: "Go to My profile from the account menu, then choose Edit profile. Keep your skills and education current for better matches." },
  { q: "How do employers post an internship?", a: "Sign in as an employer and use Post an internship. The wizard walks you through role details, requirements and review before publishing." },
  { q: "How do I cancel a plan or refund a charge?", a: "Manage your plan from Billing. See our Cancellation policy and Refund policy for details." },
  { q: "I saw a suspicious listing — what do I do?", a: "Use the Report option on the listing, or visit Report a listing. Read Safe internship searching to spot scams." },
];

const CARDS = [
  { icon: ShieldAlert, title: "Safety & scams", text: "Spot fake listings and stay safe.", href: "/security" },
  { icon: LifeBuoy, title: "Report a listing", text: "Flag something that looks wrong.", href: "/report-listing" },
  { icon: Mail, title: "Contact us", text: "Can't find an answer? Get in touch.", href: "/contact" },
];

export default function HelpPage() {
  return (
    <div>
      <section className="mesh-dark px-4 pb-14 pt-32 text-white">
        <div className="container-shell max-w-3xl">
          <span className="eyebrow !text-blue-100">Support</span>
          <h1 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">Help centre</h1>
          <p className="mt-4 max-w-2xl text-white/65">
            Answers to common questions for students and employers. Still stuck? We&apos;re a click away.
          </p>
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="container-shell max-w-3xl">
          {/* quick cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {CARDS.map((c) => (
              <Link key={c.title} href={c.href} className="rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[var(--shadow-sm)]">
                <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
                  <c.icon size={19} />
                </span>
                <p className="mt-3 font-heading text-sm font-semibold text-navy-950">{c.title}</p>
                <p className="mt-1 text-xs text-muted">{c.text}</p>
              </Link>
            ))}
          </div>

          {/* FAQ */}
          <h2 className="mt-12 font-heading text-xl font-semibold text-navy-950">Frequently asked questions</h2>
          <div className="mt-5 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-line bg-white p-5">
                <summary className="cursor-pointer list-none font-heading text-sm font-semibold text-navy-950 marker:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {f.q}
                    <span className="text-blue-600 transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-ink">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
