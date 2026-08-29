import { cache } from "react";
import type { Metadata } from "next";
import { createLocalizedApi } from "@/api";
import { Nav } from "@/components/Nav";
import { GetQuoteSuccess } from "@/components/GetQuoteSuccess";
import { getRuntimeLocale } from "@/i18n/server";

const getSuccessPageData = cache(async (routeLocale: string) => {
  const { locale } = await getRuntimeLocale(routeLocale);
  const api = createLocalizedApi(locale);
  const [site, navigation] = await Promise.all([
    api.getSite(),
    api.getNavigation({ "filters[actived][$eq]": "true" }),
  ]);

  return {
    locale,
    siteData: site.data,
    navData: navigation.data?.[0],
  };
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const { siteData } = await getSuccessPageData(routeLocale);
  const displayText = siteData.display_text?.form;

  return {
    title: displayText?.success_page_title ?? "Submitted successfully",
    description: displayText?.success_page_tips ?? undefined,
    robots: "noindex, nofollow",
  };
}

export default async function GetQuoteSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const { locale, siteData, navData } = await getSuccessPageData(routeLocale);
  const displayText = siteData.display_text?.form;

  return (
    <>
      <Nav data={navData} siteData={siteData} locale={locale} showLogoOnly isHome={false} />
      <GetQuoteSuccess
        title={displayText?.success_page_title}
        tips={displayText?.success_page_tips}
      />
    </>
  );
}
