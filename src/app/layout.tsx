import type { Metadata } from "next";
import { Cormorant_Garamond } from 'next/font/google'
import Script from 'next/script'
import ScrollToTop from '@/components/ui/scroll-to-top'
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'optional',
})

export const metadata: Metadata = {
  title: {
    default: "GDL | Producción, Música y DJ",
    template: "%s | GDL",
  },
  description:
    "Plataforma integral para DJ/Productores. Fabricamos muebles especializados y curamos experiencias sonoras inolvidables.",
  metadataBase: new URL('https://djgdl.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "GDL | Producción, Música y DJ",
    description:
      "Plataforma integral para DJ/Productores. Fabricamos muebles especializados y curamos experiencias sonoras inolvidables.",
    url: 'https://djgdl.netlify.app',
    siteName: 'GDL',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GDL | Producción, Música y DJ",
    description:
      "Plataforma integral para DJ/Productores. Fabricamos muebles especializados y curamos experiencias sonoras inolvidables.",
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
    <html lang="es" className={`h-full ${display.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Script id="schema-organization" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'GDL',
            url: 'https://djgdl.netlify.app',
            description: 'Plataforma integral para DJ/Productores. Fabricamos muebles especializados y curamos experiencias sonoras inolvidables.',
          })}
        </Script>
      </head>
      <body className="site-body">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
