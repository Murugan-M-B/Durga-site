"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ArrowRight, ArrowLeft, MessageSquare, ChevronLeft, ChevronRight,
  CreditCard, BookOpen, Star, Church, Layers, Image as ImageIcon, Tag, Megaphone,
  Car, FileText, Sticker, LayoutGrid, Sparkles, ShieldCheck, Printer,
  Compass, Maximize2, Package, Clock, CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/* ── Types ─────────────────────────────────────────────────────────────── */
interface DesignItem { title: string; imagePath: string; }
interface CategoryItem {
  id: string; title: string; accentColor: string;
  description: string; coverImagePath: string; designs: DesignItem[];
}

interface CategorySpecs {
  paperType?: string;
  paperThickness?: string;
  finish?: string;
  printingType?: string;
  orientation?: string;
  availableSizes?: string;
  minimumQuantity?: string;
  deliveryTime?: string;
  customization?: string;
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
  "wallposters": ImageIcon,
};

/* ── Print Specifications Dictionary ───────────────────────────────────── */
const CATEGORY_SPECS: Record<string, CategorySpecs> = {
  "signature-card": {
    paperType: "Heavyweight Textured Fine Board",
    paperThickness: "350 – 400 GSM",
    finish: "Velvet Matte with Gold Foil Accents",
    printingType: "8-Color Precision Offset & UV Spot",
    orientation: "Vertical Pocket Size",
    availableSizes: "2.5″ × 3.5″ (Signature Pocket Size)",
    minimumQuantity: "100 Cards",
    deliveryTime: "2–3 Business Days",
    customization: "Custom Deity Photo, Custom Ad Back, Foil Stamping",
  },
  "visiting-cards": {
    paperType: "Imported Linen / Velvet Art Stock",
    paperThickness: "300 – 350 GSM",
    finish: "Matte Lamination, Spot UV & Foil Options",
    printingType: "High-Definition Offset Printing",
    orientation: "Landscape (Horizontal)",
    availableSizes: "3.5″ × 2.0″ (Standard), Square & Rounded",
    minimumQuantity: "100 Cards",
    deliveryTime: "2 Business Days",
    customization: "Double-sided, Metallic Foil, QR Code",
  },
  "invitations": {
    paperType: "Luxury Metallic Board & Fine Cotton Rag",
    paperThickness: "280 – 350 GSM",
    finish: "Gold Foil Stamping & Laser-Cut Accents",
    printingType: "Multi-Color Offset with Metallic Inks",
    orientation: "Folding Booklet Style",
    availableSizes: "5″ × 7″, 6″ × 9″, Custom Envelope Sizes",
    minimumQuantity: "50 Sets",
    deliveryTime: "3–5 Business Days",
    customization: "Personal names, Tamil/English typography, inserts",
  },
  "kovil-invitation": {
    paperType: "Devotional Gloss / Matte Art Board",
    paperThickness: "250 – 300 GSM",
    finish: "Gloss Lamination with Sacred Motifs",
    printingType: "High-Density 8-Color Offset",
    orientation: "Multifold Brochure / Arch Scroll",
    availableSizes: "A4, 7″ × 10″, Custom Temple Size",
    minimumQuantity: "100 Prints",
    deliveryTime: "2–3 Business Days",
    customization: "Deity graphics, festival schedule, donor list",
  },
  "brouchers": {
    paperType: "Premium Art Paper & Gloss Board",
    paperThickness: "170 – 250 GSM",
    finish: "Aqueous Coating & Soft-Touch Lamination",
    printingType: "Full Color CMYK Process Offset",
    orientation: "Bi-Fold / Tri-Fold / Z-Fold",
    availableSizes: "A4 (folded to A5), 8.5″ × 11″, 11″ × 17″",
    minimumQuantity: "100 Copies",
    deliveryTime: "3 Business Days",
    customization: "Custom folds, die-cut panels, metallic spot inks",
  },
  "hotel-menu-card": {
    paperType: "Tear-Proof Synthetic Board / Rigid Case",
    paperThickness: "400 GSM Heavy Laminated",
    finish: "Waterproof Ultra-Gloss / Anti-Scratch Matte",
    printingType: "High-Resolution UV offset",
    orientation: "Vertical Booklet / Single Board",
    availableSizes: "A4 (8.27″ × 11.69″), A3, Slim Menu",
    minimumQuantity: "10 Cards",
    deliveryTime: "2 Business Days",
    customization: "Spiral binding, leatherette frames, page count",
  },
  "banners": {
    paperType: "Heavy Flex / Eco-Solvent Vinyl / Canvas",
    paperThickness: "340 – 440 GSM Flex",
    finish: "Weatherproof UV Resistant Finish",
    printingType: "Large Format Eco-Solvent (1440 DPI)",
    orientation: "Horizontal Banner / Vertical Standee",
    availableSizes: "4ft × 2ft, 6ft × 3ft, 8ft × 4ft, Custom Dimensions",
    minimumQuantity: "1 Banner",
    deliveryTime: "Same Day / Next Day",
    customization: "Brass eyelets, pole pockets, roll-up standees",
  },
  "car-pass": {
    paperType: "Rigid PVC Vinyl / Laminated Board",
    paperThickness: "350 GSM / 0.5mm PVC",
    finish: "Gloss Thermal Lamination & Security Seal",
    printingType: "High-Precision Digital & Offset",
    orientation: "Mirror Hanger / Windshield Mount",
    availableSizes: "4″ × 6″, 3.5″ × 5.5″",
    minimumQuantity: "50 Passes",
    deliveryTime: "2 Business Days",
    customization: "Serial numbering, vehicle category codes, QR codes",
  },
  "pad": {
    paperType: "Smooth Writing Bond Stock",
    paperThickness: "80 – 100 GSM Executive Bond",
    finish: "Top-Gummed Pad Binding with Cardboard Back",
    printingType: "Precision Single / Multi-Color Offset",
    orientation: "Vertical Top-Bound Pad",
    availableSizes: "A5 (5.8″ × 8.3″), Executive (7.25″ × 9.5″)",
    minimumQuantity: "10 Pads (500 sheets total)",
    deliveryTime: "2 Business Days",
    customization: "Doctor/Company header, rx ruling, serial sheets",
  },
  "stickers": {
    paperType: "Self-Adhesive Vinyl & Gloss Chromo Stock",
    paperThickness: "120 GSM Adhesive Stock",
    finish: "Die-Cut Kiss Cut / Gloss Lamination",
    printingType: "High-Definition Digital & Offset",
    orientation: "Custom Contour Shapes",
    availableSizes: "2″ × 2″, 3″ × 3″, Sheet / Roll Format",
    minimumQuantity: "100 Stickers",
    deliveryTime: "2 Business Days",
    customization: "Custom shapes, waterproof lamination, roll delivery",
  },
  "table-mate": {
    paperType: "Laminated Hard Board / Synthetic Desk Mat",
    paperThickness: "350 GSM Heavy Board",
    finish: "Anti-Glare Matte / Wipeable Gloss",
    printingType: "Full Color Offset Process",
    orientation: "Landscape Desk Mat",
    availableSizes: "12″ × 18″, 15″ × 20″",
    minimumQuantity: "25 Mats",
    deliveryTime: "3 Business Days",
    customization: "Yearly calendar grid, brand logo, custom size",
  },
  "wallposters": {
    paperType: "Premium Art Paper / Photographic Stock",
    paperThickness: "220 – 300 GSM Art Board",
    finish: "Satin Gloss Coating",
    printingType: "8-Color Photographic Offset",
    orientation: "Vertical / Horizontal",
    availableSizes: "12″ × 18″, 18″ × 24″, 24″ × 36″",
    minimumQuantity: "50 Prints",
    deliveryTime: "2 Business Days",
    customization: "Event posters, promotional graphics, custom sizes",
  },
};

/* ── Code & Name Helpers ────────────────────────────────────────────────── */
function getDesignCode(categoryId: string, designTitle: string, index: number): string {
  const prefixMap: Record<string, string> = {
    "signature-card": "SIG",
    "visiting-cards": "VC",
    "invitations": "INV",
    "kovil-invitation": "KVL",
    "brouchers": "BRO",
    "hotel-menu-card": "MNU",
    "banners": "BAN",
    "car-pass": "PAS",
    "pad": "PAD",
    "stickers": "STK",
    "table-mate": "MAT",
    "wallposters": "PST",
  };
  const prefix = prefixMap[categoryId] ?? "DP";
  const numStr = String(index + 1).padStart(3, "0");
  return `${prefix}-${numStr}`;
}

function getDesignName(categoryTitle: string, designTitle: string, index: number): string {
  if (
    designTitle &&
    !/^(inv\s*\d+|\d+|vc\d+|broucher\d+|hotel menu card \d+|banner \d+|pad \d+|sticker \d+|table mate \d+|wallposter-\d+)$/i.test(
      designTitle.trim()
    )
  ) {
    return designTitle;
  }
  return `${categoryTitle} — Design ${index + 1}`;
}

/* ── Arc Card ──────────────────────────────────────────────────────────── */
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
          <div
            className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
            style={{ backgroundColor: accent }}
          >
            <Icon size={11} color="#fff" strokeWidth={2.5} />
          </div>
        </div>

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

/* ── Arc Layout Math ────────────────────────────────────────────────────── */
function ArcGallery({
  categories, onSelect,
}: { categories: CategoryItem[]; onSelect: (c: CategoryItem) => void }) {
  const CARD_W = 172;
  const CARD_H = 250;
  const RADIUS = 620;
  const n = categories.length;
  const maxAngle = Math.min(50, (n - 1) * 7.5);
  const step = n > 1 ? (maxAngle * 2) / (n - 1) : 0;

  return (
    <div className="relative w-full" style={{ height: 300 }}>
      {categories.map((cat, i) => {
        const angleDeg = n > 1 ? -maxAngle + i * step : 0;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = RADIUS * Math.sin(angleRad);
        const y = RADIUS * (1 - Math.cos(angleRad)) * 0.42;
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

/* ── Mobile Fallback Strip ──────────────────────────────────────────────── */
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

const FEATURED_COUNT = 7;
const HERO_CATEGORY_ID = "signature-card";

function buildFeaturedCategories(categories: CategoryItem[], count: number, heroId: string) {
  const hero = categories.find((c) => c.id === heroId);
  const others = categories.filter((c) => c.id !== heroId);
  const pool = others.slice(0, hero ? Math.max(count - 1, 0) : count);
  if (!hero) return pool;
  const centerIndex = Math.floor(pool.length / 2);
  return [...pool.slice(0, centerIndex), hero, ...pool.slice(centerIndex)];
}

/* ── Product Image Viewer Component ────────────────────────────────────── */
function ProductImageViewer({
  designs,
  activeIndex,
  onSelectIndex,
  accentColor,
  categoryTitle,
}: {
  designs: DesignItem[];
  activeIndex: number;
  onSelectIndex: (idx: number) => void;
  accentColor: string;
  categoryTitle: string;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const currentDesign = designs[activeIndex];
  const touchStartX = useRef<number | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slideshow (3 seconds interval)
  useEffect(() => {
    if (isPaused || designs.length <= 1) return;
    const timer = setInterval(() => {
      onSelectIndex((activeIndex + 1) % designs.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, designs.length, activeIndex, onSelectIndex]);

  // Lazy image preloading (preloads next & prev images)
  useEffect(() => {
    if (designs.length <= 1) return;
    const nextIdx = (activeIndex + 1) % designs.length;
    const prevIdx = (activeIndex - 1 + designs.length) % designs.length;
    const imgNext = new Image();
    imgNext.src = designs[nextIdx].imagePath;
    const imgPrev = new Image();
    imgPrev.src = designs[prevIdx].imagePath;
  }, [activeIndex, designs]);

  useEffect(() => {
    setImgLoaded(false);
    setImgErr(false);
  }, [activeIndex]);

  const handleManualNavigate = (newIdx: number) => {
    onSelectIndex(newIdx);
    setIsPaused(true);
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => setIsPaused(false), 4000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleManualNavigate((activeIndex + 1) % designs.length);
      } else {
        handleManualNavigate((activeIndex - 1 + designs.length) % designs.length);
      }
    }
    touchStartX.current = null;
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => setIsPaused(false), 4000);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Large Image Container */}
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/11] md:aspect-[4/3] rounded-2xl bg-[#F7F5F0] border border-black/[0.06] overflow-hidden flex items-center justify-center select-none shadow-[0_12px_32px_rgba(0,0,0,0.06)] group"
        onMouseEnter={() => { setIsPaused(true); setIsHovered(true); }}
        onMouseLeave={() => { setIsPaused(false); setIsHovered(false); }}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Soft background dot grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "18px 18px" }} />

        {/* Loading Spinner */}
        {!imgLoaded && !imgErr && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-50/60 backdrop-blur-xs">
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-red animate-spin" />
          </div>
        )}

        {/* Main Image with Zoom on Hover */}
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={currentDesign.imagePath}
            alt={currentDesign.title || `${categoryTitle} design ${activeIndex + 1}`}
            draggable={false}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgErr(true)}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transform: isHovered ? "scale(1.35)" : "scale(1)",
              transition: isHovered ? "transform 0.15s ease-out" : "transform 0.35s ease-out",
            }}
            className="max-w-full max-h-full object-contain p-4 drop-shadow-[0_10px_24px_rgba(0,0,0,0.12)] cursor-zoom-in"
          />
        </AnimatePresence>

        {/* Previous / Next Arrow Buttons */}
        {designs.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handleManualNavigate((activeIndex - 1 + designs.length) % designs.length); }}
              aria-label="Previous Design"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-slate-700 hover:text-red border border-black/10 shadow-md flex items-center justify-center backdrop-blur-md transition-all duration-200 active:scale-90 opacity-90 hover:opacity-100 z-20 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleManualNavigate((activeIndex + 1) % designs.length); }}
              aria-label="Next Design"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-slate-700 hover:text-red border border-black/10 shadow-md flex items-center justify-center backdrop-blur-md transition-all duration-200 active:scale-90 opacity-90 hover:opacity-100 z-20 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Live Slideshow Status Badge */}
        {isPaused && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 pointer-events-none z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>Paused</span>
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {designs.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 px-1 scrollbar-hide snap-x">
          {designs.map((d, i) => (
            <button
              key={d.title + i}
              onClick={() => handleManualNavigate(i)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border transition-all duration-300 snap-start cursor-pointer ${
                i === activeIndex
                  ? "ring-2 ring-red ring-offset-2 border-red scale-105 shadow-md"
                  : "border-black/10 opacity-70 hover:opacity-100 hover:scale-102"
              }`}
            >
              <img
                src={d.imagePath}
                alt={d.title}
                draggable={false}
                className="w-full h-full object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Product Information Component ─────────────────────────────────────── */
function ProductInformation({
  category,
  activeDesign,
  activeIndex,
  totalDesigns,
  onSelectIndex,
}: {
  category: CategoryItem;
  activeDesign: DesignItem;
  activeIndex: number;
  totalDesigns: number;
  onSelectIndex: (idx: number) => void;
}) {
  const Icon = CATEGORY_ICONS[category.id] ?? Layers;
  const specs = CATEGORY_SPECS[category.id] ?? {};

  const designCode = getDesignCode(category.id, activeDesign.title, activeIndex);
  const designName = getDesignName(category.title, activeDesign.title, activeIndex);

  const specList = [
    { label: "Paper Type", val: specs.paperType, icon: Sparkles },
    { label: "Paper Thickness", val: specs.paperThickness, icon: Layers },
    { label: "Finish", val: specs.finish, icon: ShieldCheck },
    { label: "Printing Type", val: specs.printingType, icon: Printer },
    { label: "Orientation", val: specs.orientation, icon: Compass },
    { label: "Available Sizes", val: specs.availableSizes, icon: Maximize2 },
    { label: "Minimum Quantity", val: specs.minimumQuantity, icon: Package },
    { label: "Delivery Time", val: specs.deliveryTime, icon: Clock },
    { label: "Customization", val: specs.customization, icon: CheckCircle2 },
  ].filter((s) => Boolean(s.val));

  const whatsappText = `Hello Durga Printers,

I am interested in getting a quote for this design:

Category: ${category.title}
Design: ${designName}
Code: ${designCode}

Please send pricing and customization details.`;

  const whatsappUrl = `https://wa.me/919443150850?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="flex flex-col justify-between h-full gap-6">
      <div className="flex flex-col gap-4">
        {/* Category Pill & Counter */}
        <div className="flex items-center justify-between gap-3">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs"
            style={{ backgroundColor: category.accentColor }}
          >
            <Icon size={12} color="#fff" strokeWidth={2.5} />
            <span>{category.title}</span>
          </div>

          <span className="font-mono text-[11px] text-slate-400 font-medium">
            Design <span className="text-ink font-bold">{activeIndex + 1}</span> of {totalDesigns}
          </span>
        </div>

        {/* Design Name & Code */}
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <h3 className="font-display text-2xl sm:text-3xl font-light text-ink leading-tight tracking-tight">
              {designName}
            </h3>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-mono text-[11px] font-semibold text-slate-600 uppercase tracking-widest">
              {designCode}
            </span>
          </div>
          <p className="font-body text-slate-500 text-[13.5px] leading-relaxed font-light mt-1">
            {category.description}
          </p>
        </div>

        {/* Dynamic Specifications */}
        {specList.length > 0 && (
          <div className="mt-2 border-t border-black/[0.06] pt-4">
            <h4 className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-3">
              Print Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {specList.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                  >
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${category.accentColor}18`, color: category.accentColor }}
                    >
                      <ItemIcon size={13} strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider font-medium">
                        {item.label}
                      </p>
                      <p className="font-body text-[12.5px] text-ink font-medium leading-snug truncate">
                        {item.val}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Progress Dots & Primary CTA */}
      <div className="flex flex-col gap-4 border-t border-black/[0.06] pt-4 mt-auto">
        {/* Clickable Progress Dots */}
        {totalDesigns > 1 && (
          <div className="flex justify-center items-center gap-1.5">
            {Array.from({ length: totalDesigns }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onSelectIndex(idx)}
                aria-label={`Go to design ${idx + 1}`}
                className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: idx === activeIndex ? 22 : 8,
                  backgroundColor: idx === activeIndex ? category.accentColor : "rgba(0,0,0,0.15)",
                }}
              />
            ))}
          </div>
        )}

        {/* Primary CTA: Request Custom Quote */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-red text-white font-body font-medium text-[14px] hover:bg-red-dark shadow-[0_8px_24px_rgba(220,38,38,0.22)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.32)] transition-all duration-300 active:scale-98"
        >
          <MessageSquare size={16} />
          <span>Request Custom Quote</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

/* ── Split-Screen PDP Gallery Modal ─────────────────────────────────────── */
function GalleryModal({
  category,
  onClose,
}: {
  category: CategoryItem;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Keyboard Navigation: ESC closes modal, Left/Right changes design index
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + category.designs.length) % category.designs.length);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % category.designs.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [category.designs.length, onClose]);

  if (!category || category.designs.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden select-none">
      {/* Modal Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink/75 backdrop-blur-md"
      />

      {/* Split Screen Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[88vh] bg-[#FCFAF5] border border-black/[0.08] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_36px_100px_rgba(0,0,0,0.28)] flex flex-col z-10"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-black/[0.06] bg-[#F7F5F0] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full shadow-xs"
              style={{ backgroundColor: category.accentColor }}
            />
            <h3 className="font-display text-lg sm:text-xl md:text-2xl text-ink font-normal tracking-tight">
              {category.title} Collection
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/[0.08] hover:border-red/40 hover:text-red bg-white flex items-center justify-center transition-all shrink-0 active:scale-95 cursor-pointer"
          >
            <X size={17} />
          </button>
        </div>

        {/* Modal Content — Split Screen Product Viewer */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#FCFAF5]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start h-full">
            {/* Left Column: Product Image Viewer */}
            <ProductImageViewer
              designs={category.designs}
              activeIndex={activeIndex}
              onSelectIndex={setActiveIndex}
              accentColor={category.accentColor}
              categoryTitle={category.title}
            />

            {/* Right Column: Product Information & Custom Quote CTA */}
            <ProductInformation
              category={category}
              activeDesign={category.designs[activeIndex]}
              activeIndex={activeIndex}
              totalDesigns={category.designs.length}
              onSelectIndex={setActiveIndex}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main Gallery Section ───────────────────────────────────────────────── */
export function Gallery() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeGroup, setActiveGroup] = useState<"featured" | "other">("featured");

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

  const featuredCategories = useMemo(() => {
    return buildFeaturedCategories(categories, FEATURED_COUNT, HERO_CATEGORY_ID);
  }, [categories]);

  const featuredIds = useMemo(
    () => new Set(featuredCategories.map((c) => c.id)),
    [featuredCategories]
  );

  const otherCategories = useMemo(() => {
    return categories.filter((c) => !featuredIds.has(c.id));
  }, [categories, featuredIds]);

  const activeCategories = activeGroup === "featured" ? featuredCategories : otherCategories;
  const hasOtherCategories = otherCategories.length > 0;

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

        {/* Curved 3D Arch Gallery (Desktop) */}
        {!isLoading && categories.length > 0 && !isMobile && (
          <div className="mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <ArcGallery categories={activeCategories} onSelect={setActiveCategory} />
              </motion.div>
            </AnimatePresence>
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

        {/* Toggle Button: Featured Categories <-> Other Categories */}
        {!isLoading && hasOtherCategories && (
          <div className="flex justify-center mb-10">
            <button
              onClick={() => setActiveGroup((prev) => (prev === "featured" ? "other" : "featured"))}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-black/10 bg-white/80 backdrop-blur-md text-slate-700 font-body text-[13px] font-medium shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:border-red/40 hover:text-red hover:shadow-[0_8px_24px_rgba(220,38,38,0.12)] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              {activeGroup === "featured" ? (
                <>
                  <span>Other Categories</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <>
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Featured Categories</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Loading / empty states / MobileStrip */}
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <MobileStrip categories={activeCategories} onSelect={setActiveCategory} />
            </motion.div>
          </AnimatePresence>
        ) : null}

        {/* Mobile hint */}
        {!isLoading && categories.length > 0 && isMobile && (
          <div className="flex items-center justify-center gap-2 mt-4 text-slate-400 font-mono text-[9px] uppercase tracking-widest">
            <ArrowRight size={10} className="animate-pulse" />
            <span>Swipe to browse</span>
          </div>
        )}
      </div>

      {/* ── Product Detail Page Split-Screen Gallery Modal ── */}
      <AnimatePresence>
        {activeCategory && (
          <GalleryModal
            category={activeCategory}
            onClose={() => setActiveCategory(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}