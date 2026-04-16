import { createLocalizedApi } from "@/api";
import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const api = createLocalizedApi('en');
  const site = await api.getSite();
  if (!site?.data?.url) return { rules: { userAgent: "*", allow: "/" } };

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.data.url}/sitemap.xml`,
  };
}
