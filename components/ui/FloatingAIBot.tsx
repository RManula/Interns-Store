"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { RotateCcw, Send, Sparkles, X } from "lucide-react";
import { useApp } from "@/lib/store";
import { getReply, suggestionsForPath, TEASERS, welcomeMessage } from "@/lib/botKnowledge";

type Mood = "normal" | "happy";
type ChatMessage = { id: number; role: "bot" | "user"; text: string; ts?: number };

function timeAgo(ts?: number) {
  if (!ts) return "";
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 45) return "Just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const WELCOME = welcomeMessage();

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


export function FloatingAIBot() {
  const { user, activePlan } = useApp();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const suggestions = suggestionsForPath(pathname ?? "/");
  const [dismissed, setDismissed] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [mood, setMood] = useState<Mood>("normal");
  const [blink, setBlink] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [teaserIdx, setTeaserIdx] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 0, role: "bot", text: WELCOME }]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const msgEndRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPaid = user?.role === "student" && (activePlan === "Plus" || activePlan === "Pro");
  const chatKey = user ? `interns-store:chat:${user.id}` : null;
  const firstName = user?.name?.split(" ")[0];

  // restore saved conversation, or greet the student by name
  useEffect(() => {
    if (!chatKey) return;
    try {
      const raw = window.localStorage.getItem(chatKey);
      const parsed = raw ? (JSON.parse(raw) as ChatMessage[]) : null;
      if (Array.isArray(parsed) && parsed.length) {
        setMessages(parsed);
        return;
      }
    } catch {
      /* ignore corrupt history */
    }
    setMessages([{ id: 0, role: "bot", text: welcomeMessage(firstName), ts: Date.now() }]);
  }, [chatKey, firstName]);

  // persist conversation
  useEffect(() => {
    if (!chatKey) return;
    try {
      window.localStorage.setItem(chatKey, JSON.stringify(messages));
    } catch {
      /* storage full or unavailable */
    }
  }, [chatKey, messages]);

  const resetChat = () => {
    setTyping(false);
    setMessages([{ id: 0, role: "bot", text: welcomeMessage(firstName), ts: Date.now() }]);
    if (chatKey) {
      try {
        window.localStorage.removeItem(chatKey);
      } catch {
        /* ignore */
      }
    }
  };

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [...prev, { id: prev.length, role: "user", text: value, ts: Date.now() }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: prev.length, role: "bot", text: getReply(value), ts: Date.now() }]);
    }, 1100);
  };

  // auto-scroll chat to latest
  useEffect(() => {
    if (open) msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  // focus the input when the chat opens, and close on Escape
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            role="dialog"
            aria-modal="false"
            aria-label="Interns AI career assistant chat"
            className="absolute bottom-[112%] right-0 flex h-[min(460px,70vh)] w-[min(340px,calc(100vw-2.5rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_80px_rgba(7,21,47,.32)]"
          >
            {/* header */}
            <div className="flex items-center gap-3 px-4 py-3.5" style={{ background: "linear-gradient(135deg, #0b1f46, #246bfe)" }}>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur">
                <BotCharacter size={30} mood="happy" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-sm font-bold text-white">Interns AI</p>
                <p className="flex items-center gap-1.5 text-[0.68rem] text-white/70">
                  <span className="inline-block size-1.5 rounded-full bg-mint-500" /> Career assistant · Online
                </p>
              </div>
              <button
                type="button"
                onClick={resetChat}
                className="grid size-8 place-items-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white"
                aria-label="Reset conversation"
                title="Reset conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white"
                aria-label="Close chat"
              >
                <X size={17} />
              </button>
            </div>

            {/* messages */}
            <div
              className="flex-1 space-y-3 overflow-y-auto bg-surface px-4 py-4"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((m) => (
                <div key={m.id} className={cnCol(m.role)}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-sm bg-blue-600 px-3.5 py-2.5 text-sm font-medium text-white"
                        : "max-w-[82%] rounded-2xl rounded-bl-sm border border-line bg-white px-3.5 py-2.5 text-sm leading-6 text-navy-900 shadow-sm"
                    }
                  >
                    {m.text}
                  </div>
                  {m.ts && <span className="mt-1 px-1 text-[0.62rem] text-muted">{timeAgo(m.ts)}</span>}
                </div>
              ))}

              {/* typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-line bg-white px-4 py-3 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="size-1.5 rounded-full bg-muted"
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* suggested questions */}
              {messages.length <= 1 && !typing && (
                <div className="pt-1">
                  <p className="mb-2 flex items-center gap-1.5 text-[0.66rem] font-extrabold uppercase tracking-widest text-muted">
                    <Sparkles size={12} className="text-blue-600" /> Popular questions
                  </p>
                  <div className="flex flex-col gap-2">
                    {suggestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        className="rounded-xl border border-line bg-white px-3 py-2 text-left text-xs font-semibold text-navy-900 transition hover:border-blue-500/50 hover:bg-blue-50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={msgEndRef} />
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
              className="flex items-center gap-2 border-t border-line bg-white px-3 py-3"
            >
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask me anything…"
                className="h-11 flex-1 rounded-full border border-line bg-surface px-4 text-sm text-ink outline-none transition focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/20"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-40"
                aria-label="Send"
              >
                <Send size={17} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* teaser bubble (hidden while chat is open) */}
      <AnimatePresence>
        {teaser && !open && (
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
        onClick={() => {
          setOpen((v) => !v);
          setHasOpened(true);
        }}
        title="AI Career Assistant"
        className="relative block cursor-pointer transition-transform hover:scale-105"
      >
        <BotCharacter size={104} eye={open ? { x: 0, y: 0 } : eye} mood={open ? "happy" : mood} blink={blink} />
        {!hasOpened && !open && (
          <span className="absolute right-4 top-3 flex size-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral-500 opacity-75" />
            <span className="relative inline-flex size-3.5 items-center justify-center rounded-full bg-coral-500 text-[0.55rem] font-extrabold text-white">
              1
            </span>
          </span>
        )}
      </motion.button>

      {/* dismiss */}
      {!open && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute -right-1 top-0 grid size-5 place-items-center rounded-full bg-navy-900 text-white/60 shadow hover:bg-navy-800 hover:text-white"
          title="Hide assistant"
        >
          <X size={11} />
        </button>
      )}
    </div>
  );
}

function cnCol(role: "bot" | "user") {
  return role === "user" ? "flex flex-col items-end" : "flex flex-col items-start";
}
