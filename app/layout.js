import { Lora, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Wajid Hussain Kashoo — Software Engineer",
  description:
    "Software Engineer with a Masters in CS, expertise in full-stack web development, robotics, and hardware integration. React, Next.js, Python, TypeScript, ACS Motion Control.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${cormorant.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
