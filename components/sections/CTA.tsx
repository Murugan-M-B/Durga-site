import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container-px mx-auto max-w-5xl">
        <Reveal>
          <div
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
            style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" }}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Glow blobs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-black/20 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 mb-6">
                <Sparkles size={13} className="text-white/80" />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
                  Ready to print?
                </span>
              </div>

              <h2
                className="font-display text-[40px] md:text-[52px] text-white mb-5 leading-[1.1]"
                style={{ fontWeight: 400 }}
              >
                Let&apos;s bring your print to life.
              </h2>
              <p className="font-body text-white/70 text-[16px] max-w-lg mx-auto mb-9">
                From quick quotes to full design help — we&apos;re just a WhatsApp message away.
                Same-day response, expert advice.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-red font-body font-semibold text-[15px] hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
                >
                  Request a Quote
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="https://wa.me/919443150850"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border-2 border-white/40 text-white font-body font-medium text-[15px] hover:border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
