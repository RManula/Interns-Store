import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Bot,
  Check,
  CircleDot,
  FileText,
  GraduationCap,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { Accordion } from "@/components/ui/Accordion";
import { MotionSection, StaggerGrid, StaggerItem } from "@/components/ui/MotionSection";
import { studentFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "For Students",
  description:
    "Find beginner-friendly internships, get application guidance and track every opportunity free with Interns Store.",
};

const benefits = [
  { icon: GraduationCap, title: "Always free", text: "Search, save, apply and track without a student subscription." },
  { icon: Target, title: "Internships only", text: "No senior roles or full-time clutter between you and a real placement." },
  { icon: BadgeCheck, title: "Beginner friendly", text: "Clear badges highlight no-experience and first-internship roles." },
  { icon: CircleDot, title: "One clear tracker", text: "See saved, applied, interviewing and offer stages at a glance." },
];

export default function StudentsPage() {
  return (
    <>
      <PageHero
        eyebrow="For students and graduates"
        title="Land the internship that"
        accent="starts your career. Free."
        description="A student-first search, practical application support and one calm place to track every opportunity."
        primary={{ label: "Create a free profile", href: "/register" }}
        secondary={{ label: "Browse internships", href: "/browse" }}
        visual={
          <div className="glass rounded-[2.25rem] p-5 shadow-2xl">
            <div className="rounded-[1.65rem] bg-white p-5 text-ink">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">My applications</p>
                  <p className="mt-1 font-heading text-xl font-semibold">Your next steps</p>
                </div>
                <span className="grid size-10 place-items-center rounded-full bg-blue-50 text-blue-700"><Sparkles size={18} /></span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                {[["Saved", "08"], ["Applied", "04"], ["Interview", "02"]].map(([label, count], i) => (
                  <div key={label} className={`rounded-2xl p-4 ${i === 2 ? "bg-navy-900 text-white" : "bg-blue-50"}`}>
                    <p className="font-heading text-2xl font-bold">{count}</p>
                    <p className={`mt-1 text-[0.65rem] font-extrabold uppercase tracking-wider ${i === 2 ? "text-white/50" : "text-muted"}`}>{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-line p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-mint-500 text-white"><Check size={18} /></span>
                  <div><p className="text-sm font-extrabold">Product Design Intern</p><p className="text-xs text-muted">Interview · Thursday 10:30am</p></div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <MotionSection className="section-pad bg-white">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">A better first search</span>
            <h2 className="section-title mt-5 text-navy-950">Everything a first-time applicant needs. Nothing they don&apos;t.</h2>
          </div>
          <StaggerGrid className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => (
              <StaggerItem key={item.title}>
                <div className="soft-card group h-full p-7 hover:border-blue-500/40">
                  <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white"><item.icon size={22} /></span>
                  <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </MotionSection>

      <MotionSection className="section-pad mesh-light">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <span className="eyebrow">From profile to offer</span>
              <h2 className="section-title mt-5 text-navy-950">A clear path through an unfamiliar process.</h2>
              <p className="body-lg mt-5 text-muted">Each step is designed to reduce uncertainty and make progress visible.</p>
            </div>
            <div className="relative space-y-4 before:absolute before:bottom-10 before:left-7 before:top-10 before:w-px before:bg-blue-100">
              {[
                [FileText, "Create a credible profile", "Use coursework, projects, volunteering and transferable skills."],
                [Search, "Search with internship filters", "Choose duration, paid status, work style, credit eligibility and start date."],
                [ArrowRight, "Apply without repetition", "Reuse verified profile details and tailor the parts that matter."],
                [CircleDot, "Track every outcome", "Stay on top of interviews, tasks, follow-ups and offers."],
              ].map(([Icon, title, text], index) => {
                const StepIcon = Icon as typeof FileText;
                return (
                  <div key={String(title)} className="soft-card relative flex gap-5 p-5 sm:p-7">
                    <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"><StepIcon size={22} /></span>
                    <div><p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Step {index + 1}</p><h3 className="mt-1 text-xl font-semibold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-muted">{String(text)}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-pad bg-navy-950 text-white">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow !text-blue-100">Beginner toolkit</span>
            <h2 className="section-title mt-5">Get help before uncertainty becomes a missed application.</h2>
            <p className="body-lg mt-5 text-white/58">Practical tools explain the process in plain language and help you present your potential without pretending you already have years of experience.</p>
            <div className="mt-8 space-y-4">
              {["First internship CV builder", "Role-specific application checklist", "AI-powered question and interview coach"].map((item) => (
                <p key={item} className="flex items-center gap-3 font-semibold"><span className="grid size-7 place-items-center rounded-full bg-mint-500/15 text-mint-500"><Check size={15} /></span>{item}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-[2rem] p-7 sm:translate-y-8">
              <BookOpenCheck className="text-coral-500" size={30} />
              <h3 className="mt-8 text-2xl font-semibold">CV Lab</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">Turn assignments and projects into evidence employers understand.</p>
            </div>
            <div className="glass rounded-[2rem] p-7">
              <Bot className="text-mint-500" size={30} />
              <h3 className="mt-8 text-2xl font-semibold">Ask Intern</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">Get focused help with a listing, cover letter or upcoming interview.</p>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-pad bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div><span className="eyebrow">Student FAQ</span><h2 className="section-title mt-5 text-navy-950">Good questions, answered clearly.</h2></div>
          <Accordion items={[...studentFaqs]} />
        </div>
      </MotionSection>

      <CTASection
        title="The experience gap closes with one real opportunity."
        text="Create your free profile and start with internships built for where you are now."
        primary={{ label: "Join Interns Store free", href: "/register" }}
        secondary={{ label: "Explore internships", href: "/browse" }}
      />
    </>
  );
}
