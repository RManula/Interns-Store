import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, Network, Share2 } from "lucide-react";
import { posts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const related = posts.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <article>
      <header className="mesh-dark px-4 pb-20 pt-36 text-white sm:pt-44">
        <div className="mx-auto max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-blue-100 hover:text-white"><ArrowLeft size={17} />Back to the Internship Edit</Link>
          <div className="mt-10 flex flex-wrap items-center gap-4 text-xs font-extrabold uppercase tracking-wider text-blue-100/70"><span className="rounded-full bg-white/10 px-3 py-1.5">{post.category}</span><span>{formatDate(post.date)}</span><span className="flex items-center gap-1.5"><Clock3 size={14} />{post.read}</span></div>
          <h1 className="mt-7 text-4xl font-bold leading-tight sm:text-6xl">{post.title}</h1>
          <p className="body-lg mt-7 max-w-3xl text-white/62">{post.excerpt}</p>
        </div>
      </header>
      <div className={`mx-auto -mt-8 h-72 max-w-5xl rounded-[2.5rem] bg-gradient-to-br ${post.color} shadow-[var(--shadow-md)] sm:h-[440px]`} />
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 lg:grid-cols-[110px_1fr]">
        <aside className="flex gap-2 lg:flex-col"><button aria-label="Share article" className="grid size-11 place-items-center rounded-full border border-line text-muted hover:bg-blue-50 hover:text-blue-700"><Share2 size={17} /></button><button aria-label="Share on LinkedIn" className="grid size-11 place-items-center rounded-full border border-line text-muted hover:bg-blue-50 hover:text-blue-700"><Network size={17} /></button></aside>
        <div className="max-w-3xl text-[1.05rem] leading-8 text-ink/80">
          <p className="text-xl font-semibold leading-9 text-navy-950">Your first internship application is not a smaller version of an experienced professional&apos;s application. It needs to show potential, direction and evidence that you can learn.</p>
          <h2 className="mt-10 text-3xl font-semibold text-navy-950">Start with evidence, not job titles</h2>
          <p className="mt-5">Coursework, group projects, volunteering, societies and personal builds all demonstrate useful behaviour. The strongest applications explain what you were trying to achieve, what you personally contributed and what changed because of your work.</p>
          <div className="my-9 rounded-[1.75rem] border-l-4 border-blue-600 bg-blue-50 p-7"><p className="font-heading text-xl font-semibold text-navy-950">A useful test: could an employer understand how you think, communicate and finish work after reading this example?</p></div>
          <h2 className="mt-10 text-3xl font-semibold text-navy-950">Make relevance obvious</h2>
          <p className="mt-5">Use the language of the internship listing where it truthfully matches your experience. If the role asks for research, stakeholder communication or data analysis, show the closest real example from your study or projects.</p>
          <h2 className="mt-10 text-3xl font-semibold text-navy-950">Keep the next action simple</h2>
          <p className="mt-5">A clean one-page CV, a focused cover note and a complete student profile are usually more effective than an over-designed document. Clarity helps an employer see your potential faster.</p>
        </div>
      </div>
      <section className="section-pad mesh-light">
        <div className="container-shell"><h2 className="text-3xl font-semibold text-navy-950">Keep learning</h2><div className="mt-8 grid gap-5 md:grid-cols-2">{related.map((item) => <Link key={item.slug} href={`/blog/${item.slug}`} className="soft-card p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"><span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">{item.category}</span><h3 className="mt-4 text-2xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{item.excerpt}</p></Link>)}</div></div>
      </section>
    </article>
  );
}
