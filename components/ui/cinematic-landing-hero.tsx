"use client";

import React, { useEffect, useRef } from "react";
import {
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  GraduationCap,
  Target,
  Users,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }
  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.045; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }
  .cinematic-grid {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(19,35,63,.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(19,35,63,.06) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
  }
  .text-3d-matte {
    color: #07152f;
    text-shadow: 0 10px 30px rgba(7,21,47,.16), 0 2px 4px rgba(7,21,47,.1);
  }
  .text-silver-matte {
    background: linear-gradient(180deg, #174fcf 0%, #4387ff 52%, #22c7a9 120%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; transform: translateZ(0);
    filter: drop-shadow(0 12px 24px rgba(36,107,254,.18));
  }
  .text-card-silver-matte {
    background: linear-gradient(180deg, #fff 0%, #b9cdf8 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; transform: translateZ(0);
    filter: drop-shadow(0 12px 24px rgba(0,0,0,.8)) drop-shadow(0 4px 8px rgba(0,0,0,.6));
  }
  .premium-depth-card {
    background:
      radial-gradient(circle at 72% 18%, rgba(67,135,255,.26), transparent 30%),
      radial-gradient(circle at 20% 82%, rgba(34,199,169,.12), transparent 28%),
      linear-gradient(145deg, #11336f 0%, #07152f 52%, #050b17 100%);
    box-shadow: 0 40px 100px -20px rgba(0,0,0,.75), 0 20px 40px -20px rgba(0,0,0,.65),
      inset 0 1px 2px rgba(255,255,255,.2), inset 0 -2px 4px rgba(0,0,0,.8);
    border: 1px solid rgba(255,255,255,.06);
    position: relative;
  }
  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,.08), transparent 42%);
    mix-blend-mode: screen;
  }
  .iphone-bezel {
    background-color: #111;
    box-shadow: inset 0 0 0 2px #52525b, inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,.9), 0 15px 25px -5px rgba(0,0,0,.7);
    transform-style: preserve-3d;
  }
  .hardware-btn {
    background: linear-gradient(90deg, #404040, #171717);
    box-shadow: -2px 0 5px rgba(0,0,0,.8), inset -1px 0 1px rgba(255,255,255,.15);
  }
  .screen-glare { background: linear-gradient(110deg, rgba(255,255,255,.08), transparent 45%); }
  .widget-depth {
    background: linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.015));
    box-shadow: 0 10px 20px rgba(0,0,0,.3), inset 0 1px 1px rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.05);
  }
  .floating-ui-badge {
    background: linear-gradient(135deg, rgba(255,255,255,.11), rgba(255,255,255,.025));
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 0 0 1px rgba(255,255,255,.12), 0 25px 50px -12px rgba(0,0,0,.8),
      inset 0 1px 1px rgba(255,255,255,.18);
  }
  .feature-float-a { animation: feature-float 4.8s ease-in-out infinite; }
  .feature-float-b { animation: feature-float 5.4s ease-in-out .7s infinite; }
  .feature-float-c { animation: feature-float 5s ease-in-out 1.3s infinite; }
  @keyframes feature-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-9px); }
  }
  .cinematic-btn {
    transition: transform .3s cubic-bezier(.25,1,.5,1), box-shadow .3s ease, background .3s ease;
  }
  .cinematic-btn:hover { transform: translateY(-3px); }
  .cinematic-btn:active { transform: translateY(1px); }
  .cinematic-btn-light {
    background: linear-gradient(180deg, #fff, #eef4ff); color: #07152f;
    box-shadow: 0 12px 28px -5px rgba(0,0,0,.35), inset 0 1px 1px #fff;
  }
  .cinematic-btn-dark {
    background: linear-gradient(180deg, #246bfe, #174fcf); color: #fff;
    box-shadow: 0 12px 30px -5px rgba(36,107,254,.55), inset 0 1px 1px rgba(255,255,255,.25);
  }
  .progress-ring {
    transform: rotate(-90deg); transform-origin: center;
    stroke-dasharray: 402; stroke-dashoffset: 402; stroke-linecap: round;
  }
  @media (prefers-reduced-motion: reduce) {
    .gsap-reveal { visibility: visible; }
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  brandName = "Interns Store",
  tagline1 = "From first application,",
  tagline2 = "to first opportunity.",
  cardHeading = "Student momentum, made visible.",
  cardDescription = (
    <>
      <span className="font-semibold text-white">Interns Store</span> connects students
      with verified employers, keeps applications organised, and turns early-career
      progress into a journey worth celebrating.
    </>
  ),
  metricValue = 1248,
  metricLabel = "Students Placed",
  ctaHeading = "Your first role is closer.",
  ctaDescription = "Explore internship-first opportunities or meet the students ready to contribute.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 1.6) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (!mainCardRef.current || !mockupRef.current) return;
        const rect = mainCardRef.current.getBoundingClientRect();
        mainCardRef.current.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        mainCardRef.current.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
        gsap.to(mockupRef.current, {
          rotationY: (event.clientX / window.innerWidth - 0.5) * 18,
          rotationX: -(event.clientY / window.innerHeight - 0.5) * 18,
          ease: "power3.out",
          duration: 1.2,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".hero-text-wrapper, .cta-wrapper", { display: "none" });
        gsap.set(
          ".main-card, .card-left-text, .card-right-text, .mockup-scroll-wrapper, .floating-badge, .phone-widget",
          { autoAlpha: 1 },
        );
        gsap.set(".progress-ring", { strokeDashoffset: 60 });
        gsap.set(".counter-val", { innerHTML: metricValue });
        return;
      }

      gsap.set(".text-track", {
        autoAlpha: 0,
        y: 60,
        scale: 0.85,
        filter: "blur(20px)",
        rotationX: -20,
      });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set(
        [".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"],
        { autoAlpha: 0 },
      );
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      gsap
        .timeline({ delay: 0.2 })
        .to(".text-track", {
          duration: 1.6,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotationX: 0,
          ease: "expo.out",
        })
        .to(
          ".text-days",
          { duration: 1.3, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" },
          "-=0.9",
        );

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          [".hero-text-wrapper", ".cinematic-grid"],
          { scale: 1.15, filter: "blur(20px)", opacity: 0.18, duration: 2 },
          0,
        )
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ease: "power3.inOut",
          duration: 1.5,
        })
        .fromTo(
          ".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 },
          "-=0.8",
        )
        .fromTo(
          ".phone-widget",
          { y: 40, autoAlpha: 0, scale: 0.95 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 },
          "-=1.5",
        )
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(
          ".counter-val",
          { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" },
          "-=2",
        )
        .fromTo(
          ".floating-badge",
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, stagger: 0.2, ease: "back.out(1.5)", duration: 1.5 },
          "-=2",
        )
        .fromTo(
          ".card-left-text",
          { x: -50, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 },
          "-=1.5",
        )
        .fromTo(
          ".card-right-text",
          { x: 50, autoAlpha: 0, scale: 0.8 },
          { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 },
          "<",
        )
        .to({}, { duration: 2.2 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1 })
        .to(
          [".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"],
          { scale: 0.9, y: -40, z: -200, autoAlpha: 0, stagger: 0.05, ease: "power3.in", duration: 1.2 },
        )
        .to(
          ".main-card",
          {
            width: isMobile ? "92vw" : "85vw",
            height: isMobile ? "92vh" : "85vh",
            borderRadius: isMobile ? "32px" : "40px",
            ease: "expo.inOut",
            duration: 1.8,
          },
          "pullback",
        )
        .to(
          ".cta-wrapper",
          { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 },
          "pullback",
        )
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden bg-white text-navy-950 antialiased",
        className,
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="cinematic-grid pointer-events-none absolute inset-0 z-0 opacity-60" aria-hidden="true" />

      <div className="hero-text-wrapper absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center [transform-style:preserve-3d]">
        <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
          The placement journey
        </p>
        <h2 className="text-track gsap-reveal text-3d-matte mb-2 text-5xl font-bold tracking-tight md:text-7xl lg:text-[6rem]">
          {tagline1}
        </h2>
        <h2 className="text-days gsap-reveal text-silver-matte text-5xl font-extrabold tracking-tighter md:text-7xl lg:text-[6rem]">
          {tagline2}
        </h2>
      </div>

      <div className="cta-wrapper gsap-reveal pointer-events-auto absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center">
        <h2 className="text-silver-matte mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          {ctaHeading}
        </h2>
        <p className="mb-10 max-w-xl text-lg font-normal leading-relaxed text-muted md:text-xl">
          {ctaDescription}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/browse"
            className="cinematic-btn cinematic-btn-dark flex min-h-14 items-center justify-center gap-3 rounded-2xl px-7 font-extrabold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            <GraduationCap size={22} aria-hidden="true" />
            Find an Internship
          </a>
          <a
            href="/pricing"
            className="cinematic-btn cinematic-btn-light flex min-h-14 items-center justify-center gap-3 rounded-2xl px-7 font-extrabold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            <BriefcaseBusiness size={21} aria-hidden="true" />
            Post an Internship
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card gsap-reveal pointer-events-auto relative flex h-[92vh] w-[92vw] items-center justify-center overflow-hidden rounded-[32px] md:h-[85vh] md:w-[85vw] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-evenly px-4 py-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-12 lg:py-0">
            <div className="card-right-text gsap-reveal order-1 z-20 flex w-full justify-center lg:order-3 lg:justify-end">
              <h2 className="text-card-silver-matte text-center text-5xl font-black uppercase leading-[.85] tracking-tighter md:text-[5.5rem] lg:text-right lg:text-[7rem]">
                {brandName}
              </h2>
            </div>

            <div
              className="mockup-scroll-wrapper order-2 z-10 flex h-[380px] w-full items-center justify-center lg:h-[600px]"
              style={{ perspective: "1000px" }}
            >
              <div className="relative flex h-full w-full scale-[0.65] items-center justify-center md:scale-[0.85] lg:scale-100">
                <div
                  ref={mockupRef}
                  className="iphone-bezel relative flex h-[580px] w-[280px] flex-col rounded-[3rem] [transform-style:preserve-3d] will-change-transform"
                >
                  <div className="hardware-btn absolute -left-[3px] top-[120px] z-0 h-[25px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute -left-[3px] top-[160px] z-0 h-[45px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute -left-[3px] top-[220px] z-0 h-[45px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute -right-[3px] top-[170px] z-0 h-[70px] w-[3px] scale-x-[-1] rounded-r-md" aria-hidden="true" />

                  <div className="absolute inset-[7px] z-10 overflow-hidden rounded-[2.5rem] bg-[#050914] text-white shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
                    <div className="screen-glare pointer-events-none absolute inset-0 z-40" aria-hidden="true" />
                    <div className="absolute left-1/2 top-[5px] z-50 flex h-[28px] w-[100px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-3">
                      <div className="size-1.5 rounded-full bg-mint-500 shadow-[0_0_8px_rgba(34,199,169,.8)]" />
                    </div>

                    <div className="relative flex h-full w-full flex-col px-5 pb-8 pt-12">
                      <div className="phone-widget mb-7 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/45">Today</span>
                          <span className="text-xl font-bold tracking-tight">My applications</span>
                        </div>
                        <div className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-xs font-bold">IS</div>
                      </div>

                      <div className="phone-widget relative mx-auto mb-7 flex size-44 items-center justify-center drop-shadow-[0_15px_25px_rgba(0,0,0,.8)]">
                        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,.04)" strokeWidth="12" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#4387ff" strokeWidth="12" />
                        </svg>
                        <div className="z-10 flex flex-col items-center text-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter">0</span>
                          <span className="mt-0.5 max-w-24 text-[8px] font-bold uppercase tracking-[.1em] text-blue-100/55">
                            {metricLabel}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="phone-widget widget-depth flex items-center rounded-2xl p-3">
                          <div className="mr-3 grid size-10 place-items-center rounded-xl border border-blue-400/20 bg-blue-500/15 text-blue-500">
                            <CheckCircle2 size={18} aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold">Application shortlisted</p>
                            <p className="mt-1 text-[10px] text-white/40">Canopy Labs · Product Intern</p>
                          </div>
                        </div>
                        <div className="phone-widget widget-depth flex items-center rounded-2xl p-3">
                          <div className="mr-3 grid size-10 place-items-center rounded-xl border border-mint-500/20 bg-mint-500/15 text-mint-500">
                            <Users size={18} aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold">New employer match</p>
                            <p className="mt-1 text-[10px] text-white/40">92% aligned with your profile</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-1/2 h-1 w-[120px] -translate-x-1/2 rounded-full bg-white/20" />
                    </div>
                  </div>
                </div>

                <div className="floating-badge floating-ui-badge absolute left-[-15px] top-6 z-30 flex items-center gap-3 rounded-xl p-3 lg:-left-20 lg:top-12 lg:gap-4 lg:rounded-2xl lg:p-4">
                  <div className="grid size-9 place-items-center rounded-full border border-blue-400/30 bg-blue-500/15 text-blue-300 lg:size-10">
                    <GraduationCap size={19} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white lg:text-sm">First offer secured</p>
                    <p className="text-[10px] font-medium text-blue-100/55 lg:text-xs">Placement milestone</p>
                  </div>
                </div>

                <div className="floating-badge floating-ui-badge absolute bottom-12 right-[-15px] z-30 flex items-center gap-3 rounded-xl p-3 lg:-right-20 lg:bottom-20 lg:gap-4 lg:rounded-2xl lg:p-4">
                  <div className="grid size-9 place-items-center rounded-full border border-mint-500/30 bg-mint-500/15 text-mint-500 lg:size-10">
                    <BriefcaseBusiness size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white lg:text-sm">Interview confirmed</p>
                    <p className="text-[10px] font-medium text-blue-100/55 lg:text-xs">Tuesday · 10:30 AM</p>
                  </div>
                </div>

                <div className="floating-badge feature-float-a floating-ui-badge absolute -left-44 top-[42%] z-30 hidden items-center gap-3 rounded-2xl p-4 xl:flex">
                  <div className="grid size-10 place-items-center rounded-full border border-blue-400/30 bg-blue-500/15 text-blue-300">
                    <Bot size={18} aria-hidden="true" />
                  </div>
                  <div><p className="text-sm font-bold text-white">AI Career Chatbot</p><p className="text-xs text-blue-100/55">Ask anything, 24/7</p></div>
                </div>

                <div className="floating-badge feature-float-b floating-ui-badge absolute -right-48 top-[35%] z-30 hidden items-center gap-3 rounded-2xl p-4 xl:flex">
                  <div className="grid size-10 place-items-center rounded-full border border-mint-500/30 bg-mint-500/15 text-mint-500">
                    <Target size={18} aria-hidden="true" />
                  </div>
                  <div><p className="text-sm font-bold text-white">Smart Match</p><p className="text-xs text-blue-100/55">Roles ranked for you</p></div>
                </div>

                <div className="floating-badge feature-float-c floating-ui-badge absolute -right-40 bottom-[3%] z-30 hidden items-center gap-3 rounded-2xl p-4 xl:flex">
                  <div className="grid size-10 place-items-center rounded-full border border-violet-400/30 bg-violet-500/15 text-violet-300">
                    <FileText size={18} aria-hidden="true" />
                  </div>
                  <div><p className="text-sm font-bold text-white">Resume Builder</p><p className="text-xs text-blue-100/55">Stand out in minutes</p></div>
                </div>
              </div>
            </div>

            <div className="card-left-text gsap-reveal order-3 z-20 flex w-full flex-col justify-center px-4 text-center lg:order-1 lg:px-0 lg:text-left">
              <h3 className="mb-0 text-2xl font-bold tracking-tight text-white md:text-3xl lg:mb-5 lg:text-4xl">
                {cardHeading}
              </h3>
              <p className="mx-auto hidden max-w-sm text-sm font-normal leading-relaxed text-blue-100/70 md:block md:text-base lg:mx-0 lg:max-w-none lg:text-lg">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
