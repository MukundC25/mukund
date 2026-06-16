import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const dmSans = DM_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mukund Chavan | Software Engineer",
  description:
    "Portfolio of Mukund Chavan - Software Engineer specializing in AI/ML, full-stack development, and competitive programming.",
  keywords: [
    "Mukund Chavan",
    "Software Engineer",
    "AI/ML Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Python",
    "Machine Learning",
  ],
  authors: [{ name: "Mukund Chavan" }],
  openGraph: {
    title: "Mukund Chavan | Software Engineer",
    description:
      "Portfolio of Mukund Chavan - Software Engineer specializing in AI/ML, full-stack development, and competitive programming.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukund Chavan | Software Engineer",
    description:
      "Portfolio of Mukund Chavan - Software Engineer specializing in AI/ML, full-stack development, and competitive programming.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mukund Chavan",
              jobTitle: "Software Engineer",
              url: "https://mukundchavan.dev",
              sameAs: [
                "https://github.com/MukundC25",
                "https://linkedin.com/in/mukundchavan2",
                "https://leetcode.com/mukund2503",
              ],
              email: "officialmukundchavan@gmail.com",
              knowsAbout: [
                "Software Engineering",
                "Machine Learning",
                "AI",
                "Full Stack Development",
                "Competitive Programming",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
