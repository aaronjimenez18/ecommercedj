import type { Metadata } from "next";
import { Cormorant_Garamond } from 'next/font/google'
import PageLoader from '@/components/ui/page-loader'
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'optional',
})

export const metadata: Metadata = {
  title: "GDL | Producción, Música y DJ",
  description:
    "Plataforma integral para DJ/Productores. Fabricamos muebles especializados y curamos experiencias sonoras inolvidables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`h-full ${display.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
