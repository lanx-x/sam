import type { MetadataRoute } from "next";
import { globalApi, createLocalizedApi } from "@/api";
import { SITE_URL } from "@/utils/env";
import {
  DYNAMIC_ROUTE_CONFIGS,
  getDynamicItemSegment,
  getDynamicRouteTypeFromPattern,
  type DynamicRouteItem,
} from "@/utils/dynamic-routes";

export const dynamic = 'force-dynamic';

type SitemapEntryMeta = {
  lastModified?: string | Date;
};

function getEntryLastModified(item: {
  updatedAt?: string | Date | null;
  publishedAt?: string | Date | null;
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
      ...Object.values(DYNAMIC_ROUTE_CONFIGS).map((config) => config.fetch(api)),
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

      const routeType = getDynamicRouteTypeFromPattern(patternSlug);
      if (!routeType) continue;

      const dynamicResult = dynamicResults[Object.keys(DYNAMIC_ROUTE_CONFIGS).indexOf(routeType)];
      for (const item of dynamicResult.data as DynamicRouteItem[]) {
        if (!item.documentId) continue;

        const slug = patternSlug.replace("{{id}}", getDynamicItemSegment(routeType, item));
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
