"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Megaphone, Droplet, ShieldCheck, ArrowRight, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

interface DesignItem { title: string; imagePath: string; }
interface CategoryItem { id: string; designs: DesignItem[]; }

const SLIDE_INTERVAL = 4000; // ms between auto-advances

/* ── Auto-sliding carousel for the signature card's images ──────────────
   Fetches the "signature-card" category from the same manifest the
   Gallery uses, so adding/removing images there updates this automatically.
   Every slide sits inside a fixed-height stage with object-contain, so
   portrait and landscape designs never fight each other for layout. ── */
function SignatureCarousel() {
  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/manifest.json")
      .then((r) => r.json())
      .then((data: CategoryItem[]) => {
        const cat = data.find((c) => c.id === "signature-card");
        setDesigns(cat?.designs ?? []);
      })
      .catch((e) => console.error("manifest load error", e))
      .finally(() => setIsLoading(false));
  }, []);

  const next = useCallback(() => setIndex((i) => (designs.length ? (i + 1) % designs.length : 0)), [designs.length]);
  const prev = useCallback(() => setIndex((i) => (designs.length ? (i - 1 + designs.length) % designs.length : 0)), [designs.length]);

  useEffect(() => {
    if (paused || designs.length <= 1) return;
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next, designs.length]);

  if (isLoading) {
    return (
      <div className="h-[380px] md:h-[440px] flex items-center justify-center rounded-2xl bg-white/50 border border-dashed border-black/10">
        <div className="w-8 h-8 rounded-full border-2 border-red/20 border-t-red animate-spin" />
      </div>
    );
  }
  if (designs.length === 0) return null;

  const current = designs[index];

  return (
    <div
      className="relative max-w-md mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* fixed-height stage — every slide, whatever its orientation, fits inside this same box */}
      <div className="relative h-[380px] md:h-[440px] rounded-2xl overflow-hidden bg-white shadow-card-3d flex items-center justify-center p-5">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={current.imagePath}
            alt={current.title}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-full max-h-full object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
          />
        </AnimatePresence>

        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-sm border border-white/15">
          {index % 2 === 0 ? <Camera size={10} color="#fff" strokeWidth={2.5} /> : <Megaphone size={10} color="#fff" strokeWidth={2.5} />}
          <span className="font-mono text-[9px] uppercase tracking-wider text-white truncate max-w-[160px]">{current.title}</span>
        </div>

        {designs.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous design"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-black/[0.06] flex items-center justify-center hover:bg-white transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} aria-label="Next design"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-black/[0.06] flex items-center justify-center hover:bg-white transition-colors">
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* dot indicators */}
      {designs.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {designs.map((d, i) => (
            <button
              key={d.title + i}
              onClick={() => setIndex(i)}
              aria-label={`Show ${d.title}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === index ? 20 : 6, backgroundColor: i === index ? "#DC2626" : "rgba(0,0,0,0.15)" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const features = [
  {
    icon: Droplet,
    title: "Kumkum & Veepothi Cover",
    body: "Doubles as a kovil kumkum and veepothi cover.",
  },
  {
    icon: ShieldCheck,
    title: "Lamination Finish",
    body: "Survives daily handling and years of use.",
  },
];

export function Signature() {
  return (
    <section
      id="signature"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #F3F3F6 100%)" }}
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] -translate-y-1/4 translate-x-1/4 opacity-10"
        style={{ background: "radial-gradient(circle, #DC2626 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }}
      />

      <div className="container-px mx-auto max-w-5xl relative">

        {/* ── Header — centered, product-spotlight style ── */}
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow mb-4">Our Flagship Product</p>
          <h2 className="section-heading mb-4">
            The 2.5″ × 3.5″ signature card.
          </h2>
          <p className="font-body text-slate-550 text-[16px] leading-relaxed">
            Front: a swamy photo people keep for years. Back: your advertisement,
            seen every time it&apos;s opened.
          </p>
        </Reveal>

        {/* ── Auto-sliding carousel of every signature card design ── */}
        <Reveal className="mb-14">
          <SignatureCarousel />
        </Reveal>

        {/* ── Front vs Back explained — compact, no images this time ── */}
        <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-3xl mx-auto">
          <Reveal className="flex gap-3">
            <span className="flex-shrink-0 w-9 h-9 rounded-full bg-red/10 text-red flex items-center justify-center mt-0.5">
              <Camera size={16} strokeWidth={2} />
            </span>
            <div>
              <h3 className="font-body font-medium text-[15.5px] text-ink mb-1">A photo people keep for years</h3>
              <p className="font-body text-slate-500 text-[14px] leading-relaxed">
                A vivid deity photograph, printed to be kept and revered — the reason this card never gets thrown away.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex gap-3">
            <span className="flex-shrink-0 w-9 h-9 rounded-full bg-red/10 text-red flex items-center justify-center mt-0.5">
              <Megaphone size={16} strokeWidth={2} />
            </span>
            <div>
              <h3 className="font-body font-medium text-[15.5px] text-ink mb-1">Your ad, seen every time it&apos;s opened</h3>
              <p className="font-body text-slate-500 text-[14px] leading-relaxed">
                Your business message reaches every hand this card passes through, for as long as the card is kept.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Supporting feature chips — not a numbered sequence ── */}
        <Reveal delay={0.15} className="flex flex-wrap justify-center gap-4 mb-12">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3 pl-3 pr-5 py-3 rounded-2xl bg-white border border-black/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.04)] max-w-sm"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-red/10 text-red flex items-center justify-center">
                <f.icon size={16} strokeWidth={2} />
              </span>
              <div>
                <h5 className="font-body font-medium text-[13.5px] text-ink leading-tight">{f.title}</h5>
                <p className="font-body text-slate-500 text-[12px] leading-snug">{f.body}</p>
              </div>
            </div>
          ))}
        </Reveal>

        {/* ── CTA ── */}
        <Reveal delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-red text-white font-body font-medium text-[14.5px] hover:bg-red-dark transition-all duration-300 hover:shadow-glow-red group"
          >
            Order This Card
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://wa.me/919443150850?text=Hello%20Durga%20Printers%2C%20I%27d%20like%20to%20ask%20about%20a%20custom%20signature%20card%20with%20my%20own%20photo."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body font-medium text-[14px] text-slate-500 hover:text-red transition-colors"
          >
            <MessageSquare size={14} />
            Ask about custom photos on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}