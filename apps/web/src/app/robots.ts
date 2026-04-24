import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/env";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const blockSEO = process.env.NEXT_PUBLIC_BLOCK_SEO === "true";

  if (!blockSEO && SITE_URL) {
    return {
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }

  return { rules: { userAgent: "*", disallow: "/" } };
}
