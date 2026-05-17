import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Armazém Fifo",
  description: "Mercadinho de produtos com vencimento próximo",
  icons: {
    icon: "/favicon-cart.png",
    shortcut: "/favicon-cart.png",
    apple: "/favicon-cart.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
