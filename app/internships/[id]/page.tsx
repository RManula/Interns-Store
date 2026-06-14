import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Clock3, GraduationCap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { internships } from "@/lib/data";

export function generateStaticParams() {
  return internships.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const internship = internships.find((item) => item.id === id);
  return { title: internship ? `${internship.role} at ${internship.company}` : "Internship" };
}

export default async function InternshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const internship = internships.find((item) => item.id === id);
  if (!internship) notFound();

  return (
    <>
      <section className="mesh-dark pb-20 pt-36 text-white">
        <div className="container-shell">
          <span className="eyebrow !text-blue-100">{internship.company}</span>
          <h1 className="display-title mt-5 max-w-4xl">{internship.role}</h1>
          <div className="mt-7 flex flex-wrap gap-4 text-sm font-semibold text-white/70">
            <span className="flex items-center gap-2"><MapPin size={17} />{internship.location}</span>
            <span className="flex items-center gap-2"><Clock3 size={17} />{internship.mode} · {internship.duration}</span>
            <span className="flex items-center gap-2"><GraduationCap size={17} />{internship.field}</span>
          </div>
        </div>
      </section>
      <section className="section-pad bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <span className="eyebrow">The opportunity</span>
            <h2 className="mt-5 text-3xl font-semibold text-navy-950">Build practical experience with meaningful work.</h2>
            <p className="body-lg mt-5 text-muted">Join {internship.company} for a structured {internship.duration.toLowerCase()} placement. You will contribute to real projects, receive regular feedback and finish with evidence you can take into your next application.</p>
            <h3 className="mt-10 text-xl font-semibold">What you can expect</h3>
            <div className="mt-5 space-y-3">{["Clear learning outcomes and supervision", "Work suited to a first internship", "Regular feedback from an experienced teammate", "A practical project for your portfolio"].map((item) => <p key={item} className="flex items-center gap-3"><Check size={17} className="text-mint-500" />{item}</p>)}</div>
          </div>
          <aside className="soft-card h-fit p-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Application</p>
            <h2 className="mt-3 text-2xl font-semibold">Ready to take the next step?</h2>
            <p className="mt-3 text-sm leading-6 text-muted">Create or update your student profile before applying.</p>
            <Button href="/register" className="mt-7 w-full">Apply now</Button>
            <Button href="/browse" variant="secondary" className="mt-3 w-full">Back to browse</Button>
          </aside>
        </div>
      </section>
    </>
  );
}
