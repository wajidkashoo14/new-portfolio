import { Lora, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Wajid Hussain Kashoo — Software Engineer",
  description: "Software Engineer with a Masters in CS, expertise in full-stack web development, robotics, and hardware integration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
