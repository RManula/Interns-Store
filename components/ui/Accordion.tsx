"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export function Accordion({
  items,
}: {
  items: Array<{ q: string; a: string }>;
}) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-line rounded-[1.75rem] border border-line bg-white px-5 shadow-[var(--shadow-sm)] sm:px-8">
      {items.map((item, index) => (
        <div key={item.q}>
          <button
            className="flex w-full items-center justify-between gap-5 py-6 text-left font-heading text-base font-semibold text-navy-900 sm:text-lg"
            onClick={() => setOpen(open === index ? -1 : index)}
            aria-expanded={open === index}
          >
            {item.q}
            <motion.span
              animate={{ rotate: open === index ? 45 : 0 }}
              className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700"
            >
              <Plus size={18} />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="max-w-3xl pb-6 leading-7 text-muted">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
