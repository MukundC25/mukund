import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mukund Chavan | Software Engineer & AI/ML Developer",
  description: "Portfolio of Mukund Chavan - Software Engineer specializing in AI/ML, full-stack development, and competitive programming. B.Tech student at MIT Academy of Engineering with expertise in Python, React, Next.js, and machine learning.",
  keywords: ["Mukund Chavan", "Software Engineer", "AI/ML Developer", "Full Stack Developer", "React", "Next.js", "Python", "Machine Learning"],
  authors: [{ name: "Mukund Chavan" }],
  openGraph: {
    title: "Mukund Chavan | Software Engineer & AI/ML Developer",
    description: "Portfolio of Mukund Chavan - Software Engineer specializing in AI/ML, full-stack development, and competitive programming.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukund Chavan | Software Engineer & AI/ML Developer",
    description: "Portfolio of Mukund Chavan - Software Engineer specializing in AI/ML, full-stack development, and competitive programming.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mukund Chavan",
              jobTitle: "Software Engineer & AI/ML Developer",
              url: "https://mukundchavan.dev",
              sameAs: [
                "https://github.com/MukundC25",
                "https://linkedin.com/in/mukundchavan2",
                "https://leetcode.com/mukund2503",
              ],
              email: "officialmukundchavan@gmail.com",
              knowsAbout: ["Software Engineering", "Machine Learning", "AI", "Full Stack Development", "Competitive Programming"],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
