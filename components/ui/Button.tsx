"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light" | "ghost";
  className?: string;
  arrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  arrow = true,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-coral-500 text-white shadow-[0_14px_38px_rgba(255,107,74,.28)] hover:bg-coral-600",
    secondary:
      "bg-blue-600 text-white shadow-[0_14px_38px_rgba(36,107,254,.26)] hover:bg-blue-700",
    light: "bg-white text-navy-900 shadow-xl hover:bg-blue-50",
    ghost:
      "border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/12",
  };

  return (
    <motion.div
      className={cn("inline-flex", className)}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link
        href={href}
        className={cn(
          "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-colors",
          styles[variant],
        )}
      >
        {children}
        {arrow && (
          <ArrowUpRight
            size={17}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </Link>
    </motion.div>
  );
}
