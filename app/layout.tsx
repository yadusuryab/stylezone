import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/layout/footer";
import { Toaster } from "sonner";
import OGImage from '@/public/og-image.png'
import React from "react";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://thestylezone.in"), // Replace with your real domain
  title: {
    default: "Stylezone | Premium First Copy Shoes Store in Kerala",
    template: "%s | Stylezone"
  },
  description:
    "Stylezone is Kerala's top-rated online shoe store offering premium first copy sneakers and shoes. Discover quality footwear at budget-friendly prices.",
  keywords: [
    "Stylezone", "First Copy Shoes", "Shoes Kerala", "Sneakers Kerala",
    "Branded Shoes", "Mens Footwear", "Ladies Shoes", "Buy First Copy Shoes Online"
  ],
  openGraph: {
    title: "Stylezone | Premium First Copy Shoes Store in Kerala",
    description:
      "Shop premium first copy shoes and sneakers in Kerala. Affordable, stylish and durable footwear available at Stylezone.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://thestylezone.in",
    siteName: "Stylezone",
    images: [
      {
        url: OGImage.src, // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: "Stylezone Shoe Collection"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Stylezone",
    description:
      "Kerala's trusted first copy shoe store. Find your perfect fit with Stylezone.",
    images: [OGImage.src]
  },
  authors: [{ name: "Kspyn Web Agency", url: "https://kspyn.in" }],
  themeColor: "#000000",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <script src="https://grookilteepsou.net/act/files/tag.min.js?z=9690416" data-cfasync="false" async></script>
      </head>
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="pt-16  md:max-w-[1000px] md:mx-auto min-h-screen">{children}</div>
          <Footer/>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

