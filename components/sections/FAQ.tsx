"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-36 bg-white overflow-hidden">
      <div className="container-px mx-auto max-w-4xl">
        <Reveal className="text-center mb-14">
          <p className="eyebrow mb-4">Frequently Asked Questions</p>
          <h2 className="section-heading">Got questions?<br />We&apos;ve got answers.</h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div
                className={cn(
                  "rounded-xl border transition-all duration-300 overflow-hidden",
                  open === i
                    ? "border-red/30 bg-red/[0.03]"
                    : "border-black/[0.06] bg-black/[0.01] hover:border-black/[0.12]"
                )}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left flex items-center justify-between gap-4 px-6 py-5"
                  aria-expanded={open === i}
                >
                  <span className="font-body font-medium text-[15.5px] text-ink">
                    {faq.q}
                  </span>
                  <span className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300",
                    open === i ? "border-red/50 bg-red/15 text-red rotate-180" : "border-black/10 text-slate-400"
                  )}>
                    <ChevronDown size={14} />
                  </span>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="font-body text-slate-500 text-[14.5px] leading-relaxed px-6 pb-5">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
