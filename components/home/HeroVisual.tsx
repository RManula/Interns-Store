"use client";

import { motion } from "framer-motion";
import { CalendarCheck, FileText, LayoutList, Trophy } from "lucide-react";

/* Glossy translucent stat cards arranged around a student photo. */
const cards = [
  { icon: Trophy, title: "First offer secured", sub: "Placement milestone", pos: "left-[-6%] top-[12%]", accent: "text-mint-400" },
  { icon: CalendarCheck, title: "Interview confirmed", sub: "Tuesday · 10:30 AM", pos: "right-[-4%] top-[26%]", accent: "text-blue-300" },
  { icon: FileText, title: "Resume Builder", sub: "Stand out in minutes", pos: "right-[-7%] bottom-[24%]", accent: "text-coral-400" },
  { icon: LayoutList, title: "Application tracker", sub: "Every stage in one place", pos: "left-[-4%] bottom-[10%]", accent: "text-violet-300" },
];

export function HeroVisual() {
  return (
    <div className="group relative mx-auto min-h-[430px] w-full max-w-[460px] lg:min-h-[560px]">
      {/* glow */}
      <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-[90px]" />

      {/* photo */}
      <div className="relative mx-auto h-full w-[78%] overflow-hidden rounded-[2rem] border border-white/15 shadow-[0_30px_90px_rgba(7,21,47,.5)] transition-transform duration-500 group-hover:-translate-y-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
          alt="Student exploring internships on Interns Store"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-blue-600/15" />
      </div>

      {/* glossy cards */}
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
          className={`absolute ${c.pos} w-max max-w-[180px] rounded-2xl border border-white/20 bg-white/10 p-3 shadow-[0_12px_40px_rgba(7,21,47,.35)] backdrop-blur-xl transition duration-500 group-hover:scale-[1.03]`}
        >
          <div className="flex items-center gap-2.5">
            <span className={`grid size-9 shrink-0 place-items-center rounded-xl bg-white/15 ${c.accent}`}>
              <c.icon size={17} />
            </span>
            <span>
              <span className="block text-xs font-extrabold text-white">{c.title}</span>
              <span className="block text-[0.65rem] text-white/65">{c.sub}</span>
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
