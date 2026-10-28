import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AvenqoraAI from "@/components/AvenqoraAI";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://avenqoratechnologies.co.za"),

  title: {
    default: "Avenqora | Software, Web Development & IT Solutions",
    template: "%s | Avenqora",
  },

  applicationName: "Avenqora",

  description:
    "Avenqora builds modern websites, custom software, digital experiences, and practical IT solutions for businesses in South Africa.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://avenqoratechnologies.co.za/",
    siteName: "Avenqora",
    title: "Avenqora | Software, Web Development & IT Solutions",
    description:
      "Modern websites, custom software, digital experiences, and IT solutions for businesses in South Africa.",
    locale: "en_ZA",
  },
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
        <AvenqoraAI />
        </body>
    </html>
  );
}
