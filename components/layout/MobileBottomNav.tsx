"use client";

import { Home, LayoutGrid, Image as ImageIcon, Phone, Star } from "lucide-react";
import { navLinks } from "@/lib/data";

const mobileLinks = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#services", label: "Services", icon: LayoutGrid },
  { href: "#gallery", label: "Gallery", icon: ImageIcon },
  { href: "#signature", label: "Signature", icon: Star },
  { href: "#contact", label: "Contact", icon: Phone },
];

export function MobileBottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-black/[0.06] safe-area-bottom">
      <div className="flex items-center justify-around h-[60px] max-w-lg mx-auto px-2">
        {mobileLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 min-w-[52px] text-slate-500 hover:text-red transition-colors py-1"
          >
            <Icon size={20} strokeWidth={1.6} />
            <span className="font-mono text-[9px] uppercase tracking-[0.1em]">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
