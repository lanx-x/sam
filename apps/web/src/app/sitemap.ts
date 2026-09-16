import type { MetadataRoute } from "next";
import type { StrapiCollectionResponse } from "cms-types";
import { globalApi, createLocalizedApi } from "@/api";
import { SITE_URL } from "@/utils/env";
import {
  DYNAMIC_ROUTE_CONFIGS,
  getDynamicItemSegment,
  getDynamicRouteTypeFromPattern,
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

async function fetchAllPages<T>(
  fetchPage: (params: Record<string, unknown>) => Promise<StrapiCollectionResponse<T>>
): Promise<{ data: T[] }> {
  const data: T[] = [];

  for (let page = 1; ; page++) {
    const result = await fetchPage({
      'pagination[page]': page,
      'pagination[pageSize]': 100,
      'pagination[withCount]': true,
      'sort[0]': 'id:asc',
    });
    data.push(...result.data);

    // Follow the server's page count even if it caps the requested page size.
    const pagination = result.meta.pagination;
    if (result.data.length === 0 || (pagination && page >= pagination.pageCount)) {
      break;
    }
  }

  return { data };
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
      fetchAllPages((params) => api.getPage(params)),
      fetchAllPages((params) => api.getPatternPages(params)),
      ...Object.values(DYNAMIC_ROUTE_CONFIGS).map((config) =>
        fetchAllPages((params) => config.fetch(api, params))
      ),
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
      for (const item of dynamicResult.data) {
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
