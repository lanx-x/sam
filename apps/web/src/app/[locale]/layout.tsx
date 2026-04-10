import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
};
import { Broadcast } from "@/components/Broadcast";
import { Nav } from "@/components/Nav";
import { createLocalizedApi, globalApi } from "@/api";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { getRuntimeLocale } from "@/i18n/server";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: routeLocale } = await params;
  const { locale, localeList, defaultLocale } = await getRuntimeLocale(routeLocale);
  const api = createLocalizedApi(locale);

  const { data: navData } = await api.getNavigation("owqgz3ze0n1a15777qpdokl0");
  const siteData = (await api.getSite()).data;
  const broadcasts = await api.getBroadcast();

  return (
    <html lang={locale} className={`h-full antialiased`}>
      <body className={`${roboto.variable} min-h-full flex flex-col font-sans`}>
        <Broadcast currentLocale={locale} defaultLocale={defaultLocale} data={broadcasts.data} siteData={siteData} localeList={localeList} />
        <Nav data={navData} siteData={siteData} locale={locale} />
        {children}
        <Footer navigation={navData} locale={locale} siteData={siteData} />
        <FloatingActions siteData={siteData} />
      </body>
    </html>
  );
}
