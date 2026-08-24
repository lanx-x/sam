import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createLocalizedApi } from "@/api";
import { logger } from "@/utils/logger";
import { CmpMap } from "@/components";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { CommonSection, Site } from "cms-types";
import { getRuntimeLocale } from "@/i18n/server";
import { SITE_URL } from "@/utils/env";

const getPageData = cache(async (routeLocale: string, slug: string[]) => {
  const { locale, localeList } = await getRuntimeLocale(routeLocale);
  const api = createLocalizedApi(locale);
  const site = await api.getSite();
  const pageSlug = ['/', ...slug].join('/').replace(/^\/\//, '/');

  const { data: patternPages } = await api.getPatternPages();
  let matchedSlug: string | null = null;
  let documentId: string | null = null;

  for (const p of patternPages) {
    const regex = new RegExp('^' + p.slug.replace('{{id}}', '(.+)') + '$', 'i');
    const m = pageSlug.match(regex);
    if (m) {
      matchedSlug = p.slug;
      documentId = m[1];
      break;
    }
  }

  const pageData = matchedSlug
    ? (await api.getPage({ slug: matchedSlug })).data[0]
    : (await api.getPage({ slug: pageSlug })).data[0];

  const navData = (await api.getNavigation({ 'filters[actived][$eq]': 'true' })).data?.[0];

  return { locale, localeList, siteData: site.data, pageData, documentId, navData };
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale: routeLocale, slug = [] } = await params;
  const { locale, localeList, siteData, pageData, documentId } = await getPageData(routeLocale, slug);

  if (!pageData) return {};

  let seoTitle = pageData.seo?.title
  let seoDesc = pageData.seo?.desc
  if (documentId) {
    const path = slug.join('/')
    const api = createLocalizedApi(locale);
    let detailSeo: { title?: string | null; desc?: string | null } | null | undefined
    if (path.includes('resources/news')) {
      detailSeo = (await api.getNews({ 'filters[documentId][$eq]': documentId })).data?.[0]?.seo
    } else if (path.includes('resources/case-study')) {
      detailSeo = (await api.getCaseStudyDetail({ 'filters[documentId][$eq]': documentId })).data?.[0]?.seo
    }
    seoTitle = detailSeo?.title || seoTitle
    seoDesc = detailSeo?.desc || seoDesc
  }

  const siteName = siteData.name || '';
  const title = seoTitle ? `${seoTitle} — ${siteName}` : siteName;
  const description = seoDesc || siteData.desc || '';
  const pagePath = ['/', ...slug].join('/').replace(/^\/\//, '/');
  const canonicalUrl = SITE_URL ? `${SITE_URL}/${locale}${pagePath}` : undefined;
  const languages: Record<string, string> = {};
  for (const loc of localeList) {
    if (SITE_URL) languages[loc.code] = `${SITE_URL}/${loc.code}${pagePath}`;
  }

  return {
    title,
    description,
    ...(SITE_URL && { metadataBase: new URL(SITE_URL) }),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName,
      locale,
      ...(canonicalUrl && { url: canonicalUrl }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: 'index, follow',
  };
}

export default async function CatchAllPage({ params, searchParams }: { params: Promise<{ locale: string; slug: string[] }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { locale: routeLocale, slug = [] } = await params;
  const sp = await searchParams;
  logger.debug('page params:', { locale: routeLocale, slug });

  const { locale, siteData, pageData, documentId, navData } = await getPageData(routeLocale, slug);

  if (!pageData) {
    notFound();
  }

  const pageSlug = ['/', ...slug].join('/').replace(/^\/\//, '/');
  const isFormGetQuote = pageSlug.includes('get-quote');

  return (
    <>
      <Nav data={navData} siteData={siteData} locale={locale} showLogoOnly={isFormGetQuote} />
      {
        pageData.content?.map((section, idx) => {
          const rendererName = section.payload?.renderer?.cmp;
          if (!rendererName) {
            logger.warn("Section renderer is missing.");
            return null;
          }

          const Cmp = CmpMap[rendererName];
          if (!Cmp) {
            logger.warn(`Unknown renderer: ${rendererName}`);
            return null;
          }

          return <Cmp
            key={idx}
            siteData={siteData}
            section={section}
            documentId={documentId}
            searchParams={sp}
            slug={slug}
            locale={locale} />;
        })
      }
      {!isFormGetQuote && <Footer navigation={navData} locale={locale} siteData={siteData} />}
      {!isFormGetQuote && <FloatingActions siteData={siteData} />}
    </>
  )
}

export type CmpProps = {
  siteData: Site,
  section: CommonSection,
  documentId: string | null,
  searchParams: { [key: string]: string | string[] | undefined },
  slug: string[],
  locale: string
}
