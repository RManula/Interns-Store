import {
  ArrowRight,
  BadgeCheck,
  Bot,
  FileText,
  GraduationCap,
  ListChecks,
  MapPin,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";
import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import { MotionSection, StaggerGrid, StaggerItem } from "@/components/ui/MotionSection";
import { companies, testimonials } from "@/lib/data";

const steps = [
  { icon: FileText, title: "Create your profile", text: "Add your skills, study and experience once." },
  { icon: Search, title: "Search and filter", text: "Find paid, credit and beginner-friendly roles." },
  { icon: ArrowRight, title: "Apply", text: "Use your profile to apply in a few clicks." },
  { icon: ListChecks, title: "Track to offer", text: "Follow every application in one place." },
];

const features = [
  { icon: GraduationCap, title: "Internships only", text: "Every listing is built for students and new graduates." },
  { icon: Target, title: "Smart matches", text: "See roles that fit your course and interests." },
  { icon: Bot, title: "AI career helper", text: "Get help with listings, your CV and interviews." },
  { icon: ListChecks, title: "Application tracker", text: "Move roles from saved to applied to offer." },
  { icon: FileText, title: "Resume builder", text: "Turn your study and projects into a strong CV." },
  { icon: ShieldCheck, title: "Verified employers", text: "Know who is hiring and what they offer." },
  { icon: BadgeCheck, title: "Clear filters", text: "Check pay, credit, duration and start date upfront." },
  { icon: MapPin, title: "Local and remote", text: "Find roles across Australia or work from home." },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* Trust strip */}
      <section className="border-y border-line bg-white py-12">
        <div className="container-shell text-center">
          <h2 className="section-title text-navy-950">Trusted across Australia</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[["1,200+", "students placed"], ["300+", "verified employers"], ["100%", "internship focused"]].map(([value, label]) => (
              <div key={label}>
                <p className="font-heading text-3xl font-bold text-navy-950">{value}</p>
                <p className="mt-1 text-xs font-extrabold uppercase tracking-widest text-muted">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {companies.map((c) => (
              <CompanyLogo key={c.id} logo={c.logo} name={c.name} color={c.color} size={52} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <MotionSection className="section-pad bg-white">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="section-title text-navy-950">About us</h2>
            <p className="body-lg mt-5 text-muted">
              Interns Store is an Australian marketplace made just for internships. We help students
              and recent graduates find their first real opportunity, and we help employers reach
              motivated, work-ready talent.
            </p>
            <p className="mt-4 text-muted">
              Everything lives in one simple place — search and filter roles, apply with your
              profile, track your applications, and read reviews from other students.
            </p>
            <Link href="/about" className="mt-6 inline-block rounded-full border border-line bg-white px-5 py-2.5 text-sm font-bold text-navy-900 transition hover:bg-blue-50">
              Read more about us
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[["Students first", "Every listing is built for early careers."], ["Verified employers", "Know who is hiring and what they offer."], ["Free to start", "Searching and applying is always free."], ["Local & remote", "Roles across Australia or from home."]].map(([t, d]) => (
              <div key={t} className="soft-card p-5">
                <p className="font-heading text-sm font-semibold text-navy-950">{t}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* How it works — roadmap */}
      <MotionSection className="section-pad mesh-light">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title text-navy-950">How it works</h2>
          </div>
          <div className="relative mt-12 grid gap-8 md:grid-cols-4">
            {/* connecting line (desktop) */}
            <div className="absolute left-[12%] right-[12%] top-7 hidden h-0.5 bg-blue-200 md:block" />
            {steps.map((step, index) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <span className="relative z-10 grid size-14 place-items-center rounded-full bg-blue-600 text-white shadow-[var(--shadow-glow)]">
                  <step.icon size={22} />
                </span>
                <span className="mt-4 text-xs font-extrabold uppercase tracking-widest text-blue-600">Step {index + 1}</span>
                <h3 className="mt-1 font-heading text-lg font-semibold text-navy-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Features */}
      <MotionSection className="section-pad bg-navy-950 text-white">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">Features</h2>
          </div>
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

      {/* Reviews */}
      <MotionSection className="section-pad bg-white">
        <div className="container-shell">
          <div className="mx-auto max-w-2xl text-center"><h2 className="section-title text-navy-950">What students say</h2></div>
          <ReviewsCarousel reviews={testimonials} />
        </div>
      </MotionSection>

      {/* Newsletter */}
      <MotionSection className="section-pad mesh-light">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-2">
          <div><h2 className="section-title text-navy-950">Subscribe to our newsletter</h2><p className="body-lg mt-5 max-w-xl text-muted">Get new internships and helpful tips in your inbox each week.</p></div>
          <NewsletterSignup />
        </div>
      </MotionSection>
    </>
  );
}
