import type { Metadata } from "next";
import {
  BarChart3,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  CircleDollarSign,
  FileCheck2,
  SearchCheck,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { MotionSection, StaggerGrid, StaggerItem } from "@/components/ui/MotionSection";
import { employerFaqs, plans } from "@/lib/data";

export const metadata: Metadata = {
  title: "For Employers",
  description:
    "Reach motivated Australian students, publish better internship listings and hire early-career talent affordably.",
};

export default function EmployersPage() {
  return (
    <>
      <PageHero
        eyebrow="For employers"
        title="Hire work-ready interns,"
        accent="without agency overhead."
        description="Reach motivated students directly, publish a better placement and manage the whole early-career pipeline in one focused workspace."
        primary={{ label: "Post an Internship", href: "/pricing" }}
        secondary={{ label: "Compare plans", href: "/pricing" }}
        visual={
          <div className="glass rounded-[2.25rem] p-5">
            <div className="rounded-[1.65rem] bg-white p-6 text-ink">
              <div className="flex items-center justify-between">
                <div><p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Candidate pipeline</p><h2 className="mt-1 text-xl font-semibold">Product Design Intern</h2></div>
                <span className="rounded-full bg-mint-500/12 px-3 py-1 text-xs font-extrabold text-emerald-700">18 MATCHES</span>
              </div>
              <div className="mt-6 space-y-3">
                {[["MC", "Maya Chen", "92% match"], ["AL", "Amelia Lee", "89% match"], ["IS", "Isaac Singh", "86% match"]].map(([initials, name, match]) => (
                  <div key={name} className="flex items-center gap-3 rounded-2xl border border-line p-3.5">
                    <span className="grid size-10 place-items-center rounded-full bg-blue-100 text-xs font-extrabold text-blue-700">{initials}</span>
                    <div className="min-w-0 flex-1"><p className="text-sm font-extrabold">{name}</p><p className="text-xs text-muted">QUT · Bachelor of Design</p></div>
                    <strong className="text-xs text-blue-700">{match}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <MotionSection className="section-pad bg-white">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center"><span className="eyebrow">A more direct talent channel</span><h2 className="section-title mt-5 text-navy-950">Students are ready to contribute. Reach them where they are looking.</h2></div>
          <StaggerGrid className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              [Users, "Engaged students", "Reach people actively seeking practical experience, not passively browsing jobs."],
              [CircleDollarSign, "Affordable hiring", "Replace broad advertising and agency fees with a focused student audience."],
              [FileCheck2, "Better listings", "Guided fields help you define learning outcomes, supervision and real work."],
              [BadgeCheck, "Verified profiles", "Compare structured education, projects, availability and course relevance."],
            ].map(([Icon, title, text]) => {
              const ItemIcon = Icon as typeof Users;
              return <StaggerItem key={String(title)}><div className="soft-card h-full p-7"><span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700"><ItemIcon size={22} /></span><h3 className="mt-6 text-xl font-semibold">{String(title)}</h3><p className="mt-3 text-sm leading-6 text-muted">{String(text)}</p></div></StaggerItem>;
            })}
          </StaggerGrid>
        </div>
      </MotionSection>

      <MotionSection className="section-pad mesh-light">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Simple by design</span>
            <h2 className="section-title mt-5 text-navy-950">From role idea to intern shortlist in four focused steps.</h2>
            <div className="mt-9 space-y-4">
              {[
                [BriefcaseBusiness, "Build the internship", "Define the work, learning outcomes, duration and support."],
                [Send, "Publish to relevant students", "Target fields, year levels, locations and work styles."],
                [SearchCheck, "Review structured matches", "See course relevance, projects, availability and motivation."],
                [ShieldCheck, "Hire with confidence", "Manage interviews, decisions and communication in one place."],
              ].map(([Icon, title, text], index) => {
                const StepIcon = Icon as typeof Send;
                return <div key={String(title)} className="flex gap-4 rounded-2xl p-3 transition hover:bg-white"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-white">{index + 1}</span><div><h3 className="text-lg font-semibold">{String(title)}</h3><p className="mt-1 text-sm leading-6 text-muted">{String(text)}</p></div><StepIcon className="ml-auto hidden text-blue-100 sm:block" /></div>;
              })}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-navy-900 p-8 text-white sm:p-11">
            <div className="absolute -right-10 -top-10 size-52 rounded-full bg-blue-500/20 blur-3xl" />
            <BarChart3 className="text-mint-500" size={36} />
            <h3 className="mt-8 text-3xl font-semibold">Hiring that gets smarter each time.</h3>
            <p className="mt-4 leading-7 text-white/58">See listing performance, student engagement and candidate movement without turning your internship program into a spreadsheet project.</p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[["248", "Views"], ["42", "Saves"], ["18", "Matches"]].map(([value, label]) => <div key={label} className="rounded-2xl bg-white/7 p-4"><p className="font-heading text-2xl font-bold">{value}</p><p className="mt-1 text-[0.65rem] font-bold uppercase tracking-wider text-white/40">{label}</p></div>)}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-pad bg-white">
        <div className="container-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><span className="eyebrow">Straightforward pricing</span><h2 className="section-title mt-5 text-navy-950">Start with one role. Scale when it works.</h2></div><Button href="/pricing" variant="secondary">Full plan comparison</Button></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative rounded-[2rem] border p-7 ${plan.featured ? "border-blue-600 bg-navy-900 text-white shadow-[var(--shadow-glow)]" : "border-line bg-white shadow-[var(--shadow-sm)]"}`}>
                {plan.featured && <span className="absolute right-6 top-6 rounded-full bg-coral-500 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider">Most popular</span>}
                <h3 className="text-2xl font-semibold">{plan.name}</h3><p className={`mt-3 text-sm leading-6 ${plan.featured ? "text-white/55" : "text-muted"}`}>{plan.description}</p>
                <p className="mt-7"><strong className="font-heading text-4xl">{plan.price}</strong> <span className={plan.featured ? "text-white/45" : "text-muted"}>{plan.period}</span></p>
                <div className="mt-7 space-y-3">{plan.features.map((feature) => <p key={feature} className="flex items-center gap-3 text-sm font-semibold"><Check size={16} className={plan.featured ? "text-mint-500" : "text-blue-600"} />{feature}</p>)}</div>
                <Button href="/pricing" variant={plan.featured ? "primary" : "secondary"} className="mt-9 w-full">Choose {plan.name}</Button>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-pad bg-surface">
        <div className="container-shell">
          <div><span className="eyebrow">Employer FAQ</span><h2 className="section-title mt-5 text-navy-950">Hiring questions, answered.</h2></div>
          <div className="mt-10">
            <Accordion items={[...employerFaqs]} />
          </div>
        </div>
      </MotionSection>

      <CTASection
        title="Build an internship people talk about for the right reasons."
        text="Publish your opportunity, reach relevant students and create a stronger early-career pipeline."
        primary={{ label: "Post an Internship", href: "/pricing" }}
        secondary={{ label: "Talk to our team", href: "/contact" }}
      />
    </>
  );
}
