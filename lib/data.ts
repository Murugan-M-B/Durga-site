export type Service = {
  slug: string;
  title: string;
  blurb: string;
  size: "lg" | "wide" | "tall" | "md";
  specs: Record<string, string>;
  image: string;
};

export const services: Service[] = [
  {
    slug: "business-cards",
    title: "Business Cards",
    blurb: "Sharp, professional first impressions.",
    size: "lg",
    specs: {
      Size: "3.5\" × 2\"",
      Finish: "Matte / Glossy / Textured",
      Material: "300–350 GSM Card",
      Price: "From ₹150 / 100 pcs",
    },
    image: "biz-card",
  },
  {
    slug: "invitations",
    title: "Invitations",
    blurb: "Birthday, marriage & kovil functions.",
    size: "md",
    specs: {
      Occasions: "Wedding, Birthday, Kovil Function",
      Finish: "Foil / Matte / Glossy",
      Material: "Premium Card Stock",
      Price: "From ₹10 / piece",
    },
    image: "invite",
  },
  {
    slug: "posters",
    title: "Wall Posters",
    blurb: "Large-format, sharp at any size.",
    size: "tall",
    specs: {
      Sizes: "A3, A2, A1, Custom",
      Finish: "Matte / Glossy Lamination",
      Material: "Art Paper / Vinyl",
      Price: "From ₹50 / sq.ft",
    },
    image: "poster",
  },
  {
    slug: "brochures",
    title: "Flyers & Brochures",
    blurb: "Layouts that get read, not skipped.",
    size: "md",
    specs: {
      Sizes: "A4, A5, Tri-fold",
      Finish: "Matte / Glossy",
      Material: "130–170 GSM Paper",
      Price: "From ₹450 / 100 pcs",
    },
    image: "brochure",
  },
  {
    slug: "table-mate",
    title: "Table Mate",
    blurb: "Games that keep kids busy at the table.",
    size: "wide",
    specs: {
      Games: "Colour Shading, Puzzle, Word Game",
      Finish: "Laminated",
      Size: "Standard Table Sheet",
      Price: "From ₹12 / sheet",
    },
    image: "tablemate",
  },
  {
    slug: "menu-cards",
    title: "Hotel Menu Cards",
    blurb: "Durable, laminated, spill-proof.",
    size: "md",
    specs: {
      Finish: "Laminated / Spill-proof",
      Material: "Rigid Card / PVC",
      Size: "Custom to Your Menu",
      Price: "From ₹45 / piece",
    },
    image: "menu",
  },
  {
    slug: "car-pass",
    title: "Car Parking Pass",
    blurb: "Clear passes for gated parking.",
    size: "md",
    specs: {
      Material: "PVC / Thick Card",
      Finish: "Laminated",
      Size: "Standard Pass Size",
      Price: "From ₹15 / piece",
    },
    image: "carpass",
  },
  {
    slug: "pads",
    title: "Pads & Bill Books",
    blurb: "Bill books, menu pads, leave pads.",
    size: "wide",
    specs: {
      Types: "Bill Book, Menu Pad, Leave Pad",
      Binding: "Glued / Stapled",
      Sheets: "50 / 100 per Pad",
      Price: "From ₹60 / pad",
    },
    image: "pad",
  },
  {
    slug: "banners",
    title: "Banners",
    blurb: "Vinyl & flex, any size.",
    size: "md",
    specs: {
      Material: "Vinyl / Flex",
      Sizes: "Custom, Any Size",
      Finish: "Eyelets on Request",
      Price: "From ₹12 / sq.ft",
    },
    image: "banner",
  },
];

export const stats = [
  { value: 34, suffix: "+", label: "Years of Experience" },
  { value: 3, suffix: "", label: "Generations Served" },
  { value: 25, suffix: "+", label: "Print Categories" },
  { value: 12000, suffix: "+", label: "Orders Delivered" },
];

export const timeline = [
  { year: "1996", title: "Where it began", body: "Durga Printers opened its doors with a single press, printing visiting cards and basic invitations for the local community." },
  { year: "2004", title: "Expanding into temple printing", body: "Introduced the now-iconic 2.5″ × 3.5″ swamy photo card — combining devotion with advertising for local businesses and temple committees." },
  { year: "2012", title: "Moving into hospitality", body: "Started serving hotels and restaurants with menu cards, table mates, bill books and pads." },
  { year: "2018", title: "Digital transformation", body: "Upgraded to full digital printing and lamination, cutting turnaround time while keeping the same trusted quality." },
  { year: "Today", title: "Still family-run, still local", body: "Now printing everything from wedding invitations to large-format banners, with the same care as our very first order." },
];

export const testimonials = [
  {
    quote: "We have ordered our temple festival invitation cards and kumkum covers from Durga Printers for over twelve years — their colour registration and traditional layout design are always impeccable.",
    name: "S. Ramanathan",
    role: "Secretary, Kovil Festival Committee",
    initial: "S",
  },
  {
    quote: "Our hotel's menu cards and kids' Table Mate sheets are all designed and printed by Durga. They are highly durable, spill-proof, and our guests love the table mate games.",
    name: "M. Saravanakumar",
    role: "Owner, Nellai Saravana Bhavan",
    initial: "M",
  },
  {
    quote: "They printed my daughter's wedding cards last year, just like they printed my own wedding cards in 1999. Their attention to detail hasn't changed in twenty-five years.",
    name: "V. Meenakshi",
    role: "Repeat Family Customer",
    initial: "V",
  },
];

export const faqs = [
  {
    q: "How fast can you turn around a bulk order?",
    a: "Most standard orders — visiting cards, invitations, menu cards — are ready in 24–48 hours. Large-format banners and complex die-cuts may take 2–3 days. Rush jobs can often be accommodated; ask when you enquire.",
  },
  {
    q: "Can I see a proof before the full print run?",
    a: "Yes. For any order above 100 pieces, we send a digital proof over WhatsApp for approval before we run the full batch, so there are no surprises on pickup day.",
  },
  {
    q: "Do you design from scratch, or do I need my own artwork?",
    a: "Both. Bring your own design file and we'll prep it for print, or send us your photo, text and colour preferences and our in-house designer will build the layout for you at no extra charge on bulk orders.",
  },
  {
    q: "What's the minimum order quantity?",
    a: "There's no fixed minimum for most products — we print single visiting-card sheets and single banners. Per-piece pricing simply improves at higher quantities (100+, 500+, 1000+).",
  },
  {
    q: "Do you deliver, or is it pickup only?",
    a: "Pickup from our Main Bazaar Road shop is fastest and free. For bulk hospitality or event orders within Tirunelveli, we can arrange delivery — mention your address when you enquire.",
  },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#heritage", label: "Heritage" },
  { href: "#services", label: "Services" },
  { href: "#signature", label: "Signature Card" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];
