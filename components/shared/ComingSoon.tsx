import Link from "next/link";
import { ArrowLeft, ArrowRight, Construction, Sparkles } from "lucide-react";

export function ComingSoon({
  eyebrow,
  title,
  description,
  owner,
}: {
  eyebrow: string;
  title: string;
  description: string;
  owner: string;
}) {
  return (
    <section className="noise mesh-dark relative grid min-h-[78vh] place-items-center overflow-hidden px-4 pb-20 pt-36 text-white">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-blue-600 shadow-[var(--shadow-glow)]">
          <Construction size={28} />
        </span>
        <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100">
          {eyebrow}
        </p>
        <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-6xl">{title}</h1>
        <p className="body-lg mx-auto mt-6 max-w-2xl text-white/62">{description}</p>
        <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-2 text-xs font-bold text-white/60">
          <Sparkles size={15} className="text-coral-500" /> Extension point reserved for {owner}
        </div>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-navy-900">
            <ArrowLeft size={17} /> Back home
          </Link>
          <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-coral-500 px-6 text-sm font-extrabold text-white">
            Contact the team <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
