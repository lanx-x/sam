import { notFound } from "next/navigation";
import { getPage } from "@/api";
import { getLocale } from "@/i18n";
import { logger } from "@/utils/logger";
import type { Metadata } from "next";
import { CmpMap } from "@/components";

// TODO: 
// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ lang: string; slug: string[] }>;
// }): Promise<Metadata> {
//   const { lang, slug } = await params;
//   const locale = getLocale(lang) ?? defaultLocale;
//   const page = await getPage(slug.join("/"), locale);
//
//   if (!page) return {};
//
//   const seo = page.seo as { title?: string; desc?: string } | null;
//   return {
//     title: seo?.title || slug.join("/"),
//     description: seo?.desc,
//   };
// }

export default async function CatchAllPage({ params, }: { params: Promise<{ lang: string; slug: string[] }> }) {
  const { lang, slug = [] } = await params
  logger.debug('page params:', { lang, slug });

  const locale = getLocale(lang)

  const pageSlug = ['/', ...slug].join('/').replace(/^\/\//, '/')
  const pageData = (await getPage(pageSlug, locale)).data[0]

  if (!pageData) {
    notFound();
  }

  return (
    <div>
      {
        pageData.content?.map((section) => {
          const Cmp = CmpMap[section.renderer?.cmp ?? ""];

          if (!Cmp) {
            logger.warn(`Unknown renderer: ${section.renderer?.cmp}`);
            return null;
          }

          return <Cmp key={section.id} section={section} />;
        })
      }
    </div>
  )
}
