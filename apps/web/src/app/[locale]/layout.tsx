import { Roboto } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

import { Broadcast } from "@/components/Broadcast";
import { createLocalizedApi } from "@/api";
import { GoogleAnalytics } from "@next/third-parties/google";
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

  const siteData = (await api.getSite()).data;
  const broadcasts = await api.getBroadcast();

  return (
    <html lang={locale} className={`h-full antialiased`}>
      <body className={`${roboto.variable} min-h-full flex flex-col font-sans`}>
        <Broadcast currentLocale={locale} defaultLocale={defaultLocale} data={broadcasts.data} siteData={siteData} localeList={localeList} />
        {children}
        {siteData.google_analytics && <GoogleAnalytics gaId={siteData.google_analytics} />}
      </body>
    </html>
  );
}
