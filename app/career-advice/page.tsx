import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  GraduationCap,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Career Advice — Interns Store",
  description: "Guides, templates and tips to help students find and succeed in internships.",
};

const categories = [
  { icon: Search, title: "Finding internships", text: "Where to look and how to stand out." },
  { icon: FileText, title: "Resumes & cover letters", text: "Turn coursework into evidence." },
  { icon: MessageSquare, title: "Interview preparation", text: "Practise with the STAR method." },
  { icon: GraduationCap, title: "University placement / WIL", text: "Credit-bearing internship guidance." },
  { icon: ShieldCheck, title: "Cyber safety & scams", text: "Avoid fake listings and stay safe." },
  { icon: Sparkles, title: "First workplace basics", text: "Make a great first impression." },
];

const articles = [
  { title: "How to find your first internship", category: "Finding internships", read: "6 min", href: "/blog/first-internship-cv" },
  { title: "Paid vs unpaid internships explained", category: "Pay & rights", read: "5 min", href: "/blog/paid-vs-unpaid-internships" },
  { title: "Industries hiring interns in 2026", category: "Job market", read: "7 min", href: "/blog/industries-hiring-interns-2026" },
  { title: "How to host a great internship", category: "For employers", read: "8 min", href: "/blog/host-a-great-internship" },
];

const tools = [
  { title: "Résumé builder", text: "Build a student résumé that employers understand.", href: "/register" },
  { title: "Cover letter template", text: "A simple, effective structure to adapt.", href: "/blog/first-internship-cv" },
  { title: "Interview checklist", text: "Everything to prepare before the day.", href: "/blog/host-a-great-internship" },
];

export default function CareerAdvicePage() {
  return (
    <div>
      <section className="mesh-dark px-4 pb-14 pt-32 text-white">
        <div className="container-shell">
          <span className="eyebrow !text-blue-100">Career advice</span>
          <h1 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">
            Advice to help you find and succeed in internships
          </h1>
          <p className="mt-4 max-w-2xl text-white/65">
            Practical guides, templates and tips written for students taking their first steps.
          </p>
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="container-shell">
          {/* categories */}
          <h2 className="font-heading text-xl font-semibold text-navy-950">Browse by topic</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <div key={c.title} className="rounded-2xl border border-line bg-white p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
                  <c.icon size={19} />
                </span>
                <p className="mt-3 font-heading text-sm font-semibold text-navy-950">{c.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{c.text}</p>
              </div>
            ))}
          </div>

          {/* latest articles */}
          <h2 className="mt-12 font-heading text-xl font-semibold text-navy-950">Latest articles</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {articles.map((a) => (
              <Link key={a.title} href={a.href} className="group rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[var(--shadow-sm)]">
                <span className="text-xs font-extrabold uppercase tracking-wide text-blue-700">{a.category}</span>
                <p className="mt-2 font-heading text-base font-semibold text-navy-950 group-hover:text-blue-700">{a.title}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">{a.read} read <ArrowRight size={13} className="transition group-hover:translate-x-1" /></p>
              </Link>
            ))}
          </div>

          {/* tools */}
          <h2 className="mt-12 font-heading text-xl font-semibold text-navy-950">Tools & templates</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {tools.map((t) => (
              <Link key={t.title} href={t.href} className="rounded-2xl border border-line bg-white p-6 transition hover:border-blue-500/40 hover:bg-blue-50/40">
                <p className="font-heading text-sm font-semibold text-navy-950">{t.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{t.text}</p>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-navy-950 p-8 text-center text-white">
            <p className="font-heading text-xl font-semibold">Ready to start applying?</p>
            <p className="mt-2 text-white/65">Search internships built for students across Australia.</p>
            <Link href="/browse" className="mt-5 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">
              Search internships <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
