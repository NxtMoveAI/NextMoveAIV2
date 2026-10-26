import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#6757F5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Next Move AI — Intelligent Student Career & Continuous Growth Platform",
  description:
    "We don't decide careers; we enable clarity. Explore your interests, discover verified Indian education pathways, test 15-minute practical trials, and make informed choices with AI guidance that grows alongside you.",
  keywords: [
    "Next Move AI",
    "Student Intelligence",
    "Career Guidance India",
    "Stream Selection Class 10",
    "Degree Pathways",
    "Continuous Growth Ecosystem",
    "Navlore AI",
  ],
  authors: [{ name: "Navlore AI Technologies LLP" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Next Move AI — We don't decide careers; we enable clarity.",
    description:
      "A student-centered AI intelligence, decision, and continuous growth ecosystem. Explore possibilities, test practical trials, and build your next move.",
    siteName: "Next Move AI",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#171A2B] antialiased selection:bg-[#EDEAFF] selection:text-[#6757F5]">
        {children}
      </body>
    </html>
  );
}
