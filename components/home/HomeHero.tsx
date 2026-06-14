"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="h-[430px] animate-pulse rounded-[2rem] bg-white/5" />,
});

const MeshBg = dynamic(
  () => import("@paper-design/shaders-react").then((m) => ({ default: m.MeshGradient })),
  { ssr: false },
);

export function HomeHero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 850], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollY, [0, 700], [1, 0.25]);

  return (
    <section className="relative z-20 text-white">
      <div className="noise relative min-h-[850px] overflow-hidden pb-24 pt-32 lg:min-h-[920px] lg:pt-40" style={{ background: "linear-gradient(145deg, #061329 0%, #0b1f46 48%, #102f68 100%)" }}>
        <MeshBg
          className="absolute inset-0 h-full w-full opacity-80"
          colors={["#07152f", "#0b1f46", "#246bfe", "#ff6b4a", "#11336f"]}
          speed={0.18}
        />
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <motion.div style={{ y, opacity }} className="container-shell relative z-10">
          <div className="grid items-center gap-5 lg:grid-cols-[1.08fr_.92fr]">
            <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold text-blue-100 backdrop-blur-xl"
            >
              <Sparkles size={15} className="text-coral-500" />
              Australia&apos;s internship-only marketplace
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08 }}
              className="display-title max-w-4xl"
            >
              Internships only.
              <span className="text-gradient block">Your career starts here.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg"
            >
              Find roles built for students, filter what actually matters, and move from
              first application to first offer with confidence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="/browse">Find an Internship</Button>
              <Button href="/pricing" variant="ghost">
                Post an Internship
              </Button>
            </motion.div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/55">
              <span className="flex items-center gap-2">
                <GraduationCap size={16} className="text-mint-500" /> Always free for students
              </span>
              <span className="flex items-center gap-2">
                <Briefcase size={16} className="text-blue-500" /> Verified employers
              </span>
            </div>
            </div>
            <div className="relative -mx-6 min-h-[430px] lg:mx-0 lg:min-h-[570px]">
              <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[90px]" />
              <HeroScene />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
