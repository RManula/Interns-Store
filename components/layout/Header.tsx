"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Box,
  BriefcaseBusiness,
  ChevronDown,
  CreditCard,
  FileText,
  Globe2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Newspaper,
  Rocket,
  Search,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { cn, initials } from "@/lib/utils";

type MenuItem = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

type NavItem =
  | { label: string; href: string }
  | { label: string; items: MenuItem[] };

const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Students",
    items: [
      { label: "Browse Internships", description: "Find roles built for students", href: "/browse", icon: Search },
      { label: "How It Works", description: "From application to offer", href: "/for-students", icon: BookOpen },
      { label: "Build Your Profile", description: "Stand out to employers", href: "/register", icon: User },
      { label: "Saved & Applications", description: "Track everything in one place", href: "/for-students", icon: FileText },
    ],
  },
  {
    label: "Employers",
    items: [
      { label: "Post an Internship", description: "Reach work-ready students", href: "/post", icon: Rocket },
      { label: "Pricing & Plans", description: "Subscriptions and listing fees", href: "/pricing", icon: Box },
      { label: "Employer Dashboard", description: "Screen and manage applicants", href: "/for-employers", icon: BriefcaseBusiness },
      { label: "Why Interns Store", description: "Australia's internship-only marketplace", href: "/for-employers", icon: Globe2 },
    ],
  },
  {
    label: "Browse",
    items: [
      { label: "By Study Field", description: "Technology, Business, Design and more", href: "/browse?view=field", icon: GraduationCap },
      { label: "By Location", description: "Brisbane, Sydney, Remote and more", href: "/browse?view=location", icon: MapPin },
      { label: "Remote Internships", description: "Work from anywhere", href: "/browse?location=Remote", icon: Globe2 },
      { label: "Newest Listings", description: "See what was just posted", href: "/browse?sort=newest", icon: Newspaper },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Company",
    items: [
      { label: "About", description: "Our mission and team", href: "/about", icon: User },
      { label: "Blog", description: "Tips, news and updates", href: "/blog", icon: FileText },
      { label: "Contact", description: "Get in touch", href: "/contact", icon: Newspaper },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useApp();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const isLight = scrolled || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setActiveMenu(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-all duration-300",
        isLight
          ? "border-b border-line/80 bg-white/92 py-2 shadow-[0_8px_40px_rgba(8,32,75,.08)] backdrop-blur-xl"
          : "bg-navy-950/35 py-3 backdrop-blur-md",
      )}
    >
      <div className="container-shell flex items-center justify-between gap-4">
        <Link
          href="/"
          className={cn(
            "flex shrink-0 items-center gap-2.5 whitespace-nowrap font-heading text-lg font-bold",
            isLight ? "text-navy-900" : "text-white",
          )}
        >
          <span className="grid size-10 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <BriefcaseBusiness size={21} />
          </span>
          Interns Store
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => {
            if ("href" in item) {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition",
                    active
                      ? "bg-blue-50 text-blue-700"
                      : isLight
                        ? "text-navy-900 hover:bg-blue-50 hover:text-blue-700"
                        : "text-white/78 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            const open = activeMenu === item.label;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  className={cn(
                    "flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition",
                    isLight
                      ? "text-navy-900 hover:bg-blue-50 hover:text-blue-700"
                      : "text-white/78 hover:bg-white/10 hover:text-white",
                  )}
                  onClick={() => setActiveMenu(open ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown size={15} className={cn("transition-transform", open && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-1/2 top-full w-[350px] -translate-x-1/2 pt-3"
                    >
                      <div className="rounded-3xl border border-line bg-white p-2.5 shadow-[0_24px_70px_rgba(7,21,47,.2)]">
                        {item.items.map((menuItem) => (
                          <Link
                            key={menuItem.label}
                            href={menuItem.href}
                            onClick={() => setActiveMenu(null)}
                            className="group flex gap-3 rounded-2xl p-3 transition hover:bg-blue-50"
                          >
                            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                              <menuItem.icon size={18} />
                            </span>
                            <span>
                              <span className="block text-sm font-extrabold text-navy-950">{menuItem.label}</span>
                              <span className="mt-0.5 block text-xs leading-5 text-muted">{menuItem.description}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {user ? (
            <div className="relative">
              <button
                type="button"
                aria-expanded={activeMenu === "account"}
                onClick={() => setActiveMenu(activeMenu === "account" ? null : "account")}
                className={cn(
                  "flex items-center gap-2 rounded-full py-1.5 pe-2.5 ps-1.5 text-sm font-bold transition",
                  isLight ? "bg-blue-50 text-navy-900 hover:bg-blue-100" : "bg-white/10 text-white hover:bg-white/20",
                )}
              >
                <span className="grid size-8 place-items-center rounded-full bg-blue-600 text-xs text-white">
                  {initials(user.name)}
                </span>
                {user.name.split(" ")[0]}
                <ChevronDown size={14} className={cn("transition-transform", activeMenu === "account" && "rotate-180")} />
              </button>
              <AnimatePresence>
                {activeMenu === "account" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="absolute end-0 top-full w-60 pt-3"
                  >
                    <div className="rounded-2xl border border-line bg-white p-2 shadow-[0_24px_70px_rgba(7,21,47,.2)]">
                      <div className="px-3 py-2">
                        <p className="text-sm font-bold text-navy-950">{user.name}</p>
                        <p className="truncate text-xs text-muted">{user.email}</p>
                        <span className="mt-1 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[0.62rem] font-extrabold uppercase text-blue-700">
                          {user.role}
                        </span>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy-900 hover:bg-blue-50"
                      >
                        <LayoutDashboard size={16} className="text-blue-600" /> Dashboard
                      </Link>
                      <Link
                        href="/billing"
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy-900 hover:bg-blue-50"
                      >
                        <CreditCard size={16} className="text-blue-600" /> Billing & payments
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setActiveMenu(null);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy-900 hover:bg-coral-500/10 hover:text-coral-600"
                      >
                        <LogOut size={16} /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className={cn(
                "whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-bold transition",
                isLight ? "text-navy-900 hover:bg-blue-50" : "text-white/85 hover:bg-white/10",
              )}
            >
              Sign in
            </Link>
          )}
          <Link
            href={user?.role === "employer" ? "/post" : user ? "/browse" : "/register"}
            className="whitespace-nowrap rounded-full bg-coral-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-coral-500/25 transition hover:-translate-y-0.5 hover:bg-coral-600"
          >
            {user?.role === "employer" ? "Post an Internship" : user ? "Find Internships" : "Join free"}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          className={cn(
            "grid size-11 place-items-center rounded-full lg:hidden",
            isLight ? "bg-blue-50 text-navy-900" : "bg-white/10 text-white",
          )}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="container-shell mt-3 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl border border-line bg-white p-3 shadow-2xl lg:hidden"
          >
            {navigation.map((item) =>
              "href" in item ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-bold text-navy-900 hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.label}
                </Link>
              ) : (
                <div key={item.label} className="border-t border-line first:border-0">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold text-navy-900"
                    onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown size={16} className={cn("transition-transform", activeMenu === item.label && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {activeMenu === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-1 pb-2">
                          {item.items.map((menuItem) => (
                            <Link
                              key={menuItem.label}
                              href={menuItem.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex gap-3 rounded-2xl px-4 py-3 hover:bg-blue-50"
                            >
                              <menuItem.icon size={18} className="mt-0.5 shrink-0 text-blue-600" />
                              <span><strong className="block text-sm text-navy-950">{menuItem.label}</strong><span className="text-xs text-muted">{menuItem.description}</span></span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ),
            )}
            <Link
              href="/post"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block rounded-2xl bg-coral-500 px-4 py-3 text-center text-sm font-bold text-white"
            >
              Post an Internship
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
