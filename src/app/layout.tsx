import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Lora } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ismailbooks.com"),
  title: "IsmailBooks — Buugaag, Kooban & Aqoon Af-Soomaali",
  description:
    "Maktabad dhijitaal ah oo Af-Soomaali ah: buugaagta cilmi-nafsiga, falsafadda iyo horumarinta nafta. Akhriso, iibso, oo kobci aqoontaada.",
  keywords: [
    "IsmailBooks",
    "Buugaag Soomaali",
    "Cilmi-nafsiga",
    "Falsafadda",
    "Horumar Shaqsiyeed",
    "Somali books",
    "Psychology",
    "Philosophy",
  ],
  authors: [{ name: "Ismail Abdi Ismail" }],
  creator: "Ismail Abdi Ismail",
  openGraph: {
    title: "IsmailBooks — Buugaag & Aqoon Af-Soomaali",
    description: "Buugaag dhijitaal ah oo Af-Soomaali ah. Akhriso maanta.",
    url: "https://ismailbooks.com",
    siteName: "IsmailBooks",
    type: "website",
    locale: "so_SO",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IsmailBooks — Maktabadda Af-Soomaaliga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IsmailBooks — Buugaag & Aqoon Af-Soomaali",
    description: "Buugaag dhijitaal ah oo Af-Soomaali ah. Akhriso maanta.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF7F0" },
    { media: "(prefers-color-scheme: dark)", color: "#201B16" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="so"
      dir="ltr"
      className={`${inter.variable} ${fraunces.variable} ${lora.variable} h-full antialiased selection:bg-[#7A1F2B] selection:text-white`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FBF7F0] text-[#201B16]" suppressHydrationWarning>
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
