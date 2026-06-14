import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/siteConfig";

export type LegalSection = {
  heading: string;
  /** A paragraph (string) or a bullet list (string[]). Mix freely via multiple entries. */
  body: string | string[];
};

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div>
      {/* hero */}
      <section className="mesh-dark px-4 pb-14 pt-32 text-white">
        <div className="container-shell max-w-3xl">
          <span className="eyebrow !text-blue-100">{eyebrow}</span>
          <h1 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-white/65">{intro}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-white/40">
            Last updated {updated}
          </p>
        </div>
      </section>

      {/* body */}
      <section className="bg-surface py-14">
        <div className="container-shell max-w-3xl">
          <article className="space-y-8 rounded-3xl border border-line bg-white p-6 sm:p-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-heading text-lg font-semibold text-navy-950">{s.heading}</h2>
                {Array.isArray(s.body) ? (
                  <ul className="mt-3 space-y-2">
                    {s.body.map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-sm leading-7 text-ink">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-7 text-ink">{s.body}</p>
                )}
              </div>
            ))}

            <p className="border-t border-line pt-6 text-xs leading-6 text-muted">
              {site.disclaimer} Questions? Visit our{" "}
              <Link href="/help" className="font-bold text-blue-700 hover:underline">Help centre</Link> or{" "}
              <Link href="/contact" className="font-bold text-blue-700 hover:underline">contact us</Link>.
            </p>
          </article>

          <Link href="/" className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:underline">
            <ArrowLeft size={15} /> Back home
          </Link>
        </div>
      </section>
    </div>
  );
}
