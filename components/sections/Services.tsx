"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/* ─────────────────────────────────────────────────────────
   SERVICE DATA with real durga-files image paths
───────────────────────────────────────────────────────── */
type ServiceItem = {
  slug: string;
  title: string;
  blurb: string;
  tag: string;
  coverImg: string;          // thumbnail / cover
  galleryImgs: string[];     // modal gallery
  specs: Record<string, string>;
  size: "lg" | "wide" | "tall" | "md";
};

const services: ServiceItem[] = [
  {
    slug: "visiting-cards",
    title: "Visiting Cards",
    blurb: "Sharp, professional first impressions.",
    tag: "Business",
    coverImg: "/assets/service-cards.png",
    galleryImgs: [
      "/durga-files/visiting-cards/VC1.jpg",
      "/durga-files/visiting-cards/VC2.jpg",
      "/durga-files/visiting-cards/VC3.jpg",
      "/durga-files/visiting-cards/VC4.jpg",
      "/durga-files/visiting-cards/VC5.jpg",
      "/durga-files/visiting-cards/VC6.jpg",
      "/durga-files/visiting-cards/VC7.jpg",
    ],
    specs: { Size: "3.5\" × 2\"", Finish: "Matte / Glossy / Textured", Material: "300–350 GSM Card", Price: "From ₹150 / 100 pcs" },
    size: "lg",
  },
  {
    slug: "invitations",
    title: "Invitations",
    blurb: "Birthday, marriage & kovil functions.",
    tag: "Celebrations",
    coverImg: "/assets/service-invitations.png",
    galleryImgs: [
      "/durga-files/invitations/Inv%201.jpg",
      "/durga-files/invitations/Inv%202.jpg",
      "/durga-files/invitations/Inv%203.jpg",
      "/durga-files/invitations/Inv%204.jpg",
      "/durga-files/invitations/Inv%205.jpg",
      "/durga-files/invitations/Inv%206.jpg",
    ],
    specs: { Occasions: "Wedding, Birthday, Kovil", Finish: "Foil / Matte / Glossy", Material: "Premium Card Stock", Price: "From ₹10 / piece" },
    size: "md",
  },
  {
    slug: "wall-posters",
    title: "Wall Posters",
    blurb: "Large-format, razor-sharp at any size.",
    tag: "Large Format",
    coverImg: "/assets/service-posters.png",
    galleryImgs: [
      "/durga-files/wallposters/wallposter-1.jpg",
      "/durga-files/wallposters/wallposter-2.jpg",
      "/durga-files/wallposters/wallposter-3.jpg",
      "/durga-files/wallposters/wallposter-4.jpg",
      "/durga-files/wallposters/wallposter-5.jpg",
      "/durga-files/wallposters/wallposter-6.jpg",
    ],
    specs: { Sizes: "A3, A2, A1, Custom", Finish: "Matte / Glossy Lamination", Material: "Art Paper / Vinyl", Price: "From ₹50 / sq.ft" },
    size: "tall",
  },
  {
    slug: "brochures",
    title: "Flyers & Brochures",
    blurb: "Layouts that get read, not skipped.",
    tag: "Marketing",
    coverImg: "/assets/service-brochures.png",
    galleryImgs: [
      "/durga-files/brouchers/broucher1.jpg",
      "/durga-files/brouchers/broucher2.jpg",
      "/durga-files/brouchers/broucher3.jpg",
      "/durga-files/brouchers/broucher4.jpg",
      "/durga-files/brouchers/broucher5.jpg",
      "/durga-files/brouchers/broucher6.jpg",
    ],
    specs: { Sizes: "A4, A5, Tri-fold", Finish: "Matte / Glossy", Material: "130–170 GSM Paper", Price: "From ₹450 / 100 pcs" },
    size: "md",
  },
  {
    slug: "table-mate",
    title: "Table Mate",
    blurb: "Games that keep kids engaged at the table.",
    tag: "Hospitality",
    coverImg: "/assets/table-mate-preview.png",
    galleryImgs: [
      "/durga-files/table-mate/Table%20mate1.jpg",
      "/durga-files/table-mate/Table%20mate%202.jpg",
    ],
    specs: { Games: "Colour Shading, Puzzle, Word Game", Finish: "Laminated", Size: "Standard Table Sheet", Price: "From ₹12 / sheet" },
    size: "wide",
  },
  {
    slug: "hotel-menu",
    title: "Hotel Menu Cards",
    blurb: "Durable, laminated, spill-proof.",
    tag: "Hospitality",
    coverImg: "/assets/service-menus.png",
    galleryImgs: [
      "/durga-files/hotel-menu-card/hotel%20menu%20card%201.jpg",
      "/durga-files/hotel-menu-card/hotel%20menu%20card%202.jpg",
      "/durga-files/hotel-menu-card/hotel%20menu%20card%203.jpg",
      "/durga-files/hotel-menu-card/hotel%20menu%20card%204.jpg",
    ],
    specs: { Finish: "Laminated / Spill-proof", Material: "Rigid Card / PVC", Size: "Custom to Your Menu", Price: "From ₹45 / piece" },
    size: "md",
  },
  {
    slug: "car-pass",
    title: "Car Parking Pass",
    blurb: "Clear passes for gated parking.",
    tag: "Functional",
    coverImg: "/assets/service-carpass.png",
    galleryImgs: [
      "/durga-files/car-pass/car-pass.png",
    ],
    specs: { Material: "PVC / Thick Card", Finish: "Laminated", Size: "Standard Pass Size", Price: "From ₹15 / piece" },
    size: "md",
  },
  {
    slug: "pads",
    title: "Pads & Bill Books",
    blurb: "Bill books, menu pads, leave pads.",
    tag: "Stationery",
    coverImg: "/assets/service-pads.png",
    galleryImgs: [
      "/durga-files/pad/pad%201.png",
      "/durga-files/pad/pad%202.png",
    ],
    specs: { Types: "Bill Book, Menu Pad, Leave Pad", Binding: "Glued / Stapled", Sheets: "50 / 100 per Pad", Price: "From ₹60 / pad" },
    size: "wide",
  },
  {
    slug: "banners",
    title: "Banners",
    blurb: "Vinyl & flex banners, any size.",
    tag: "Large Format",
    coverImg: "/assets/service-banners.png",
    galleryImgs: [
      "/durga-files/banners/banner%201.jpg",
      "/durga-files/banners/banner%202.jpg",
      "/durga-files/banners/banner%203.jpg",
      "/durga-files/banners/banner%204.jpg",
      "/durga-files/banners/banner%205.jpg",
    ],
    specs: { Material: "Vinyl / Flex", Sizes: "Custom, Any Size", Finish: "Eyelets on Request", Price: "From ₹12 / sq.ft" },
    size: "md",
  },
  {
    slug: "stickers",
    title: "Stickers",
    blurb: "Custom stickers for any occasion.",
    tag: "Promotional",
    coverImg: "/assets/service-stickers.png",
    galleryImgs: [
      "/durga-files/stickers/sticker%201.jpg",
      "/durga-files/stickers/sticker%202.jpg",
      "/durga-files/stickers/sticker%203.jpg",
    ],
    specs: { Material: "Vinyl / Paper", Finish: "Glossy / Matte", Size: "Custom", Price: "From ₹5 / piece" },
    size: "md",
  },
  {
    slug: "kovil-invitation",
    title: "Kovil Invitations",
    blurb: "Traditional temple function invitations.",
    tag: "Devotional",
    coverImg: "/assets/service-photo.png",
    galleryImgs: [
      "/durga-files/kovil-invitation/inv%201.jpg",
      "/durga-files/kovil-invitation/inv%202.jpg",
      "/durga-files/kovil-invitation/inv%203.jpg",
      "/durga-files/kovil-invitation/inv%204.jpg",
      "/durga-files/kovil-invitation/inv%205.jpg",
      "/durga-files/kovil-invitation/inv%206.jpg",
      "/durga-files/kovil-invitation/inv%207.jpg",
      "/durga-files/kovil-invitation/inv%208.jpg",
    ],
    specs: { Occasions: "Temple Festivals, Kovil Functions", Finish: "Traditional / Modern", Material: "Premium Card Stock", Price: "From ₹8 / piece" },
    size: "md",
  },
  {
    slug: "photo-prints",
    title: "Photo Prints",
    blurb: "True-colour photo prints, every size.",
    tag: "Photography",
    coverImg: "/assets/service-photo.png",
    galleryImgs: [
      "/assets/service-photo.png",
    ],
    specs: { Sizes: "4×6, 5×7, 8×10, Custom", Finish: "Glossy / Matte", Material: "Premium Photo Paper", Price: "From ₹8 / print" },
    size: "md",
  },
  {
    slug: "lamination",
    title: "Lamination & Framing",
    blurb: "Finish with lamination or elegant framing.",
    tag: "Finishing",
    coverImg: "/assets/service-lamination.png",
    galleryImgs: [
      "/assets/service-lamination.png",
    ],
    specs: { Types: "Cold / Hot Lamination, Framing", Finish: "Glossy / Matte / Anti-glare", Material: "Premium Lamination Film", Price: "From ₹20 / sq.ft" },
    size: "md",
  },
];

const sizeClasses: Record<ServiceItem["size"], string> = {
  lg: "sm:col-span-2 sm:row-span-2",
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  md: "",
};

/* ─────────────────────────────────────────────────────────
   GALLERY MODAL
   ───────────────────────────────────────────────────────── */
function GalleryModal({ service, onClose }: { service: ServiceItem; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const imgs = service.galleryImgs;

  const prev = () => setIdx((i) => (i - 1 + imgs.length) % imgs.length);
  const next = () => setIdx((i) => (i + 1) % imgs.length);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-black/[0.08] shadow-[0_32px_96px_rgba(0,0,0,0.16)]"
          initial={{ scale: 0.92, y: 24 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/5 hover:bg-red flex items-center justify-center transition-colors group"
            aria-label="Close gallery"
          >
            <X size={16} className="text-slate-700 group-hover:text-white transition-colors" />
          </button>

          {/* Main Image */}
          <div className="relative aspect-[3/2] w-full bg-slate-50 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
              >
                <Image
                  src={imgs[idx]}
                  alt={`${service.title} preview ${idx + 1}`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            {imgs.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-red flex items-center justify-center transition-colors border border-white/10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} className="text-white" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-red flex items-center justify-center transition-colors border border-white/10"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} className="text-white" />
                </button>
              </>
            )}

            {/* Dot indicator */}
            {imgs.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {imgs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? "bg-red w-4" : "bg-white/40"}`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="eyebrow mb-2">{service.tag}</p>
                <h3 className="font-display text-[28px] text-ink" style={{ fontWeight: 400 }}>
                  {service.title}
                </h3>
              </div>
              <span className="font-mono text-[11px] text-slate-400 pt-1">
                {idx + 1} / {imgs.length}
              </span>
            </div>

            {/* Specs */}
            <div className="divide-y divide-black/[0.06] mb-6">
              {Object.entries(service.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 text-[14px]">
                  <span className="text-slate-500 font-body">{k}</span>
                  <span className="font-body font-medium text-ink">{v}</span>
                </div>
              ))}
            </div>

            {/* Thumbnail strip */}
            {imgs.length > 1 && (
              <div className="flex gap-2 mb-6 overflow-x-auto gallery-slider pb-1">
                {imgs.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      i === idx ? "border-red" : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <a
              href={`https://wa.me/919443150850?text=${encodeURIComponent(
                `Hello Durga Printers, I would like to enquire about: ${service.title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-red text-white font-body font-medium text-[14.5px] hover:bg-red-dark transition-all duration-300 hover:shadow-glow-red"
            >
              Enquire on WhatsApp
              <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────
   SERVICES SECTION
   ───────────────────────────────────────────────────────── */
export function Services() {
  const [active, setActive] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 md:py-36 bg-white overflow-hidden">
      <div className="container-px mx-auto max-w-6xl">

        <Reveal className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">What We Print</p>
          <h2 className="section-heading mb-5">
            One studio,<br />every kind of print.
          </h2>
          <p className="text-slate-500 text-[16px] leading-relaxed font-body">
            Business essentials, celebration prints, and hospitality supplies — designed
            and produced under one roof. Tap any card to explore sizes, finishes, and pricing.
          </p>
        </Reveal>

        {/* ── Bento Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4">
          {services.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={i * 0.04}
              className={sizeClasses[service.size]}
            >
              <button
                onClick={() => setActive(service)}
                className="service-card group relative w-full h-full rounded-2xl overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red"
                aria-label={`View ${service.title} gallery`}
              >
                {/* Cover image */}
                <Image
                  src={service.coverImg}
                  alt={service.title}
                  fill
                  className="service-img"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent transition-all duration-500 group-hover:from-black/95" />

                {/* Red tint on hover */}
                <div className="absolute inset-0 bg-red/0 group-hover:bg-red/10 transition-all duration-500" />

                {/* Top tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                    {service.tag}
                  </span>
                </div>

                {/* Top right number */}
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-[11px] text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute inset-x-4 bottom-4">
                  <h4 className="font-display text-white text-[20px] mb-1 group-hover:text-red transition-colors duration-300" style={{ fontWeight: 400 }}>
                    {service.title}
                  </h4>
                  <p className="font-body text-white/75 text-[13px] leading-snug">
                    {service.blurb}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-2 text-[12px] font-body font-medium text-red opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    View gallery <ArrowRight size={12} />
                  </span>
                </div>

                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-red/30 transition-all duration-500" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && <GalleryModal service={active} onClose={() => setActive(null)} />}
    </section>
  );
}
