import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Check,
  FileText,
  GraduationCap,
  ListChecks,
  MapPin,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";
import { HomeHero } from "@/components/home/HomeHero";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { InternshipCard } from "@/components/internships/InternshipCard";
import { Button } from "@/components/ui/Button";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { MotionSection, StaggerGrid, StaggerItem } from "@/components/ui/MotionSection";
import { internships, plans, testimonials } from "@/lib/data";

const steps = [
  { icon: FileText, title: "Create your profile", text: "Turn coursework, projects and strengths into a credible first profile." },
  { icon: Search, title: "Search and filter", text: "Find paid, credit-eligible and beginner-friendly roles without the clutter." },
  { icon: ArrowRight, title: "Apply with confidence", text: "Reuse the details that matter and tailor each application clearly." },
  { icon: ListChecks, title: "Track to offer", text: "Keep interviews, tasks and follow-ups organised in one workspace." },
];

const features = [
  { icon: GraduationCap, title: "Internship-only marketplace", text: "Every listing is designed for students and early-career applicants." },
  { icon: Target, title: "AI Smart Match", text: "See roles ranked by course relevance, interests and availability." },
  { icon: Bot, title: "AI Career Chatbot", text: "Ask for listing, CV and interview guidance whenever you need it." },
  { icon: ListChecks, title: "Application Tracker", text: "Move every opportunity from saved to applied, interview and offer." },
  { icon: FileText, title: "Resume Builder", text: "Turn projects and coursework into evidence employers understand." },
  { icon: ShieldCheck, title: "Verified Employers", text: "Know who is hiring and what support the placement includes." },
  { icon: BadgeCheck, title: "Useful placement filters", text: "Check paid status, academic credit, duration and start date upfront." },
  { icon: MapPin, title: "Location and remote search", text: "Find opportunities across Australia or work from anywhere." },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      <section aria-label="Student momentum and platform features"><CinematicHero /></section>

      <section className="relative z-10 border-y border-line bg-white py-8 pt-20">
        <div className="container-shell grid gap-6 text-center sm:grid-cols-3">
          {[["1,200+", "students placed"], ["300+", "verified employers"], ["100%", "internship focused"]].map(([value, label]) => (
            <div key={label}>
              <p className="font-heading text-3xl font-bold text-navy-950">{value}</p>
              <p className="mt-1 text-xs font-extrabold uppercase tracking-widest text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <MotionSection className="section-pad bg-white">
        <div className="container-shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div><span className="eyebrow">Fresh opportunities</span><h2 className="section-title mt-5 text-navy-950">Internships worth opening.</h2></div>
            <Button href="/browse" variant="secondary">Browse all internships</Button>
          </div>
          <StaggerGrid className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {internships.slice(0, 4).map((internship) => <StaggerItem key={internship.id}><InternshipCard internship={internship} /></StaggerItem>)}
          </StaggerGrid>
        </div>
      </MotionSection>

      <MotionSection className="section-pad mesh-light">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center"><span className="eyebrow">How it works</span><h2 className="section-title mt-5 text-navy-950">A clear path from profile to first offer.</h2></div>
          <StaggerGrid className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <StaggerItem key={step.title}>
                <div className="soft-card h-full p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-blue-600 text-white"><step.icon size={21} /></span>
                  <p className="mt-6 text-xs font-extrabold uppercase tracking-widest text-blue-600">Step {index + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </MotionSection>

      <MotionSection className="section-pad bg-white">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="eyebrow">Why Interns Store</span>
            <h2 className="section-title mt-5 text-navy-950">General job boards make students search through the noise.</h2>
            <p className="body-lg mt-6 text-muted">Full-time roles, senior requirements and irrelevant filters bury the opportunities students actually need. We rebuilt the experience around a first internship.</p>
            <Button href="/for-students" variant="secondary" className="mt-8">See the student experience</Button>
          </div>
          <div className="relative grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-line bg-surface p-7 opacity-80">
              <span className="text-xs font-extrabold uppercase tracking-widest text-muted">General job board</span>
              <div className="mt-7 space-y-4">{["5+ years experience", "Senior account manager", "Full-time only"].map((item) => <div key={item} className="rounded-2xl border border-line bg-white p-4 text-sm text-muted">{item}</div>)}</div>
            </div>
            <div className="rounded-[2rem] bg-navy-900 p-7 text-white shadow-[var(--shadow-glow)] sm:translate-y-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-100">Interns Store</span>
              <div className="mt-7 space-y-4">{["No experience required", "Paid · 12 weeks", "Credit eligible"].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/8 p-4 text-sm font-bold"><Check size={17} className="text-mint-500" /> {item}</div>)}</div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-pad bg-navy-950 text-white">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center"><span className="eyebrow !text-blue-100">What we offer</span><h2 className="section-title mt-5">Tools built around the first opportunity.</h2></div>
          <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="h-full rounded-[1.6rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-blue-500/50 hover:bg-white/9">
                  <span className="grid size-12 place-items-center rounded-2xl bg-blue-600/20 text-blue-100"><feature.icon size={22} /></span>
                  <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{feature.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </MotionSection>

      <MotionSection className="section-pad bg-white">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center"><span className="eyebrow">Customer feedback</span><h2 className="section-title mt-5 text-navy-950">First opportunities change everything.</h2></div>
          <StaggerGrid className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <StaggerItem key={item.name}><div className="soft-card h-full p-7"><div className="flex gap-1 text-coral-500" aria-label="5 out of 5 stars">★★★★★</div><blockquote className="mt-6 text-lg font-semibold leading-8 text-navy-950">“{item.quote}”</blockquote><div className="mt-8 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-blue-100 text-xs font-extrabold text-blue-700">{item.initials}</span><div><p className="text-sm font-extrabold">{item.name}</p><p className="text-xs text-muted">{item.role}</p></div></div></div></StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </MotionSection>

      <MotionSection className="section-pad mesh-light">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center"><span className="eyebrow">Employer plans</span><h2 className="section-title mt-5 text-navy-950">Start with one role. Scale when it works.</h2></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative rounded-[2rem] border p-7 transition hover:-translate-y-1 ${plan.featured ? "border-blue-600 bg-navy-900 text-white shadow-[var(--shadow-glow)]" : "border-line bg-white shadow-[var(--shadow-sm)]"}`}>
                {plan.featured && <span className="absolute right-6 top-6 rounded-full bg-coral-500 px-3 py-1 text-[.65rem] font-extrabold uppercase">Most popular</span>}
                <h3 className="text-2xl font-semibold">{plan.name}</h3><p className={`mt-3 text-sm leading-6 ${plan.featured ? "text-white/55" : "text-muted"}`}>{plan.description}</p>
                <p className="mt-7"><strong className="font-heading text-4xl">{plan.price}</strong> <span className={plan.featured ? "text-white/45" : "text-muted"}>{plan.period}</span></p>
                <div className="mt-7 space-y-3">{plan.features.map((feature) => <p key={feature} className="flex items-center gap-3 text-sm font-semibold"><Check size={16} className="text-mint-500" />{feature}</p>)}</div>
                <Button href="/pricing" variant={plan.featured ? "primary" : "secondary"} className="mt-9 w-full">Choose {plan.name}</Button>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-pad bg-white">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
          <div><span className="eyebrow">The internship edit</span><h2 className="section-title mt-5 text-navy-950">New internships in your inbox.</h2><p className="body-lg mt-5 max-w-xl text-muted">Get new roles, application guidance and early-career hiring ideas each week.</p></div>
          <NewsletterSignup />
        </div>
      </MotionSection>
    </>
  );
}
