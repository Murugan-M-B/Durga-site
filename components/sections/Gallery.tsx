"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ArrowRight, MessageSquare,
  CreditCard, BookOpen, Star, Church, Layers,
  Image, Tag, Megaphone, Car, FileText, Sticker, LayoutGrid,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/* ── Types ─────────────────────────────────────────────────────────────── */
interface DesignItem { title: string; imagePath: string; }
interface CategoryItem {
  id: string; title: string; accentColor: string;
  description: string; coverImagePath: string; designs: DesignItem[];
}

/* ── Category icon map ──────────────────────────────────────────────────── */
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "visiting-cards": CreditCard,
  "invitations": Star,
  "kovil-invitation": Church,
  "brouchers": BookOpen,
  "hotel-menu-card": Layers,
  "signature-card": FileText,
  "banners": Megaphone,
  "car-pass": Car,
  "pad": LayoutGrid,
  "stickers": Sticker,
  "table-mate": Tag,
  "wallposters": Image,
};

/* ── Lazy image with spinner ────────────────────────────────────────────── */
function GalleryImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  useEffect(() => { setLoaded(false); setErr(false); }, [src]);
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {!loaded && !err && (
        <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-slate-200 border-t-red animate-spin" />
        </div>
      )}
      {err ? (
        <p className="text-slate-400 font-mono text-[9px] text-center p-2">Failed to load</p>
      ) : (
        <img
          src={src} alt={alt} draggable={false}
          onLoad={() => setLoaded(true)} onError={() => setErr(true)}
          className={`${className} ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"} transition-all duration-500 ease-out`}
        />
      )}
    </div>
  );
}

/* ── Arc Card ────────────────────────────────────────────────────────────
   A single category card, placed along a circular arc via inline transform
   passed in from the parent (position math lives in ArcGallery below).
   Uses a "matted" frame — white card, image always shown in full on a
   neutral panel, title in its own strip — so every card looks uniform
   regardless of the source artwork's aspect ratio or colors. ── */
function ArcCard({
  cat, index, style, onClick,
}: {
  cat: CategoryItem; index: number; style: React.CSSProperties; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const Icon = CATEGORY_ICONS[cat.id] ?? Layers;
  const accent = cat.accentColor;

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={style}
      whileHover={{ zIndex: 200 }}
      className="absolute top-0 left-1/2 cursor-pointer group"
    >
      <div
        className="relative w-full h-full bg-white flex flex-col overflow-hidden transition-transform duration-500 ease-out"
        style={{
          transform: hovered ? "translateY(-14px) scale(1.05)" : "translateY(0) scale(1)",
          boxShadow: hovered
            ? `0 24px 48px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)`
            : `0 10px 26px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)`,
          borderRadius: 18,
          transitionProperty: "transform, box-shadow",
        }}
      >
        {/* image panel — neutral mat, full artwork always visible, never cropped */}
        <div className="relative flex-1 m-2 mb-0 rounded-[13px] overflow-hidden" style={{ backgroundColor: `${accent}14` }}>
          <div className="absolute inset-0 flex items-center justify-center p-3">
            <img
              src={cat.coverImagePath}
              alt={cat.title}
              draggable={false}
              onLoad={() => setImgLoaded(true)}
              className={`max-w-full max-h-full object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.12)] transition-all duration-500 ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"} group-hover:scale-[1.04]`}
            />
          </div>
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-black/10 border-t-black/30 animate-spin" />
            </div>
          )}
          {/* accent corner tab */}
          <div
            className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
            style={{ backgroundColor: accent }}
          >
            <Icon size={11} color="#fff" strokeWidth={2.5} />
          </div>
        </div>

        {/* title strip — always white, always uniform, never fights the artwork */}
        <div className="px-3.5 py-3 flex items-center justify-between gap-2 shrink-0">
          <div className="min-w-0">
            <h3 className="font-display text-[14.5px] text-ink font-medium leading-tight tracking-tight truncate">
              {cat.title}
            </h3>
            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
              {cat.designs.length} {cat.designs.length === 1 ? "design" : "designs"}
            </span>
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
            style={{
              background: accent,
              color: "#fff",
              transform: hovered ? "translateX(2px)" : "translateX(0)",
            }}
          >
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Arc layout math ─────────────────────────────────────────────────────
   Distributes cards evenly across a shallow circular arc so the center
   card sits highest and cards taper down toward each edge, fanning out
   like an open hand — mirrors the reference "arc gallery" hero style. ── */
function ArcGallery({
  categories, onSelect,
}: { categories: CategoryItem[]; onSelect: (c: CategoryItem) => void }) {
  const CARD_W = 172;
  const CARD_H = 250;
  // Wider radius relative to card width → ~30-35% overlap instead of ~55%
  const RADIUS = 620;
  const n = categories.length;
  // Tighter cap so edge cards don't over-rotate or feel like they're falling off
  const maxAngle = Math.min(50, (n - 1) * 7.5);
  const step = n > 1 ? (maxAngle * 2) / (n - 1) : 0;

  return (
    <div className="relative w-full" style={{ height: 300 }}>
      {categories.map((cat, i) => {
        const angleDeg = n > 1 ? -maxAngle + i * step : 0;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = RADIUS * Math.sin(angleRad);
        const y = RADIUS * (1 - Math.cos(angleRad)) * 0.42; // flattened arc depth
        const scale = 1 - (Math.abs(angleDeg) / (maxAngle || 1)) * 0.16;
        const rotate = angleDeg * 0.42;
        const zIndex = 100 - Math.round(Math.abs(angleDeg));

        const style: React.CSSProperties = {
          width: CARD_W,
          height: CARD_H,
          transform: `translate(calc(-50% + ${x}px), ${y}px) rotate(${rotate}deg) scale(${scale})`,
          zIndex,
        };

        return (
          <ArcCard
            key={cat.id}
            cat={cat}
            index={i}
            style={style}
            onClick={() => onSelect(cat)}
          />
        );
      })}
    </div>
  );
}

/* ── Mobile fallback: horizontal scroll strip ───────────────────────────── */
function MobileStrip({
  categories, onSelect,
}: { categories: CategoryItem[]; onSelect: (c: CategoryItem) => void }) {
  return (
    <div className="flex gap-3.5 overflow-x-auto pb-4 px-1 snap-x snap-mandatory scrollbar-hide">
      {categories.map((cat) => {
        const Icon = CATEGORY_ICONS[cat.id] ?? Layers;
        return (
          <div
            key={cat.id}
            onClick={() => onSelect(cat)}
            className="relative shrink-0 w-[150px] h-[210px] rounded-[16px] bg-white flex flex-col overflow-hidden snap-start cursor-pointer"
            style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)" }}
          >
            <div className="relative flex-1 m-1.5 mb-0 rounded-[11px] overflow-hidden" style={{ backgroundColor: `${cat.accentColor}14` }}>
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <img
                  src={cat.coverImagePath}
                  alt={cat.title}
                  className="max-w-full max-h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
                  draggable={false}
                />
              </div>
              <div
                className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                style={{ backgroundColor: cat.accentColor }}
              >
                <Icon size={9} color="#fff" strokeWidth={2.5} />
              </div>
            </div>
            <div className="px-2.5 py-2 shrink-0">
              <h3 className="font-display text-[12.5px] text-ink font-medium leading-tight truncate">{cat.title}</h3>
              <span className="font-mono text-[8px] text-slate-400 uppercase tracking-wider">
                {cat.designs.length} {cat.designs.length === 1 ? "design" : "designs"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Number of cards shown in the fanned arc before it gets crowded —
// the rest are reachable via the "View all categories" chip.
const FEATURED_COUNT = 7;
// This category is placed at the very center (highest point) of the arc.
const HERO_CATEGORY_ID = "signature-card";

/** Builds the arc's featured set with the hero category locked to the
 *  middle position, since the arc's center index always renders highest. */
function buildFeaturedCategories(categories: CategoryItem[], count: number, heroId: string) {
  const hero = categories.find((c) => c.id === heroId);
  const others = categories.filter((c) => c.id !== heroId);
  const pool = others.slice(0, hero ? Math.max(count - 1, 0) : count);
  if (!hero) return pool;
  const centerIndex = Math.floor(pool.length / 2);
  return [...pool.slice(0, centerIndex), hero, ...pool.slice(centerIndex)];
}

/* ── Main Gallery Section ───────────────────────────────────────────────── */
export function Gallery() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<{ design: DesignItem; category: CategoryItem } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const featuredCategories = buildFeaturedCategories(categories, FEATURED_COUNT, HERO_CATEGORY_ID);
  const hasMoreCategories = categories.length > FEATURED_COUNT;

  useEffect(() => {
    fetch("/manifest.json")
      .then((r) => r.json())
      .then((data: CategoryItem[]) => setCategories(data))
      .catch((e) => console.error("manifest load error", e))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="gallery"
      className="pt-32 pb-24 md:pt-44 md:pb-36 relative overflow-hidden select-none"
      style={{ background: "radial-gradient(circle at center, #FCFAF5 0%, #F5F4F0 60%, #EAE9E2 100%)" }}
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-black/[0.03] pointer-events-none" />

      <div className="container-px mx-auto max-w-7xl relative z-10">

        {/* Arc gallery sits above the headline, like an open fan */}
        {!isLoading && categories.length > 0 && !isMobile && (
          <div className="mb-10">
            <ArcGallery categories={featuredCategories} onSelect={setActiveCategory} />
          </div>
        )}

        {/* Header */}
        <Reveal className="max-w-xl mx-auto text-center mb-6">
          <p className="eyebrow mb-4">Interactive Portfolio</p>
          <h2 className="section-heading mb-4 text-ink leading-tight">
            Browse our designs,<br />explore our crafts.
          </h2>
          <p className="text-slate-500 text-[15.5px] leading-relaxed font-body font-light">
            Tap any card to open the full collection and request a custom quote.
          </p>
        </Reveal>

        {/* View all categories chip — desktop only, when the arc doesn't show everything */}
        {!isLoading && hasMoreCategories && !isMobile && (
          <div className="flex justify-center mb-10">
            <button
              onClick={() => setShowAllCategories(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 bg-white/60 backdrop-blur-sm text-slate-600 font-body text-[12.5px] font-medium hover:border-red/40 hover:text-red transition-all"
            >
              View all {categories.length} categories
              <ArrowRight size={12} />
            </button>
          </div>
        )}

        {/* Loading / empty states */}
        {isLoading ? (
          <div className="h-[200px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-red/20 border-t-red animate-spin" />
              <p className="font-mono text-xs text-slate-400 uppercase tracking-widest animate-pulse">Loading designs…</p>
            </div>
          </div>
        ) : categories.length === 0 ? (
          <div className="h-[200px] flex items-center justify-center border border-dashed border-black/10 rounded-3xl bg-white/30 backdrop-blur-sm">
            <p className="text-slate-400 font-body text-sm font-light">
              No categories found. Run <code>npm run generate-manifest</code>.
            </p>
          </div>
        ) : isMobile ? (
          <MobileStrip categories={categories} onSelect={setActiveCategory} />
        ) : null}

        {/* Mobile hint */}
        {!isLoading && categories.length > 0 && isMobile && (
          <div className="flex items-center justify-center gap-2 mt-4 text-slate-400 font-mono text-[9px] uppercase tracking-widest">
            <ArrowRight size={10} className="animate-pulse" />
            <span>Swipe to browse</span>
          </div>
        )}
      </div>

      {/* ── View All Categories Modal ── */}
      <AnimatePresence>
        {showAllCategories && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAllCategories(false)}
              className="absolute inset-0 bg-ink/70 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="relative w-full max-w-5xl max-h-[85vh] bg-paper border border-black/[0.06] rounded-[28px] overflow-hidden shadow-[0_32px_96px_rgba(0,0,0,0.22)] flex flex-col z-10"
            >
              <div className="p-6 md:p-8 border-b border-black/[0.05] bg-[#F7F6F2] flex justify-between items-center">
                <h3 className="font-display text-2xl md:text-3xl text-ink font-light tracking-tight">
                  All categories
                </h3>
                <button onClick={() => setShowAllCategories(false)}
                  className="w-10 h-10 rounded-full border border-black/[0.08] hover:border-red/40 hover:text-red bg-white flex items-center justify-center transition-all shrink-0"
                  aria-label="Close">
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#FCFAF6]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((cat) => {
                    const Icon = CATEGORY_ICONS[cat.id] ?? Layers;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => { setShowAllCategories(false); setActiveCategory(cat); }}
                        className="relative rounded-2xl bg-white flex flex-col overflow-hidden cursor-pointer group"
                        style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)" }}
                      >
                        <div className="relative aspect-square m-2 mb-0 rounded-xl overflow-hidden" style={{ backgroundColor: `${cat.accentColor}14` }}>
                          <div className="absolute inset-0 flex items-center justify-center p-3">
                            <img src={cat.coverImagePath} alt={cat.title} draggable={false}
                              className="max-w-full max-h-full object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-[1.04]" />
                          </div>
                          <div className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: cat.accentColor }}>
                            <Icon size={11} color="#fff" strokeWidth={2.5} />
                          </div>
                        </div>
                        <div className="px-3 py-2.5">
                          <h4 className="font-display text-[13.5px] text-ink font-medium leading-tight truncate">{cat.title}</h4>
                          <span className="font-mono text-[8.5px] text-slate-400 uppercase tracking-wider">
                            {cat.designs.length} {cat.designs.length === 1 ? "design" : "designs"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {activeCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveCategory(null)}
              className="absolute inset-0 bg-ink/70 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="relative w-full max-w-6xl max-h-[85vh] bg-paper border border-black/[0.06] rounded-[28px] overflow-hidden shadow-[0_32px_96px_rgba(0,0,0,0.22)] flex flex-col z-10"
            >
              {/* Modal header */}
              <div className="p-6 md:p-8 border-b border-black/[0.05] bg-[#F7F6F2] flex justify-between items-start gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeCategory.accentColor }} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 font-semibold">
                      Gallery Collection ({activeCategory.designs.length} Items)
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-ink font-light leading-tight tracking-tight">
                    {activeCategory.title}
                  </h3>
                  <p className="font-body text-slate-500 text-[13.5px] leading-relaxed font-light mt-2 max-w-3xl">
                    {activeCategory.description}
                  </p>
                </div>
                <button onClick={() => setActiveCategory(null)}
                  className="w-10 h-10 rounded-full border border-black/[0.08] hover:border-red/40 hover:text-red bg-white flex items-center justify-center transition-all shrink-0"
                  aria-label="Close">
                  <X size={16} />
                </button>
              </div>

              {/* Designs grid */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#FCFAF6]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {activeCategory.designs.map((design, idx) => (
                    <motion.div key={idx}
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => setSelectedDesign({ design, category: activeCategory })}
                      className="group bg-white border border-black/[0.04] rounded-2xl p-3 flex flex-col cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 border border-black/[0.02] flex items-center justify-center p-3 mb-3">
                        <GalleryImage src={design.imagePath} alt={design.title}
                          className="object-contain max-w-full max-h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.03)] group-hover:scale-[1.04] transition-transform duration-500" />
                      </div>
                      <div>
                        <h4 className="font-mono text-[11px] text-ink font-semibold tracking-wider uppercase text-center mt-1 truncate px-1">
                          {design.title}
                        </h4>
                        <div className="w-full mt-3 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#F7F6F2] group-hover:bg-red group-hover:text-white text-slate-500 font-body text-[11px] font-medium transition-all duration-300">
                          <MessageSquare size={11} />
                          <span>View Details</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-4 md:p-6 border-t border-black/[0.05] bg-[#F7F6F2] flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="font-body text-[12px] text-slate-400 font-light">
                  Need custom dimensions? Mention the design code when contacting us.
                </span>
                <a href={`https://wa.me/919443150850?text=${encodeURIComponent(`Hello Durga Printers, I checked the "${activeCategory.title}" category and would like a custom quote.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red text-white font-body font-medium text-[12px] hover:bg-red-dark shadow-sm transition-all duration-300">
                  <span>Request Custom Quote</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Apple-style Design Detail Split Panel ── */}
      <AnimatePresence>
        {selectedDesign && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedDesign(null)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-xl"
            />

            {/* Split panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-5xl max-h-[88vh] bg-[#FAFAF8] rounded-[28px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.3)] flex flex-col md:flex-row z-10"
            >
              {/* LEFT — large image, no download, no new-tab */}
              <div className="w-full md:w-[52%] bg-[#F0EFEB] flex items-center justify-center p-8 md:p-12 relative shrink-0">
                {/* Subtle dot grid */}
                <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                <img
                  src={selectedDesign.design.imagePath}
                  alt={selectedDesign.design.title}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="relative max-w-full max-h-[60vh] object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.14)] rounded-xl select-none pointer-events-none"
                />
              </div>

              {/* RIGHT — details */}
              <div className="flex-1 flex flex-col justify-between p-7 md:p-10 overflow-y-auto">
                <div>
                  {/* Category pill */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                    style={{
                      background: `${selectedDesign.category.accentColor}18`,
                      border: `1px solid ${selectedDesign.category.accentColor}33`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedDesign.category.accentColor }} />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest" style={{ color: selectedDesign.category.accentColor }}>
                      {selectedDesign.category.title}
                    </span>
                  </div>

                  {/* Design title */}
                  <h3 className="font-display text-3xl md:text-[38px] text-ink font-light leading-tight tracking-tight mb-3">
                    {selectedDesign.design.title}
                  </h3>

                  <p className="font-body text-slate-500 text-[14px] leading-relaxed font-light mb-8">
                    {selectedDesign.category.description}
                  </p>

                  {/* Spec rows */}
                  <div className="border-t border-black/[0.06] divide-y divide-black/[0.04] mb-8">
                    {[
                      ["Category", selectedDesign.category.title],
                      ["Design Code", selectedDesign.design.title],
                      ["Collection Size", `${selectedDesign.category.designs.length} designs`],
                      ["Availability", "Custom sizes available"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center py-3 text-[12.5px] font-body">
                        <span className="text-slate-400 font-light">{k}</span>
                        <span className="font-medium text-ink">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/919443150850?text=${encodeURIComponent(`Hello Durga Printers, I am interested in the design "${selectedDesign.design.title}" from the "${selectedDesign.category.title}" category. Could you share pricing and paper stock details?`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-red text-white font-body font-medium text-[13.5px] hover:bg-red-dark shadow-[0_4px_16px_rgba(220,38,38,0.2)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.3)] transition-all duration-300"
                  >
                    <MessageSquare size={14} />
                    Request a Quote on WhatsApp
                  </a>
                  <button
                    onClick={() => setSelectedDesign(null)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-black/10 text-slate-600 font-body font-medium text-[13.5px] hover:bg-black/[0.02] hover:border-black/20 transition-all"
                  >
                    Browse More Designs
                  </button>
                </div>
              </div>

              {/* Close X */}
              <button
                onClick={() => setSelectedDesign(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 border border-black/[0.08] hover:border-red/40 hover:text-red flex items-center justify-center transition-all backdrop-blur-sm"
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}