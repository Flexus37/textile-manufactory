import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Inter } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500", "600", "700", "800"]
});

const serpantinFont = localFont({
  src: '../../public/fonts/Serpantin.ttf',
  variable: "--font-serpantin",
});

export const metadata: Metadata = {
  title: "Текстильная мануфактура",
  description: "Ивановская текстильная мануфактура",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru,en">
      <body
        className={`${interFont.className} ${serpantinFont.variable} flex flex-col min-h-screen antialiased box-border`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
