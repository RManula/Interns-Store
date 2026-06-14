import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { MotionSection, StaggerGrid, StaggerItem } from "@/components/ui/MotionSection";
import { formatDate } from "@/lib/utils";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Internship Guides & News",
  description:
    "Practical internship advice for students and employers, from first CVs to building better placement programs.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <section className="noise mesh-dark relative overflow-hidden pb-20 pt-40 text-white">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container-shell relative">
          <span className="eyebrow !text-blue-100">The internship edit</span>
          <h1 className="display-title mt-6 max-w-4xl">Advice for the opportunity <span className="text-gradient">before the career.</span></h1>
          <p className="body-lg mt-7 max-w-2xl text-white/62">Clear, useful guidance for students navigating their first applications and employers building placements people recommend.</p>
          <div className="mt-9 flex flex-wrap gap-2">
            {["All", "CV Lab", "Market Guide", "Know Your Rights", "For Employers"].map((tag, index) => <span key={tag} className={`rounded-full px-4 py-2 text-xs font-extrabold ${index === 0 ? "bg-white text-navy-900" : "border border-white/15 bg-white/5 text-white/65"}`}>{tag}</span>)}
          </div>
        </div>
      </section>

      <MotionSection className="section-pad bg-white">
        <div className="container-shell">
          <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[2.5rem] border border-line bg-surface shadow-[var(--shadow-sm)] lg:grid-cols-[1.05fr_.95fr]">
            <div className={`relative min-h-[360px] overflow-hidden bg-gradient-to-br ${featured.color} p-9 text-white lg:min-h-[520px]`}>
              <div className="absolute -right-16 -top-16 size-72 rounded-full border border-white/20" />
              <div className="absolute bottom-12 right-12 size-40 rounded-full border border-white/15" />
              <BookOpen className="absolute bottom-10 left-10 text-white/30" size={86} />
              <span className="relative rounded-full bg-white/14 px-4 py-2 text-xs font-extrabold uppercase tracking-wider">{featured.category}</span>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <span className="eyebrow">Featured guide</span>
              <h2 className="mt-6 text-3xl font-semibold leading-tight text-navy-950 sm:text-5xl">{featured.title}</h2>
              <p className="mt-5 text-base leading-8 text-muted">{featured.excerpt}</p>
              <div className="mt-8 flex items-center gap-5 text-xs font-bold text-muted"><span>{formatDate(featured.date)}</span><span className="flex items-center gap-1.5"><Clock3 size={14} />{featured.read}</span></div>
              <span className="mt-9 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">Read guide <ArrowRight className="transition group-hover:translate-x-1" size={17} /></span>
            </div>
          </Link>
        </div>
      </MotionSection>

      <MotionSection className="section-pad mesh-light">
        <div className="container-shell">
          <div className="flex items-end justify-between"><div><span className="eyebrow">Latest thinking</span><h2 className="section-title mt-5 text-navy-950">Built to be useful, not noisy.</h2></div></div>
          <StaggerGrid className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="soft-card group block h-full overflow-hidden">
                  <div className={`relative h-56 bg-gradient-to-br ${post.color} p-6 text-white`}><span className="rounded-full bg-white/15 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-wider">{post.category}</span><BookOpen className="absolute bottom-6 right-6 text-white/25" size={58} /></div>
                  <div className="p-7"><div className="flex items-center gap-4 text-xs font-bold text-muted"><span>{formatDate(post.date)}</span><span>{post.read}</span></div><h3 className="mt-4 text-2xl font-semibold leading-snug text-navy-950">{post.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">Read article <ArrowRight className="transition group-hover:translate-x-1" size={16} /></span></div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </MotionSection>

      <MotionSection className="section-pad bg-white">
        <div className="container-shell grid items-center gap-8 rounded-[2.5rem] bg-blue-600 p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto]">
          <div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-blue-100">Weekly internship intelligence</p><h2 className="mt-4 text-3xl font-semibold">Read less noise. Make better moves.</h2><p className="mt-3 text-white/65">New opportunities and practical guidance, once a week.</p></div>
          <form className="flex min-w-0 rounded-full bg-white p-1.5 sm:min-w-[420px]"><label htmlFor="blog-email" className="sr-only">Email address</label><input id="blog-email" type="email" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-ink" /><button className="rounded-full bg-coral-500 px-6 text-sm font-extrabold text-white hover:bg-coral-600">Subscribe</button></form>
        </div>
      </MotionSection>
    </>
  );
}
