"use client";

import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type FormState = { name: string; phone: string; service: string; message: string };
type Errors = Partial<Record<keyof FormState, string>>;

const serviceOptions = [
  "Visiting Cards", "Wedding Invitations", "Kovil Invitations", "Flyers & Brochures",
  "Wall Posters", "Hotel Menu Card", "Table Mate", "Car Parking Pass",
  "Pads / Bill Books", "Banners", "Stickers", "Signature 2.5×3.5 Card", "Other",
];

const contactInfo = [
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 94431 50850",
    href: "tel:+919443150850",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@durgaprinters.com",
    href: "mailto:info@durgaprinters.com",
  },
  {
    icon: MapPin,
    label: "Shop Address",
    value: "12, Main Bazaar Road, Tirunelveli, TN – 627001",
    href: null,
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat, 9:30 AM – 8:30 PM",
    href: null,
  },
];

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(): boolean {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!form.service) next.service = "Please select a service.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const text = `Hello Durga Printers, I'm ${form.name} (${form.phone}). I'd like to enquire about: ${form.service}. ${form.message}`;
    window.open(`https://wa.me/919443150850?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  }

  return (
    <section id="contact" className="py-24 md:py-36 bg-slate-50 overflow-hidden">
      <div className="container-px mx-auto max-w-6xl">

        <Reveal className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">Get In Touch</p>
          <h2 className="section-heading mb-5">Let&apos;s start your print.</h2>
          <p className="text-slate-500 text-[16px] leading-relaxed font-body">
            Reach out with your requirement — size, quantity, and design idea — and we&apos;ll
            get back with pricing the same day.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16">

          {/* Left: Info */}
          <Reveal delay={0.05} className="space-y-5">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 p-4 rounded-xl card-3d cursor-default">
                <span className="w-10 h-10 rounded-lg bg-red/10 border border-red/15 text-red flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={17} strokeWidth={1.7} />
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400 mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="font-body text-[15px] text-ink hover:text-red transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="font-body text-[15px] text-ink">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-black/[0.06] h-60 mt-2">
              <iframe
                title="Durga Printers location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.9189396263595!2d77.7288636750149!3d8.729188491320496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04118c7ea1b585%3A0xe54e60742f9e4221!2sDurga%20Printers!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="card-3d p-7 md:p-8 space-y-5"
            >
              <h3 className="font-display text-[24px] text-ink mb-2" style={{ fontWeight: 400 }}>
                Send an Enquiry
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    className={`form-input ${errors.name ? "error" : ""}`}
                  />
                </Field>
                <Field label="Phone Number" error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="10-digit number"
                    aria-invalid={!!errors.phone}
                    className={`form-input ${errors.phone ? "error" : ""}`}
                  />
                </Field>
              </div>

              <Field label="What do you need printed?" error={errors.service}>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  aria-invalid={!!errors.service}
                  className={`form-input ${errors.service ? "error" : ""}`}
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>

              <Field label="Tell us more (optional)">
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Quantity, size, design ideas, deadline..."
                  rows={4}
                  className="form-input resize-none"
                />
              </Field>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-red text-white font-body font-medium text-[14.5px] hover:bg-red-dark transition-all duration-300 hover:shadow-glow-red group"
              >
                Send via WhatsApp
                <Send size={15} className="group-hover:translate-x-0.5 -translate-y-0.5 transition-transform" />
              </button>

              {sent && (
                <div className="flex items-center gap-2 text-green-600 text-[13.5px] font-body justify-center" role="status">
                  <CheckCircle size={15} />
                  Opening WhatsApp — see you there!
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400 mb-2">{label}</span>
      {children}
      {error && <span className="block mt-1.5 font-body text-[12.5px] text-red">{error}</span>}
    </label>
  );
}
