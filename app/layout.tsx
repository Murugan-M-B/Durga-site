import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://durgaprinters.com"),
  title: {
    default: "Durga Printers | Premium Printing & Design Studio, Tirunelveli",
    template: "%s | Durga Printers",
  },
  description:
    "Durga Printers has served three generations in Tirunelveli since 1996 — wedding cards, business cards, hospitality print and our signature devotional pocket card.",
  keywords: [
    "printing Tirunelveli",
    "wedding invitation printing",
    "business card printing Tirunelveli",
    "table mate printing",
    "signature card printing",
    "Durga Printers",
    "visiting cards Tirunelveli",
    "banners Tirunelveli",
  ],
  openGraph: {
    title: "Durga Printers | Premium Printing & Design Studio, Tirunelveli",
    description:
      "34+ years of printing excellence in Tirunelveli — cards, invitations, hospitality print and more.",
    url: "https://durgaprinters.com",
    siteName: "Durga Printers",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/durga-logo.png", type: "image/png" },
    ],
    apple: "/durga-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/durga-logo.png" type="image/png" />
      </head>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
