import Image from "next/image";
import { Instagram, Facebook, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-black/[0.06]">
      <div className="container-px mx-auto max-w-7xl py-16 grid gap-12 md:grid-cols-12">

        {/* Brand */}
        <div className="md:col-span-5">
          <a href="#home" className="inline-flex items-center gap-3 mb-5 group">
            <span className="relative w-10 h-10 rounded-lg overflow-hidden ring-1 ring-black/5 group-hover:ring-red/30 transition-all">
              <Image src="/durga-logo.png" alt="Durga Printers" fill sizes="40px" className="object-contain" />
            </span>
            <span className="font-display text-[20px] text-ink" style={{ fontWeight: 400 }}>
              Durga <span className="text-red">Printers</span>
            </span>
          </a>

          <p className="font-body text-[14.5px] text-slate-500 leading-relaxed max-w-xs mb-6">
            Your neighbourhood print studio for every occasion — trusted across three generations in Tirunelveli since 1996.
          </p>

          {/* Social */}
          <div className="flex gap-2.5">
            {[
              { href: "#", label: "Instagram", icon: Instagram },
              { href: "#", label: "Facebook", icon: Facebook },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-slate-400 hover:border-red/40 hover:text-red hover:bg-red/5 transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="md:col-span-3">
          <h6 className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-5">Navigate</h6>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group inline-flex items-center gap-1.5 font-body text-[14.5px] text-slate-500 hover:text-ink transition-colors">
                  {l.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-4">
          <h6 className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-5">Contact</h6>
          <ul className="space-y-3.5">
            <li className="flex items-start gap-3">
              <Phone size={14} className="mt-1 flex-shrink-0 text-red" />
              <a href="tel:+919443150850" className="font-body text-[14.5px] text-slate-500 hover:text-ink transition-colors">
                +91 94431 50850
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={14} className="mt-1 flex-shrink-0 text-red" />
              <a href="mailto:info@durgaprinters.com" className="font-body text-[14.5px] text-slate-500 hover:text-ink transition-colors break-all">
                info@durgaprinters.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} className="mt-1 flex-shrink-0 text-red" />
              <span className="font-body text-[14.5px] text-slate-500">
                12, Main Bazaar Road,<br />Tirunelveli, TN – 627001
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/[0.06]">
        <div className="container-px mx-auto max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <small className="font-mono text-[12px] text-slate-400">
            © {new Date().getFullYear()} Durga Printers. All rights reserved.
          </small>
          <small className="font-mono text-[12px] text-slate-400">
            Est. 1996 · Tirunelveli · Built with care
          </small>
        </div>
      </div>
    </footer>
  );
}
