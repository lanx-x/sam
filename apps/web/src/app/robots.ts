import type { MetadataRoute } from "next";
import { SITE_URL } from "@/utils/env";

export default async function robots(): Promise<MetadataRoute.Robots> {
  if (!SITE_URL) return { rules: { userAgent: "*", allow: "/" } };

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
