import type { Metadata } from "next";
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
  title: "IsmailBooks — Somali Psychology, Philosophy & Literature",
  description:
    "The premier Somali digital platform for psychology, philosophy books, summaries, and insightful essays.",
  keywords: [
    "IsmailBooks",
    "Somali books",
    "Somali psychology",
    "Falsafadda Soomaalida",
    "Buugaag Soomaali",
    "Ismail Abdi Ismail",
  ],
  openGraph: {
    title: "IsmailBooks — Somali Psychology, Philosophy & Literature",
    description:
      "Discover curated Somali translations, deep book summaries, and transformative essays.",
    url: "https://ismailbooks.com",
    siteName: "IsmailBooks",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="so"
      className={`${inter.variable} ${fraunces.variable} ${lora.variable} h-full antialiased selection:bg-[#7A1F2B] selection:text-white`}
    >
      <body className="min-h-full flex flex-col bg-[#FBF7F0] text-[#201B16]">
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
