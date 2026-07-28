"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/75 backdrop-blur-md border-b border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav
          className={cn(
            "container-px mx-auto max-w-7xl flex items-center justify-between transition-all duration-500",
            scrolled ? "h-[72px]" : "h-[84px]"
          )}
        >
          {/* ── Brand / Logo ── */}
          <a href="#home" className="flex items-center gap-3 group">
            <span className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-black/5 group-hover:ring-red/30 transition-all duration-300">
              <Image
                src="/durga-logo.png"
                alt="Durga Printers Logo"
                fill
                sizes="40px"
                className="object-contain p-0.5"
                priority
              />
            </span>
            <span className="font-display text-[20.5px] text-ink leading-none tracking-tight" style={{ fontWeight: 400 }}>
              Durga <span className="text-red font-medium">Printers</span>
            </span>
          </a>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden lg:flex items-center gap-8 font-body text-[13.5px] font-medium tracking-wide">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative py-1.5 text-slate-650 hover:text-red transition-colors duration-250 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-red group-hover:w-full group-hover:left-0 transition-all duration-300 ease-[0.16,1,0.3,1]" />
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA Buttons ── */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/919443150850"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13.5px] font-medium text-slate-600 hover:text-red transition-colors duration-200"
            >
              WhatsApp Support
            </a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 450, damping: 15 }}
              className="px-5 py-2.5 rounded-full bg-red text-white font-body font-medium text-[13px] 
                         shadow-[0_4px_12px_rgba(220,38,38,0.12)] hover:shadow-[0_8px_20px_rgba(220,38,38,0.22)] 
                         transition-shadow duration-300"
            >
              Get Quote
            </motion.a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center text-slate-600 hover:text-black transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* ── Mobile Dropdown Menu ── */}
        {mobileOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-black/[0.05] shadow-lg">
            <ul className="container-px py-6 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 font-body text-[14.5px] text-slate-600 hover:text-red border-b border-black/[0.04] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 flex flex-col gap-3">
                <a
                  href="https://wa.me/919443150850"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-3 rounded-full border border-black/10 font-body text-slate-700 font-medium text-[14px]"
                >
                  WhatsApp Support
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full block text-center py-3 rounded-full bg-red text-white font-body font-medium text-[14px] hover:bg-red-dark transition-colors"
                >
                  Get Quote
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
