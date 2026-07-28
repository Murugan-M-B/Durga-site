import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { timeline } from "@/lib/data";

const whyItems = [
  { n: "01", title: "34 Years of Experience", body: "There's almost no print job we haven't handled before — and gotten right." },
  { n: "02", title: "Trusted by Three Generations", body: "Children of our earliest customers now bring their own print orders to us." },
  { n: "03", title: "Consistent Quality", body: "Same attention to colour accuracy and finish on order #1 and order #12,000." },
  { n: "04", title: "Modern Technology", body: "From letterpress to full digital — we've evolved without losing the personal touch." },
];

export function WhyUs() {
  return (
    <section id="heritage" className="py-24 md:py-36 bg-slate-50 overflow-hidden">
      <div className="container-px mx-auto max-w-6xl">

        {/* ── Header ── */}
        <Reveal className="max-w-2xl mb-20">
          <p className="eyebrow mb-4">Our Story · Est. 1996</p>
          <h2 className="section-heading mb-5">
            Three decades of printing,<br />one family&apos;s craft.
          </h2>
          <p className="text-slate-600 text-[16px] leading-relaxed font-body">
            Since 1996, Durga Printers has been the name families, temples, and businesses
            in Tirunelveli turn to when a print has to be right the first time.
          </p>
        </Reveal>

        {/* ── Heritage Image Pair ── */}
        <Reveal className="grid md:grid-cols-2 gap-6 mb-24">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
            <Image
              src="/assets/heritage-then.png"
              alt="Durga Printers in the early days"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-red mb-1">Then</p>
              <p className="font-display text-white text-[22px]" style={{ fontWeight: 400 }}>Where it began</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
            <Image
              src="/assets/heritage-now.png"
              alt="Durga Printers today"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-red mb-1">Now</p>
              <p className="font-display text-white text-[22px]" style={{ fontWeight: 400 }}>Still family-run</p>
            </div>
          </div>
        </Reveal>

        {/* ── Timeline ── */}
        <div className="relative mb-24">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-[92px] top-3 bottom-3 w-px bg-gradient-to-b from-red/40 via-red/20 to-transparent" />

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <Reveal
                key={item.year}
                delay={i * 0.07}
                className="md:grid md:grid-cols-[80px_32px_1fr] md:items-start gap-2"
              >
                <div className="font-mono text-[13px] text-red/90 mb-2 md:mb-0 md:pt-1.5 font-medium">
                  {item.year}
                </div>
                <div className="hidden md:flex justify-center pt-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                </div>
                <div className="md:pb-8">
                  <h5 className="font-display text-[20px] text-ink mb-2" style={{ fontWeight: 400 }}>{item.title}</h5>
                  <p className="text-slate-500 text-[15px] leading-relaxed font-body max-w-lg">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Why It Matters ── */}
        <Reveal>
          <p className="eyebrow mb-4">Why Choose Us</p>
          <h3 className="section-heading mb-10">What makes us different.</h3>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyItems.map((item, i) => (
            <Reveal
              key={item.n}
              delay={i * 0.07}
              className="card-3d p-7 cursor-default"
            >
              <span className="font-mono text-[11px] text-red/70 tracking-[0.1em]">{item.n}</span>
              <h5 className="font-display text-[20px] text-ink mt-4 mb-3" style={{ fontWeight: 400 }}>
                {item.title}
              </h5>
              <p className="text-slate-500 text-[14px] leading-relaxed font-body">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
