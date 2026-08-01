import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["400", "600", "700", "800"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "700"] });

const baseUrl = "https://chitrarthrai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Chitrarth Rai — Senior React Native & Full-Stack Engineer",
    template: "%s | Chitrarth Rai",
  },
  description:
    "Software Engineer @ Neophyte AI specializing in React Native, MERN stack, Kotlin, and ONNX C++ runtime. 40+ enterprise microservices shipped for Reliance Retail.",
  keywords: [
    "Chitrarth Rai",
    "Full-Stack Developer",
    "React Native Specialist",
    "Next.js Developer",
    "TypeScript Engineer",
    "Reliance Retail Developer",
    "Neophyte AI",
    "MERN Stack",
    "ONNX Runtime Kotlin",
    "Portfolio",
  ],
  authors: [{ name: "Chitrarth Rai", url: baseUrl }],
  creator: "Chitrarth Rai",
  publisher: "Chitrarth Rai",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Chitrarth Rai Portfolio",
    title: "Chitrarth Rai — Senior React Native & Full-Stack Engineer",
    description:
      "Software Engineer @ Neophyte AI specializing in React Native, MERN stack, Kotlin, and ONNX C++ runtime. 40+ enterprise microservices shipped for Reliance Retail.",
    images: [
      {
        url: `${baseUrl}/p3_preview.png`,
        width: 1200,
        height: 630,
        alt: "Chitrarth Rai Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chitrarth Rai — Senior React Native & Full-Stack Engineer",
    description:
      "Software Engineer @ Neophyte AI specializing in React Native, MERN stack, Kotlin, and ONNX C++ runtime.",
    images: [`${baseUrl}/p3_preview.png`],
    creator: "@ChitrarthRai",
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

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Chitrarth Rai",
  url: baseUrl,
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Neophyte AI / Reliance Retail",
  },
  sameAs: [
    "https://github.com/Chitrarthrai",
    "https://linkedin.com/in/chitrarth-rai-38a40917b",
  ],
  knowsAbout: [
    "React Native",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Kotlin Native",
    "C++ ONNX Runtime",
    "MongoDB",
    "Azure Cloud",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className={`${inter.className} ${manrope.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
