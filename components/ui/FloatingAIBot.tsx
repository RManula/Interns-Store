"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useApp } from "@/lib/store";

type Mood = "normal" | "happy";

/* ──────────────────────────────────────────────────────────────────────────
   BotCharacter — a hand-built SVG recreation of the Rakata 3D assistant bot.
   White glossy squircle head · dark screen w/ cyan corner brackets · glowing
   cyan eyes that track the cursor · blue leaf-ears · detached body with a
   glowing core and blue "drip" collar.
   ──────────────────────────────────────────────────────────────────────── */
function BotCharacter({
  size = 108,
  eye = { x: 0, y: 0 },
  mood = "normal",
  blink = false,
}: {
  size?: number;
  eye?: { x: number; y: number };
  mood?: Mood;
  blink?: boolean;
}) {
  const tilt = Math.max(-4, Math.min(4, eye.x * 0.8));

  return (
    <svg
      width={size}
      height={size * (264 / 220)}
      viewBox="0 0 220 264"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* casing — light from top-left */}
        <linearGradient id="b-head" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#eaf1f9" />
          <stop offset="100%" stopColor="#c2d1e4" />
        </linearGradient>
        <linearGradient id="b-body" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cdd9ea" />
        </linearGradient>
        {/* blue accents (ears / arms / collar) */}
        <linearGradient id="b-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cfe4fc" />
          <stop offset="45%" stopColor="#7fb0e8" />
          <stop offset="100%" stopColor="#4d83cf" />
        </linearGradient>
        <linearGradient id="b-blue2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bcd9fb" />
          <stop offset="100%" stopColor="#5a8fd6" />
        </linearGradient>
        {/* screen */}
        <radialGradient id="b-screen" cx="0.5" cy="0.38" r="0.75">
          <stop offset="0%" stopColor="#26304a" />
          <stop offset="100%" stopColor="#0a0f1c" />
        </radialGradient>
        {/* glowing cyan */}
        <radialGradient id="b-eye" cx="0.42" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#ecffff" />
          <stop offset="45%" stopColor="#79ecf4" />
          <stop offset="100%" stopColor="#34c6dd" />
        </radialGradient>
        <radialGradient id="b-core" cx="0.42" cy="0.35" r="0.75">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#94f0fb" />
          <stop offset="100%" stopColor="#37c0db" />
        </radialGradient>

        <filter id="b-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="7" stdDeviation="7" floodColor="#16315c" floodOpacity="0.28" />
        </filter>
        <filter id="b-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.4" result="g" />
          <feMerge>
            <feMergeNode in="g" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="b-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* ── BODY (drawn first, sits behind/below head) ───────────────────── */}
      <g filter="url(#b-shadow)">
        {/* arms */}
        <path d="M80 184 Q60 182 55 198 Q51 213 59 222 Q66 228 72 219 Q75 205 84 197 Z" fill="url(#b-blue)" />
        <path d="M140 184 Q160 182 165 198 Q169 213 161 222 Q154 228 148 219 Q145 205 136 197 Z" fill="url(#b-blue)" />
        <ellipse cx="64" cy="196" rx="7" ry="4" fill="#ffffff" opacity="0.35" filter="url(#b-soft)" />
        <ellipse cx="156" cy="196" rx="7" ry="4" fill="#ffffff" opacity="0.35" filter="url(#b-soft)" />

        {/* lower egg body */}
        <ellipse cx="110" cy="208" rx="35" ry="31" fill="url(#b-body)" />
        <ellipse cx="98" cy="196" rx="15" ry="9" fill="#ffffff" opacity="0.6" filter="url(#b-soft)" />

        {/* collar / yoke */}
        <path
          d="M84 198 Q75 198 75 187 Q75 169 93 166 Q110 163 127 166 Q145 169 145 187 Q145 198 136 198 Z"
          fill="url(#b-blue2)"
        />
        {/* drip */}
        <path d="M103 196 Q103 213 110 217 Q117 213 117 196 Z" fill="url(#b-blue2)" />
        <ellipse cx="96" cy="176" rx="13" ry="6" fill="#ffffff" opacity="0.35" filter="url(#b-soft)" />

        {/* glowing core */}
        <circle cx="110" cy="183" r="12" fill="#2f5fa8" opacity="0.5" />
        <circle cx="110" cy="183" r="9" fill="url(#b-core)" filter="url(#b-glow)" />
        <circle cx="107" cy="180" r="2.6" fill="#ffffff" opacity="0.9" />
      </g>

      {/* ── HEAD (tilts slightly toward cursor) ──────────────────────────── */}
      <g transform={`rotate(${tilt} 110 112)`}>
        {/* ears — drawn behind the casing */}
        <g filter="url(#b-shadow)">
          {/* left */}
          <path d="M54 104 C42 96 32 78 33 60 C34 53 43 56 47 66 C53 81 60 96 59 107 Z" fill="url(#b-blue)" />
          <ellipse cx="58" cy="120" rx="14" ry="16" fill="url(#b-blue)" />
          <ellipse cx="44" cy="74" rx="3.5" ry="8" fill="#ffffff" opacity="0.4" filter="url(#b-soft)" />
          {/* right */}
          <path d="M166 104 C178 96 188 78 187 60 C186 53 177 56 173 66 C167 81 160 96 161 107 Z" fill="url(#b-blue)" />
          <ellipse cx="162" cy="120" rx="14" ry="16" fill="url(#b-blue)" />
          <ellipse cx="176" cy="74" rx="3.5" ry="8" fill="#ffffff" opacity="0.4" filter="url(#b-soft)" />
        </g>

        {/* casing */}
        <g filter="url(#b-shadow)">
          <rect x="54" y="64" width="112" height="96" rx="33" fill="url(#b-head)" />
          {/* top gloss */}
          <ellipse cx="92" cy="86" rx="34" ry="15" fill="#ffffff" opacity="0.55" filter="url(#b-soft)" />
        </g>

        {/* screen seat + screen */}
        <rect x="67" y="76" width="86" height="68" rx="20" fill="#aebccf" opacity="0.6" />
        <rect x="70" y="78" width="80" height="64" rx="17" fill="url(#b-screen)" />
        {/* screen top reflection */}
        <path d="M80 86 Q110 80 140 86 L140 92 Q110 87 80 92 Z" fill="#ffffff" opacity="0.07" />

        {/* cyan corner brackets */}
        <g stroke="#5fe6f0" strokeWidth="2.6" strokeLinecap="round" fill="none" filter="url(#b-glow)" opacity="0.92">
          <path d="M82 90 L82 96 M82 90 L88 90" />
          <path d="M138 90 L138 96 M138 90 L132 90" />
          <path d="M82 130 L82 124 M82 130 L88 130" />
          <path d="M138 130 L138 124 M138 130 L132 130" />
        </g>

        {/* eyes — translate to follow cursor */}
        <g transform={`translate(${eye.x} ${eye.y})`} filter="url(#b-glow)">
          {blink ? (
            <>
              <rect x="84" y="108" width="20" height="4.5" rx="2.25" fill="#79ecf4" />
              <rect x="116" y="108" width="20" height="4.5" rx="2.25" fill="#79ecf4" />
            </>
          ) : mood === "happy" ? (
            <g stroke="#7df0f6" strokeWidth="6" strokeLinecap="round" fill="none">
              <path d="M84 114 Q94 100 104 114" />
              <path d="M116 114 Q126 100 136 114" />
            </g>
          ) : (
            <>
              <ellipse cx="94" cy="110" rx="10" ry="12.5" fill="url(#b-eye)" />
              <ellipse cx="126" cy="110" rx="10" ry="12.5" fill="url(#b-eye)" />
              <ellipse cx="90.5" cy="105" rx="3" ry="4" fill="#ffffff" opacity="0.85" />
              <ellipse cx="122.5" cy="105" rx="3" ry="4" fill="#ffffff" opacity="0.85" />
            </>
          )}
        </g>
      </g>
    </svg>
  );
}

const TEASERS = [
  "Need help finding an internship? 🎯",
  "Hi! I'm here whenever you're ready 👋",
  "Want me to review your CV? 📄",
  "Ask me anything about internships!",
];

export function FloatingAIBot() {
  const { user, activePlan } = useApp();
  const reduce = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [mood, setMood] = useState<Mood>("normal");
  const [blink, setBlink] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [teaserIdx, setTeaserIdx] = useState(0);
  const botRef = useRef<HTMLDivElement>(null);

  const isPaid = user?.role === "student" && (activePlan === "Plus" || activePlan === "Pro");

  // cursor eye-tracking
  useEffect(() => {
    if (!isPaid || reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = botRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2.4;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const reach = 4;
      setEye({
        x: (dx / dist) * Math.min(reach, dist / 55),
        y: (dy / dist) * Math.min(reach, dist / 55),
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isPaid, reduce]);

  // blink loop
  useEffect(() => {
    if (!isPaid) return;
    const t = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 4200);
    return () => clearInterval(t);
  }, [isPaid]);

  // teaser thought bubble
  useEffect(() => {
    if (!isPaid) return;
    const show = setTimeout(() => setTeaser(true), 3500);
    const cycle = setInterval(() => {
      setTeaser(false);
      setTimeout(() => {
        setTeaserIdx((i) => (i + 1) % TEASERS.length);
        setTeaser(true);
      }, 400);
    }, 7000);
    return () => {
      clearTimeout(show);
      clearInterval(cycle);
    };
  }, [isPaid]);

  if (!isPaid || dismissed) return null;

  return (
    <div ref={botRef} className="fixed bottom-5 right-5 z-50 select-none">
      {/* teaser bubble */}
      <AnimatePresence>
        {teaser && (
          <motion.div
            key={teaserIdx}
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.22 }}
            className="absolute bottom-[78%] right-2 w-48 rounded-2xl rounded-br-sm border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-md)]"
          >
            <p className="text-xs font-semibold leading-5 text-navy-950">{TEASERS[teaserIdx]}</p>
            <span className="absolute -bottom-[7px] right-5 h-0 w-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* floating bot */}
      <motion.button
        type="button"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        onMouseEnter={() => setMood("happy")}
        onMouseLeave={() => setMood("normal")}
        title="AI Career Assistant"
        className="block cursor-pointer transition-transform hover:scale-105"
      >
        <BotCharacter size={104} eye={eye} mood={mood} blink={blink} />
      </motion.button>

      {/* dismiss */}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute -right-1 top-0 grid size-5 place-items-center rounded-full bg-navy-900 text-white/60 shadow hover:bg-navy-800 hover:text-white"
        title="Hide assistant"
      >
        <X size={11} />
      </button>
    </div>
  );
}
