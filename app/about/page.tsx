import type { Metadata } from "next";
import { ArrowUpRight, Compass, HeartHandshake, Lightbulb, ShieldCheck, Sparkles } from "lucide-react";
import { CTASection } from "@/components/shared/CTASection";
import { MotionSection, StaggerGrid, StaggerItem } from "@/components/ui/MotionSection";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the mission behind Interns Store, Australia's student-first and internships-only marketplace.",
};

export default function AboutPage() {
  return (
    <>
      <section className="noise mesh-dark relative overflow-hidden pb-24 pt-40 text-white lg:pt-48">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container-shell relative">
          <span className="eyebrow !text-blue-100">Our story</span>
          <h1 className="display-title mt-6 max-w-5xl">The first step into a career deserves a platform <span className="text-gradient">built for it.</span></h1>
          <div className="mt-10 grid gap-8 border-t border-white/12 pt-9 lg:grid-cols-2">
            <p className="body-lg text-white/72">Interns Store began with a simple observation: the biggest job platforms treat internships like a small category inside a much larger machine.</p>
            <p className="body-lg text-white/52">We believe first-time applicants and the employers willing to invest in them deserve an experience designed around learning, potential and a strong beginning.</p>
          </div>
        </div>
      </section>

      <MotionSection className="section-pad bg-white">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-2">
          <div className="relative min-h-[500px] overflow-hidden rounded-[2.5rem] bg-blue-50 p-8">
            <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20" />
            <div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/30" />
            <div className="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-blue-600 text-center font-heading text-lg font-bold text-white shadow-[var(--shadow-glow)]">Interns<br />Store</div>
            {["Students", "Employers", "Universities", "Mentors"].map((item, i) => {
              const positions = ["left-6 top-10", "right-5 top-24", "bottom-10 left-12", "bottom-14 right-7"];
              return <span key={item} className={`absolute ${positions[i]} rounded-full border border-line bg-white px-4 py-2 text-xs font-extrabold text-navy-900 shadow-lg`}>{item}</span>;
            })}
          </div>
          <div>
            <span className="eyebrow">Our mission</span>
            <h2 className="section-title mt-5 text-navy-950">Make practical experience easier to find, fairer to access and better to deliver.</h2>
            <p className="body-lg mt-6 text-muted">We connect Australian students and recent graduates with employers offering meaningful, well-structured internships. Students participate free. Employers pay for focused access to early-career talent.</p>
            <p className="body-lg mt-5 text-muted">That model keeps the platform open to students while giving employers a simpler and more affordable alternative to broad job advertising and recruitment agencies.</p>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-pad mesh-light">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center"><span className="eyebrow">What guides us</span><h2 className="section-title mt-5 text-navy-950">Purpose-built beats broadly available.</h2></div>
          <StaggerGrid className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              [Compass, "Student first", "Every feature begins with the reality of a first-time applicant."],
              [HeartHandshake, "Mutual value", "Great internships must benefit both the student and the employer."],
              [ShieldCheck, "Trust by design", "Clear expectations, verified employers and equal-opportunity principles."],
              [Lightbulb, "Practical progress", "Technology should reduce uncertainty, effort and wasted time."],
            ].map(([Icon, title, text]) => {
              const ValueIcon = Icon as typeof Compass;
              return <StaggerItem key={String(title)}><div className="soft-card h-full p-7"><ValueIcon className="text-blue-600" size={28} /><h3 className="mt-7 text-xl font-semibold">{String(title)}</h3><p className="mt-3 text-sm leading-6 text-muted">{String(text)}</p></div></StaggerItem>;
            })}
          </StaggerGrid>
        </div>
      </MotionSection>

      <MotionSection className="section-pad bg-navy-950 text-white">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end"><div><span className="eyebrow !text-blue-100">The team</span><h2 className="section-title mt-5">Built in Brisbane with an Australia-wide ambition.</h2></div><p className="body-lg text-white/55">A multidisciplinary student team combining product, operations, employer growth and digital marketing.</p></div>
          <StaggerGrid className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <StaggerItem key={member.name}>
                <div className="group rounded-[2rem] border border-white/10 bg-white/5 p-6">
                  <div className={`grid aspect-[4/3] place-items-center rounded-[1.5rem] bg-gradient-to-br ${index % 2 ? "from-blue-700 to-mint-500" : "from-blue-500 to-violet-700"} font-heading text-4xl font-bold text-white`}>{member.initials}</div>
                  <div className="mt-6 flex items-start justify-between"><div><h3 className="text-lg font-semibold">{member.name}</h3><p className="mt-1 text-sm text-white/45">{member.role}</p></div><ArrowUpRight className="text-white/25 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" /></div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </MotionSection>

      <MotionSection className="section-pad bg-white">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div><Sparkles className="text-coral-500" size={36} /><h2 className="section-title mt-6 text-navy-950">Our vision is bigger than filling listings.</h2></div>
          <div className="soft-card p-8 sm:p-12"><p className="text-2xl font-semibold leading-relaxed text-navy-950">We want every Australian student to graduate with evidence of what they can do, and every employer to see early-career talent as an investment rather than a risk.</p><p className="mt-6 leading-7 text-muted">Internships are the bridge. Interns Store is building the clearest way across it.</p></div>
        </div>
      </MotionSection>

      <CTASection title="A better beginning creates a stronger career." text="Find your first opportunity or create one worth remembering." primary={{ label: "Browse internships", href: "/browse" }} secondary={{ label: "Post an internship", href: "/pricing" }} />
    </>
  );
}
