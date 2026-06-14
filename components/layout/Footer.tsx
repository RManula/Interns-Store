import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { site, social } from "@/lib/siteConfig";
import { socialIconMap } from "@/components/layout/SocialIcons";

const exploreLinks = [
  { label: "Browse internships", href: "/browse" },
  { label: "For students", href: "/for-students" },
  { label: "Career advice", href: "/career-advice" },
  { label: "Companies", href: "/companies" },
  { label: "My profile", href: "/profile" },
  { label: "Pricing / Plans", href: "/pricing" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "For employers", href: "/for-employers" },
  { label: "Help centre", href: "/help" },
  { label: "Contact us", href: "/contact" },
];

const legalLinks = [
  { label: "Safe searching", href: "/security" },
  { label: "Report a listing", href: "/report-listing" },
  { label: "Community guidelines", href: "/community-guidelines" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookie policy", href: "/cookie-policy" },
  { label: "Collection notice", href: "/collection-notice" },
  { label: "Cancellation policy", href: "/cancellation-policy" },
  { label: "Refund policy", href: "/refund-policy" },
  { label: "Accessibility", href: "/accessibility" },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-shell py-16 lg:py-20">
        <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1.3fr_.75fr_.75fr_.85fr_1.05fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 font-heading text-xl font-bold">
              <span className="grid size-11 place-items-center rounded-xl bg-blue-600">
                <BriefcaseBusiness size={22} />
              </span>
              Interns Store
            </Link>
            <p className="mt-5 max-w-sm leading-7 text-white/60">
              Australia&apos;s internships-only marketplace, built for first opportunities
              and the people ready to create them.
            </p>
            <div className="mt-6 flex gap-2">
              {social.map((item) => {
                const Icon = socialIconMap[item.label as keyof typeof socialIconMap];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="grid size-10 place-items-center rounded-full border border-white/12 text-white/70 transition hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                  >
                    {Icon ? <Icon className="size-[17px]" /> : null}
                  </a>
                );
              })}
            </div>
          </div>

          <FooterCol title="Explore" links={exploreLinks} />
          <FooterCol title="Company" links={companyLinks} />
          <FooterCol title="Legal & safety" links={legalLinks} />

          <div>
            <h2 className="font-heading text-xl font-semibold">Internship intelligence, weekly.</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              New roles, application advice and employer insights. No clutter.
            </p>
            <form className="mt-5 flex rounded-full border border-white/15 bg-white/7 p-1.5">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@university.edu.au"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/35"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid size-11 place-items-center rounded-full bg-coral-500 transition hover:bg-coral-600"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-5 py-7 text-xs leading-6 text-white/50 md:flex-row md:items-center md:justify-between">
          <p>ABN {site.abn} · {site.address}</p>
          <p>© 2026 Interns Store. All rights reserved.</p>
        </div>
        <p className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center text-xs text-white/55">
          {site.disclaimer}
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white/45">{title}</h2>
      <div className="mt-5 space-y-3">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block text-sm text-white/65 transition hover:translate-x-1 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
