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
import {
  buildDynamicDetailPath,
  findDynamicRouteItem,
  findDynamicRouteItemByDocumentId,
  getDynamicRouteTypeFromPattern,
  type DynamicRouteItem,
  type DynamicRouteType,
} from "@/utils/dynamic-routes";
import { extractBlockText } from "@/utils";
import { getStrapiMedia } from "@/utils/strapi";

type SeoLike = {
  title?: string | null;
  desc?: string | null;
};

type MetaMediaLike =
  | string
  | {
      url?: string | null;
      data?: {
        url?: string | null;
        attributes?: {
          url?: string | null;
        } | null;
      } | null;
    }
  | null
  | undefined;

type DynamicMetaSource = {
  seo?: SeoLike | null;
  title?: string | null;
  name?: string | null;
  desc?: string | null;
  detailPageTitle?: string | null;
  detailPageDesc?: string | null;
  content?: unknown;
  detailPageContent?: unknown;
  image?: MetaMediaLike;
  icon?: MetaMediaLike;
  detailPageBanner?: MetaMediaLike;
  extend?: {
    title?: string | null;
    desc?: string | null;
  } | null;
};

async function getDynamicMetaSource(
  locale: string,
  type: DynamicRouteType,
  documentId: string
): Promise<DynamicMetaSource | null> {
  const api = createLocalizedApi(locale);

  switch (type) {
    case "news":
      return (await api.getNews({ 'filters[documentId][$eq]': documentId })).data?.[0] ?? null;
    case "caseStudy":
      return (await api.getCaseStudyDetail({ 'filters[documentId][$eq]': documentId })).data?.[0] ?? null;
    case "equipment":
      return (await api.getEquipmentDetail({ 'filters[documentId][$eq]': documentId })).data?.[0] ?? null;
    case "material":
      return (await api.getMaterialDetail({ 'filters[documentId][$eq]': documentId })).data?.[0] ?? null;
    case "surfaceTreatment":
      return (await api.getSurfaceTreatmentDetail({ 'filters[documentId][$eq]': documentId })).data?.[0] ?? null;
    case "industry":
      return (await api.getIndustryDetail({ 'filters[documentId][$eq]': documentId })).data?.[0] ?? null;
    default:
      return null;
  }
}

function pickDynamicMeta(source: DynamicMetaSource | null) {
  if (!source) {
    return {
      title: undefined,
      description: undefined,
      image: undefined,
    };
  }

  const title =
    source.seo?.title ||
    source.detailPageTitle ||
    source.extend?.title ||
    source.title ||
    source.name ||
    undefined;

  const description =
    source.seo?.desc ||
    source.detailPageDesc ||
    source.extend?.desc ||
    source.desc ||
    extractBlockText(source.detailPageContent) ||
    extractBlockText(source.content) ||
    undefined;

  const image =
    getStrapiMedia(source.detailPageBanner) ||
    getStrapiMedia(source.image) ||
    getStrapiMedia(source.icon) ||
    undefined;

  return { title, description, image };
}

const getPageData = cache(async (routeLocale: string, slug: string[]) => {
  const { locale, localeList } = await getRuntimeLocale(routeLocale);
  const api = createLocalizedApi(locale);
  const site = await api.getSite();
  const pageSlug = ['/', ...slug].join('/').replace(/^\/\//, '/');

  const { data: patternPages } = await api.getPatternPages();
  let matchedSlug: string | null = null;
  let documentId: string | null = null;
  let dynamicRouteType: DynamicRouteType | null = null;
  let dynamicItem: DynamicRouteItem | null = null;

  for (const p of patternPages) {
    const regex = new RegExp('^' + p.slug.replace('{{id}}', '(.+)') + '$', 'i');
    const m = pageSlug.match(regex);
    if (m) {
      matchedSlug = p.slug;
      documentId = m[1];
      dynamicRouteType = getDynamicRouteTypeFromPattern(p.slug);
      if (dynamicRouteType) {
        dynamicItem = await findDynamicRouteItem(api, dynamicRouteType, m[1]);
        documentId = dynamicItem?.documentId ?? m[1];
      }
      break;
    }
  }

  const pageData = matchedSlug
    ? (await api.getPage({ slug: matchedSlug })).data[0]
    : (await api.getPage({ slug: pageSlug })).data[0];

  const navData = (await api.getNavigation({ 'filters[actived][$eq]': 'true' })).data?.[0];

  return {
    locale,
    localeList,
    siteData: site.data,
    pageData,
    documentId,
    navData,
    dynamicRouteType,
    dynamicItem,
  };
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale: routeLocale, slug = [] } = await params;
  const { locale, localeList, siteData, pageData, documentId, dynamicRouteType, dynamicItem } = await getPageData(routeLocale, slug);

  if (!pageData) return {};

  let seoTitle = pageData.seo?.title
  let seoDesc = pageData.seo?.desc
  let seoImage: string | undefined
  if (documentId) {
    if (dynamicRouteType) {
      const dynamicMeta = pickDynamicMeta(
        await getDynamicMetaSource(locale, dynamicRouteType, documentId)
      );
      seoTitle = dynamicMeta.title || seoTitle
      seoDesc = dynamicMeta.description || seoDesc
      seoImage = dynamicMeta.image
    }
  }

  const siteName = siteData.name || '';
  const title = seoTitle ? `${seoTitle} — ${siteName}` : siteName;
  const description = seoDesc || siteData.desc || '';
  const fallbackPagePath = ['/', ...slug].join('/').replace(/^\/\//, '/');
  const pagePath = dynamicRouteType && dynamicItem
    ? buildDynamicDetailPath(locale, dynamicRouteType, dynamicItem).replace(`/${locale}`, "")
    : fallbackPagePath;
  const canonicalUrl = SITE_URL ? `${SITE_URL}/${locale}${pagePath}` : undefined;
  const languages: Record<string, string> = {};
  for (const loc of localeList) {
    if (!SITE_URL) continue;

    if (dynamicRouteType && documentId) {
      const localizedApi = createLocalizedApi(loc.code);
      const localizedItem = loc.code === locale && dynamicItem
        ? dynamicItem
        : await findDynamicRouteItemByDocumentId(localizedApi, dynamicRouteType, documentId);

      if (localizedItem) {
        languages[loc.code] = `${SITE_URL}${buildDynamicDetailPath(loc.code, dynamicRouteType, localizedItem)}`;
        continue;
      }
    }

    languages[loc.code] = `${SITE_URL}/${loc.code}${pagePath}`;
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
      ...(seoImage ? { images: [seoImage] } : {}),
    },
    twitter: {
      card: seoImage ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(seoImage ? { images: [seoImage] } : {}),
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
