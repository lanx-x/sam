import type { MetadataRoute } from "next";
import { globalApi, createLocalizedApi } from "@/api";
import { SITE_URL } from "@/utils/env";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blockSEO = process.env.NEXT_PUBLIC_BLOCK_SEO === "true";
  if (blockSEO || !SITE_URL) return [];

  const localeList = await globalApi.getI18nLocales();

  const slugSet = new Set<string>();
  const pagesByLocale = new Map<
    string,
    Map<string, { lastModified?: string | Date }>
  >();

  for (const loc of localeList) {
    const api = createLocalizedApi(loc.code);
    const { data: pages } = await api.getPage({ 'pagination[pageSize]': 200 });
    const pageMap = new Map<string, { lastModified?: string | Date }>();

    for (const page of pages) {
      const slug = page.slug;
      if (!slug || slug.includes("{{id}}")) continue;

      pageMap.set(slug, {
        lastModified: page.updatedAt ?? page.publishedAt ?? undefined,
      });
      slugSet.add(slug);
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
