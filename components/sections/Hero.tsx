"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Eye } from "lucide-react";
import { PrintingMachine } from "./PrintingMachine";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

/* ─── PARTICLES (static positions, CSS animated) ─── */
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 19.3) % 100}%`,
  top: `${(i * 29.7) % 100}%`,
  size: (i % 3 === 0) ? 1.5 : (i % 2 === 0) ? 1 : 0.8,
  dur: 20 + (i % 10), // slower particles for elegant vibe
  delay: (i * 0.5) % 8,
  opacity: 0.08 + (i % 3) * 0.03,
}));

/* ─── PRODUCTS SAMPLES FOR SHOWCASE ─── */
const PRODUCTS = [
  {
    src: "/durga-files/invitations/Inv%201.jpg",
    label: "Wedding Invite",
    style: { top: "6%", left: "4%", width: 135, height: 86 },
    rotate: -6, dur: 12.0, delay: 0, zIndex: 30, zDepth: 45, blur: 0,
  },
  {
    src: "/durga-files/visiting-cards/VC2.jpg",
    label: "Visiting Card",
    style: { top: "4%", right: "4%", width: 105, height: 145 },
    rotate: 5, dur: 14.2, delay: 1.5, zIndex: 10, zDepth: -30, blur: 0,
  },
  {
    src: "/durga-files/signature-card/1.jpg",
    label: "Signature Card",
    style: { bottom: "16%", left: "6%", width: 90, height: 128 },
    rotate: -5, dur: 13.5, delay: 2.5, zIndex: 20, zDepth: 15, blur: 0,
  },
  {
    src: "/durga-files/brouchers/broucher2.jpg",
    label: "Brochure",
    style: { bottom: "12%", right: "8%", width: 130, height: 90 },
    rotate: 4, dur: 11.0, delay: 3.2, zIndex: 25, zDepth: 30, blur: 0,
  },
];

const MARQUEE_ITEMS = [
  "Visiting Cards", "Wedding Invitations", "Wall Posters", "Banners",
  "Brochures", "Table Mate", "Hotel Menus", "Car Passes",
  "Signature Cards", "Kovil Invitations", "Bill Books", "Stickers",
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();

  /* ── Mouse parallax event handlers ── */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  /* ── Parallax layers springs (subtle luxury limits) ── */
  const textX = useSpring(useTransform(mouseX, [-0.5, 0.5], [4, -4]), { stiffness: 35, damping: 18 });
  const textY = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), { stiffness: 35, damping: 18 });

  // Scene container moves slightly with mouse
  const sceneX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 30, damping: 16 });
  const sceneY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-3, 3]), { stiffness: 30, damping: 16 });

  // Scroll-driven camera transitions: tilts & pushes back in space as page scrolls
  const scrollScale = useTransform(scrollY, [0, 600], [1, 0.96]);
  const scrollRotateX = useTransform(scrollY, [0, 600], [0, 4]);
  const scrollYOffset = useTransform(scrollY, [0, 600], [0, 24]);
  const scrollOpacity = useTransform(scrollY, [0, 600], [1, 0.35]);

  const springScrollScale = useSpring(scrollScale, { stiffness: 45, damping: 20 });
  const springScrollRotateX = useSpring(scrollRotateX, { stiffness: 45, damping: 20 });
  const springScrollYOffset = useSpring(scrollYOffset, { stiffness: 45, damping: 20 });
  const springScrollOpacity = useSpring(scrollOpacity, { stiffness: 45, damping: 20 });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "radial-gradient(circle at 50% 50%, #FCFCFC 0%, #F5F4F0 60%, #EAE9E2 100%)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ════ BACKGROUND LUXURY EFFECTS ════ */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Subtle, soft dot grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Ambient vignettes and soft spotlights */}
        <div className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 30%, rgba(12,12,14,0.03) 100%)"
          }}
        />

        {/* Minimal neutral glow orbs */}
        <motion.div className="absolute w-[800px] h-[800px] -top-56 -left-56 opacity-50"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.015) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div className="absolute w-[600px] h-[600px] -bottom-40 -right-40 opacity-40"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.012) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />

        {/* Neutral light particles */}
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-slate-400"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size, opacity: p.opacity }}
            animate={{ y: [0, -25, 0], opacity: [p.opacity * 0.4, p.opacity * 0.95, p.opacity * 0.4] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Delicate laser scan highlight strip (18s sweep) */}
        <motion.div
          className="absolute w-full h-px opacity-[0.4]"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.05) 30%, rgba(220,38,38,0.15) 50%, rgba(220,38,38,0.05) 70%, transparent 100%)" }}
          animate={{ top: ["15%", "85%", "15%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ════ MAIN CONTENT ════ */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_1.15fr] items-center
                      container-px mx-auto max-w-7xl w-full pt-28 pb-10 md:pt-32 gap-8 lg:gap-6">

        {/* ── LEFT: HERO TEXT & TYPOGRAPHY ── */}
        <motion.div style={{ x: textX, y: textY }} className="relative z-10 flex flex-col items-start">

          {/* Established badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-black/5
                            shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <Image src="/durga-logo.png" alt="Durga Printers" fill className="object-contain" priority />
            </div>
            <div className="hero-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-slate-500">
                Premium Print Studio · Est. 1996
              </span>
              <Sparkles size={11} className="text-red/80 ml-0.5" />
            </div>
          </motion.div>

          {/* Premium Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 65, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display leading-[1.05] text-ink text-left"
              style={{
                fontWeight: 400,
                fontSize: "clamp(46px, 6.5vw, 78px)",
                letterSpacing: "-0.015em",
              }}
            >
              Every print,<br />
              <em className="text-red not-italic font-medium">perfected.</em>
            </motion.h1>
          </div>

          {/* Balanced Subparagraph */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 font-body text-[15px] leading-relaxed text-slate-500 max-w-[440px] font-light"
          >
            Three generations of craftsmanship in Tirunelveli. Combining precision
            8-color offset engineering with luxury textures for wedding invitations,
            corporate collateral, and signature pocket cards.
          </motion.p>

          {/* Elevated CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              href="#gallery"
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                         bg-red text-white font-body font-medium text-[14px]
                         shadow-[0_8px_24px_rgba(220,38,38,0.18)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.32)]
                         transition-shadow duration-300"
            >
              <Eye size={15} />
              View Gallery
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                         border border-black/10 text-slate-700 font-body font-medium text-[14px]
                         hover:border-black/25 hover:text-black hover:bg-black/[0.01]
                         transition-all duration-300"
            >
              Contact Us
            </motion.a>
          </motion.div>

          {/* Premium Statistics Row with Counting Numbers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-12 flex items-center gap-6 md:gap-8"
          >
            {[
              { val: 34, suffix: "+", label: "Years Experience", animate: true },
              { val: 12, suffix: "K+", label: "Orders Placed", animate: true },
              { val: 8, suffix: "-Color", label: "Offset Line", animate: false, customText: "8-Color" },
              { val: 25, suffix: "+", label: "Product Types", animate: true },
            ].map((s, i) => (
              <div key={i} className={i > 0 ? "pl-6 md:pl-8 border-l border-black/[0.06]" : ""}>
                <p className="font-display text-[25px] md:text-[28px] text-ink leading-none font-light">
                  {s.animate ? (
                    <AnimatedCounter value={s.val} suffix={s.suffix} />
                  ) : (
                    s.customText
                  )}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400 mt-1.5">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {["Premium Materials", "8-Color Precision", "Traditional Craft", "Expert Linings"].map(tag => (
              <span key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                           bg-black/[0.02] border border-black/[0.04]
                           font-mono text-[10px] tracking-[0.08em] text-slate-500"
              >
                <span className="w-1 h-1 rounded-full bg-red inline-block opacity-75" />
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: 3D MACHINE & FLOATING CARDS SCENE ── */}
        {/* Scroll Wrapper: camera tilt, zoom and fade on page scroll */}
        <motion.div
          style={{
            scale: springScrollScale,
            rotateX: springScrollRotateX,
            y: springScrollYOffset,
            opacity: springScrollOpacity,
            transformStyle: "preserve-3d",
            willChange: "transform",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
          className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] lg:h-[600px]"
        >
          {/* Cinematic Wrapper: slow panning and gentle zoom loop (20-30s cycle) */}
          <motion.div
            animate={{
              scale: [1.0, 1.025, 1.0],
              x: [0, -10, 0],
              y: [0, 5, 0],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            className="w-full h-full"
          >
            {/* Mouse Parallax Wrapper */}
            <motion.div
              style={{ x: sceneX, y: sceneY, transformStyle: "preserve-3d", perspective: "1200px", willChange: "transform" }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.05, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative"
            >
              {/* ── 3D PRINTING MACHINE ── */}
              <div className="absolute inset-0 flex items-center justify-center px-2 z-20 pointer-events-none">
                <PrintingMachine mouseX={mouseX} mouseY={mouseY} />
              </div>

              {/* ── FLOATING CARD SAMPLES (SLOWER GENTLE LUXURY DRIFT) ── */}
              {PRODUCTS.map((p, i) => {
                const multiplier = (p.zDepth + 80) / 100;
                const cardX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20 * multiplier, 20 * multiplier]), { stiffness: 35, damping: 15 });
                const cardY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12 * multiplier, 12 * multiplier]), { stiffness: 35, damping: 15 });

                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-xl overflow-hidden cursor-pointer select-none bg-white p-1.5 
                               hidden sm:block transition-shadow duration-300"
                    style={{
                      ...p.style,
                      x: cardX,
                      y: cardY,
                      z: p.zDepth,
                      zIndex: p.zIndex,
                      filter: p.blur > 0 ? `blur(${p.blur}px)` : "none",
                      boxShadow: p.zDepth > 0
                        ? "0 20px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)"
                        : "0 8px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
                    }}
                    initial={{ opacity: 0, scale: 0.75, y: 35 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.45 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{
                      scale: 1.08,
                      rotate: 0,
                      zIndex: 50,
                      filter: "blur(0px)",
                      boxShadow: "0 30px 60px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(220,38,38,0.25)"
                    }}
                  >
                    {/* Slow, elegant linear translation content floating */}
                    <motion.div
                      animate={{
                        y: [0, -(4 + i * 1.2), 0],
                        rotate: [p.rotate, p.rotate + (i % 2 === 0 ? 1.5 : -1.5), p.rotate],
                      }}
                      transition={{
                        duration: p.dur,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative w-full h-full bg-[#FAF9F5]"
                    >
                      <Image
                        src={p.src}
                        alt={p.label}
                        fill
                        className="object-cover rounded-lg"
                        sizes="220px"
                      />
                      {/* Subtle glossy sheen sweep */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/20 to-transparent pointer-events-none" />
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* ── FLOATING SPEC INFO PILLS (GLASSMORPHISM) ── */}
              {/* Print Speed Card */}
              <motion.div
                className="absolute bottom-6 left-2 sm:left-4 z-35 bg-white/70 backdrop-blur-md rounded-2xl px-4 py-3 border border-black/[0.05]
                           shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-red mb-1">Print Speed</p>
                <p className="font-display text-[20px] md:text-[22px] text-ink leading-none font-light">15,000</p>
                <p className="font-mono text-[8.5px] text-slate-400 mt-1 tracking-wide">sheets / hour</p>
              </motion.div>

              {/* Quality Resolution Card */}
              <motion.div
                className="absolute top-6 right-2 sm:right-4 z-35 bg-white/70 backdrop-blur-md rounded-2xl px-4 py-3 border border-black/[0.05]
                           shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-red mb-1">Resolution</p>
                <p className="font-display text-[20px] md:text-[22px] text-ink leading-none font-light">2,400</p>
                <p className="font-mono text-[8.5px] text-slate-400 mt-1 tracking-wide">dpi precision</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ════ MARQUEE STRIP ════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="border-t border-b border-black/[0.04] bg-white/20 backdrop-blur-sm py-4 overflow-hidden"
      >
        <div className="flex whitespace-nowrap">
          <div className="flex items-center gap-10 marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-slate-400">
                <span className="w-1 h-1 rounded-full bg-red/60 flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ════ SCROLL CUE ════ */}
      <motion.a
        href="#signature"
        className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5
                   text-slate-400 hover:text-slate-600 transition-colors z-30"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.18em]">Scroll</span>
        <ChevronDown size={14} className="text-slate-400" />
      </motion.a>
    </section>
  );
}
