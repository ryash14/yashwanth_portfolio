import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Dancing_Script } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/components/Toast";
import Cursor from "@/components/Cursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-signature",
  display: "swap",
  weight: ["700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yashwanthreddygari.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yashwanth Reddy Reddygari — AI & Full Stack Developer",
    template: "%s | Yashwanth Reddy Reddygari",
  },
  description:
    "AI & Full Stack Developer from Hyderabad. Research intern at ISRO & DRDO. Building scalable software and AI systems. Open to full-time SDE roles, graduating 2026.",
  keywords: [
    "Yashwanth Reddy Reddygari",
    "AI Developer",
    "Full Stack Developer",
    "Software Engineer",
    "ISRO Intern",
    "DRDO Intern",
    "React",
    "Next.js",
    "Python",
    "Machine Learning",
    "RAG",
    "Portfolio",
    "Hyderabad",
  ],
  authors: [{ name: "Yashwanth Reddy Reddygari", url: SITE_URL }],
  creator: "Yashwanth Reddy Reddygari",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Yashwanth Reddy Reddygari",
    title: "Yashwanth Reddy Reddygari — AI & Full Stack Developer",
    description:
      "AI & Full Stack Developer from Hyderabad. Research intern at ISRO & DRDO. 4x Hackathon winner. Open to full-time SDE roles.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashwanth Reddy Reddygari — AI & Full Stack Developer",
    description:
      "AI & Full Stack Developer from Hyderabad. Research intern at ISRO & DRDO. 4x Hackathon winner.",
    creator: "@yashredd",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yashwanth Reddy Reddygari",
  url: SITE_URL,
  jobTitle: "AI & Full Stack Developer",
  description:
    "Final-year B.E. CSE student at MVSR Engineering College. Research intern at ISRO and DLRL–DRDO. 4x Hackathon winner.",
  email: "ryashwanthreddygari@gmail.com",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "MVSR Engineering College",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/ryash14",
    "https://linkedin.com/in/yashredd",
    "https://leetcode.com/u/Yashwanth1408/",
  ],
  knowsAbout: [
    "Python", "React", "Next.js", "Machine Learning", "RAG", "LangChain",
    "Node.js", "FastAPI", "PostgreSQL", "Docker",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${dancingScript.variable}`}
    >
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ToastProvider>
            <Cursor />
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
