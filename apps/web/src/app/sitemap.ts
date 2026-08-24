import type { MetadataRoute } from "next";
import { globalApi, createLocalizedApi } from "@/api";
import { SITE_URL } from "@/utils/env";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blockSEO = process.env.NEXT_PUBLIC_BLOCK_SEO === "true";
  if (blockSEO || !SITE_URL) return [];

  const localeList = await globalApi.getI18nLocales();

  const slugSet = new Set<string>();
  const pagesByLocale = new Map<string, string[]>();

  for (const loc of localeList) {
    const api = createLocalizedApi(loc.code);
    const { data: pages } = await api.getPage({ 'pagination[pageSize]': 200 });
    const slugs = pages
      .map((p) => p.slug)
      .filter((slug): slug is string => !!slug && !slug.includes("{{id}}"));
    pagesByLocale.set(loc.code, slugs);
    slugs.forEach((slug) => slugSet.add(slug));
  }

  const entries: MetadataRoute.Sitemap = [];

  for (const slug of slugSet) {
    const languages: Record<string, string> = {};
    for (const loc of localeList) {
      const slugs = pagesByLocale.get(loc.code);
      if (slugs?.includes(slug)) {
        const path = slug === "/" ? "" : `/${slug}`;
        languages[loc.code] = `${SITE_URL}/${loc.code}${path.replace(/\/\//g, '\/')}`;
      }
    }

    // Use the first available locale's URL as the primary
    const primaryUrl = Object.values(languages)[0];

    if (primaryUrl) {
      entries.push({
        url: primaryUrl,
        lastModified: new Date(),
        alternates: { languages },
      });
    }
  }

  return entries;
}
