"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const current = testimonials[idx];

  return (
    <section className="py-24 md:py-36 bg-slate-50 relative overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10"
        style={{ background: "radial-gradient(ellipse, #DC2626 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }}
      />

      <div className="container-px mx-auto max-w-4xl relative">
        <Reveal className="text-center mb-14">
          <p className="eyebrow mb-4">What Our Customers Say</p>
          <h2 className="section-heading">Trusted by families &amp;<br />businesses for 34+ years.</h2>
        </Reveal>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-3d p-8 md:p-10 text-center max-w-2xl mx-auto"
            >
              {/* Quote icon */}
              <div className="w-12 h-12 rounded-full bg-red/5 border border-red/20 flex items-center justify-center mx-auto mb-6">
                <Quote size={20} className="text-red" />
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-red fill-red" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="font-display text-[20px] md:text-[22px] text-slate-800 leading-[1.6] italic mb-8" style={{ fontWeight: 300 }}>
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-11 h-11 rounded-full bg-red flex items-center justify-center text-white font-body font-semibold text-lg">
                  {current.initial}
                </div>
                <div>
                  <p className="font-body font-medium text-ink text-[15px]">{current.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-slate-400 mt-0.5">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-black/10 hover:border-red/40 flex items-center justify-center transition-all hover:bg-red/5 text-slate-500 hover:text-red"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-red w-6" : "bg-black/10 hover:bg-black/25"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-black/10 hover:border-red/40 flex items-center justify-center transition-all hover:bg-red/5 text-slate-500 hover:text-red"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
