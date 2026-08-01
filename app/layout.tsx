import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["400", "600", "700", "800"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Chitrarth Rai — Full-Stack Developer",
  description:
    "Full-stack developer specializing in the MERN ecosystem and Next.js, with expertise in building scalable HR tech, digital shelf analytics, and financial dashboards. 40+ projects & microservices.",
  keywords: [
    "Chitrarth Rai",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "React Native",
    "MERN",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Chitrarth Rai" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
