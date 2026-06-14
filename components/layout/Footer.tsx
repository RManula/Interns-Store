import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Camera,
  MessageCircle,
  Network,
  Play,
} from "lucide-react";
import { nav, site, social } from "@/lib/siteConfig";

const icons = [Camera, MessageCircle, Network, Play];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-shell py-16 lg:py-20">
        <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1.15fr_.85fr_.85fr_1.2fr]">
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
              {social.map((item, index) => {
                const Icon = icons[index];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="grid size-10 place-items-center rounded-full border border-white/12 text-white/70 transition hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white/45">
              Explore
            </h2>
            <div className="mt-5 space-y-3">
              {nav.slice(0, 5).map((item) => (
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

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white/45">
              Company
            </h2>
            <div className="mt-5 space-y-3">
              {nav.slice(5).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-white/65 transition hover:translate-x-1 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/privacy" className="block text-sm text-white/65 hover:text-white">
                Privacy & safety
              </Link>
            </div>
          </div>

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
