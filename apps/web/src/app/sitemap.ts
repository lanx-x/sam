import type { MetadataRoute } from "next";
import { globalApi, createLocalizedApi } from "@/api";
import { SITE_URL } from "@/utils/env";

export const dynamic = 'force-dynamic';

type SitemapEntryMeta = {
  lastModified?: string | Date;
};

type DynamicItem = {
  documentId?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
};

const DYNAMIC_ROUTE_SOURCES = [
  {
    patternPrefix: "/resources/news/",
    fetch: (api: ReturnType<typeof createLocalizedApi>) =>
      api.getNews({ 'pagination[pageSize]': 200 }),
  },
  {
    patternPrefix: "/resources/equipment/",
    fetch: (api: ReturnType<typeof createLocalizedApi>) =>
      api.getEquipment({ 'pagination[pageSize]': 200 }),
  },
  {
    patternPrefix: "/resources/material/",
    fetch: (api: ReturnType<typeof createLocalizedApi>) =>
      api.getMaterial({ 'pagination[pageSize]': 200 }),
  },
  {
    patternPrefix: "/resources/case-study/",
    fetch: (api: ReturnType<typeof createLocalizedApi>) =>
      api.getCaseStudy({ 'pagination[pageSize]': 200 }),
  },
  {
    patternPrefix: "/solutions/surface-treatment/",
    fetch: (api: ReturnType<typeof createLocalizedApi>) =>
      api.getSurfaceTreatment({ 'pagination[pageSize]': 200 }),
  },
  {
    patternPrefix: "/solutions/industry/",
    fetch: (api: ReturnType<typeof createLocalizedApi>) =>
      api.getIndustry({ 'pagination[pageSize]': 200 }),
  },
] as const;

function getEntryLastModified(item: {
  updatedAt?: string | null;
  publishedAt?: string | null;
}) {
  return item.updatedAt ?? item.publishedAt ?? undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blockSEO = process.env.NEXT_PUBLIC_BLOCK_SEO === "true";
  if (blockSEO || !SITE_URL) return [];

  const localeList = await globalApi.getI18nLocales();

  const slugSet = new Set<string>();
  const pagesByLocale = new Map<
    string,
    Map<string, SitemapEntryMeta>
  >();

  for (const loc of localeList) {
    const api = createLocalizedApi(loc.code);
    const [{ data: pages }, { data: patternPages }, ...dynamicResults] = await Promise.all([
      api.getPage({ 'pagination[pageSize]': 200 }),
      api.getPatternPages(),
      ...DYNAMIC_ROUTE_SOURCES.map((source) => source.fetch(api)),
    ]);

    const pageMap = new Map<string, SitemapEntryMeta>();

    for (const page of pages) {
      const slug = page.slug;
      if (!slug || slug.includes("{{id}}")) continue;

      pageMap.set(slug, {
        lastModified: page.updatedAt ?? page.publishedAt ?? undefined,
      });
      slugSet.add(slug);
    }

    for (const patternPage of patternPages) {
      const patternSlug = patternPage.slug;
      if (!patternSlug?.includes("{{id}}")) continue;

      const source = DYNAMIC_ROUTE_SOURCES.find(({ patternPrefix }) =>
        patternSlug.startsWith(patternPrefix)
      );
      if (!source) continue;

      const dynamicResult = dynamicResults[DYNAMIC_ROUTE_SOURCES.indexOf(source)];
      for (const item of dynamicResult.data as DynamicItem[]) {
        if (!item.documentId) continue;

        const slug = patternSlug.replace("{{id}}", item.documentId);
        pageMap.set(slug, {
          lastModified: getEntryLastModified(item),
        });
        slugSet.add(slug);
      }
    }

    pagesByLocale.set(loc.code, pageMap);
  }

  const entries: MetadataRoute.Sitemap = [];

  for (const slug of slugSet) {
    const languages: Record<string, string> = {};
    let lastModified: string | Date | undefined;

    for (const loc of localeList) {
      const page = pagesByLocale.get(loc.code)?.get(slug);
      if (page) {
        const path = slug === "/" ? "" : `/${slug}`;
        languages[loc.code] = `${SITE_URL}/${loc.code}${path.replace(/\/\//g, '\/')}`;

        if (page.lastModified) {
          if (!lastModified || new Date(page.lastModified) > new Date(lastModified)) {
            lastModified = page.lastModified;
          }
        }
      }
    }

    // Use the first available locale's URL as the primary
    const primaryUrl = Object.values(languages)[0];

    if (primaryUrl) {
      entries.push({
        url: primaryUrl,
        ...(lastModified ? { lastModified } : {}),
        alternates: { languages },
      });
    }
  }

  return entries;
}
