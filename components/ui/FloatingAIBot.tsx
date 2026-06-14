"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useApp } from "@/lib/store";

const MESSAGES = [
  "Let me help you find the perfect internship! 🎯",
  "What are you looking for today?",
  "New listings matching your profile just dropped ✨",
  "Need help preparing for an interview?",
  "Pro tip: add more skills to boost your match score!",
  "Your next opportunity is just a search away 🚀",
  "I can review your CV — just ask me anything!",
];

function BotFace({ eyeX, eyeY, happy }: { eyeX: number; eyeY: number; happy: boolean }) {
  return (
    <svg width="72" height="84" viewBox="0 0 72 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
      <defs>
        <radialGradient id="hg" cx="38%" cy="28%" r="65%">
          <stop offset="0%" stopColor="#4387ff" />
          <stop offset="55%" stopColor="#246bfe" />
          <stop offset="100%" stopColor="#07152f" />
        </radialGradient>
        <radialGradient id="bg2" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1a3a7a" />
          <stop offset="100%" stopColor="#07152f" />
        </radialGradient>
        <radialGradient id="shine" cx="25%" cy="20%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id="antG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b4a" />
          <stop offset="100%" stopColor="rgba(255,107,74,0)" />
        </radialGradient>
        <radialGradient id="ew" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#c8daff" />
        </radialGradient>
        <filter id="gl" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="cb" />
          <feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Antenna */}
      <line x1="36" y1="16" x2="36" y2="6" stroke="#4387ff" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="4" r="5" fill="url(#antG)" filter="url(#gl)" />
      <circle cx="36" cy="4" r="2.5" fill="#ff6b4a" />

      {/* Head */}
      <rect x="8" y="14" width="56" height="42" rx="20" fill="url(#hg)" />
      {/* Shine */}
      <ellipse cx="24" cy="23" rx="14" ry="9" fill="url(#shine)" />

      {/* Visor */}
      <rect x="13" y="20" width="46" height="28" rx="13" fill="#061020" fillOpacity="0.65" />

      {/* Left eye */}
      <circle cx="25" cy="34" r="8.5" fill="url(#ew)" />
      <circle cx="47" cy="34" r="8.5" fill="url(#ew)" />

      {/* Pupils (track cursor) */}
      <circle cx={25 + eyeX} cy={34 + eyeY} r="5" fill="#07152f" />
      <circle cx={23.5 + eyeX} cy={32.5 + eyeY} r="1.8" fill="white" opacity="0.85" />
      <circle cx={47 + eyeX} cy={34 + eyeY} r="5" fill="#07152f" />
      <circle cx={45.5 + eyeX} cy={32.5 + eyeY} r="1.8" fill="white" opacity="0.85" />

      {/* Expression */}
      {happy ? (
        <path d="M 27 44 Q 36 51 45 44" stroke="#4387ff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M 27 46 Q 36 43 45 46" stroke="#4387ff" strokeWidth="2" strokeLinecap="round" fill="none" />
      )}

      {/* Neck */}
      <rect x="30" y="54" width="12" height="7" rx="4" fill="#0b1f46" />

      {/* Body */}
      <rect x="12" y="59" width="48" height="24" rx="14" fill="url(#bg2)" />
      <ellipse cx="28" cy="65" rx="11" ry="5" fill="rgba(255,255,255,0.09)" />

      {/* Body LEDs */}
      <circle cx="26" cy="72" r="2.5" fill="#246bfe" opacity="0.9" filter="url(#gl)" />
      <circle cx="36" cy="72" r="2.5" fill="#22c7a9" opacity="0.9" filter="url(#gl)" />
      <circle cx="46" cy="72" r="2.5" fill="#ff6b4a" opacity="0.9" filter="url(#gl)" />
    </svg>
  );
}

export function FloatingAIBot() {
  const { user, activePlan } = useApp();
  const [msgIdx, setMsgIdx] = useState(0);
  const [showMsg, setShowMsg] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [eyeX, setEyeX] = useState(0);
  const [eyeY, setEyeY] = useState(0);
  const [happy, setHappy] = useState(true);
  const botRef = useRef<HTMLDivElement>(null);

  const isPaid = user?.role === "student" && (activePlan === "Plus" || activePlan === "Pro");

  // Cursor eye tracking
  useEffect(() => {
    if (!isPaid) return;
    const onMove = (e: MouseEvent) => {
      if (!botRef.current) return;
      const rect = botRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const max = 3.5;
      setEyeX((dx / Math.max(dist, 1)) * Math.min(max, dist / 60));
      setEyeY((dy / Math.max(dist, 1)) * Math.min(max, dist / 60));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isPaid]);

  // Show first message after 3s
  useEffect(() => {
    if (!isPaid) return;
    const t = setTimeout(() => setShowMsg(true), 3000);
    return () => clearTimeout(t);
  }, [isPaid]);

  // Cycle messages every 6s
  useEffect(() => {
    if (!isPaid || !showMsg) return;
    const t = setInterval(() => {
      setHappy(false);
      setTimeout(() => {
        setMsgIdx((i) => (i + 1) % MESSAGES.length);
        setHappy(true);
      }, 300);
    }, 6000);
    return () => clearInterval(t);
  }, [isPaid, showMsg]);

  if (!isPaid || dismissed) return null;

  return (
    <div ref={botRef} className="fixed bottom-5 right-5 z-50 select-none">
      {/* Speech bubble */}
      <AnimatePresence>
        {showMsg && (
          <motion.div
            key={msgIdx}
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 4 }}
            transition={{ duration: 0.22 }}
            className="absolute bottom-full right-0 mb-3 w-52 rounded-2xl rounded-br-sm border border-line bg-white p-3.5 shadow-[var(--shadow-md)]"
          >
            <button
              type="button"
              onClick={() => setShowMsg(false)}
              className="absolute right-2 top-2 text-muted hover:text-navy-950"
              aria-label="Close"
            >
              <X size={12} />
            </button>
            <p className="pr-4 text-xs font-semibold leading-5 text-navy-950">
              {MESSAGES[msgIdx]}
            </p>
            {/* Triangle tail */}
            <span className="absolute -bottom-[7px] right-4 h-0 w-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bot */}
      <motion.button
        type="button"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => setShowMsg((v) => !v)}
        title="AI Career Bot"
        className="cursor-pointer"
      >
        <BotFace eyeX={eyeX} eyeY={eyeY} happy={happy} />
      </motion.button>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-navy-900 text-white/60 hover:bg-navy-800 hover:text-white"
        title="Hide bot"
      >
        <X size={10} />
      </button>
    </div>
  );
}
