import { notFound } from "next/navigation";
import { getPage, getPatternPages } from "@/api";
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

  // 1. 只拿 slug 列表，判断是否命中 {{id}} 模式
  const { data: patternPages } = await getPatternPages({ locale })
  let matchedSlug: string | null = null
  let documentId: string | null = null

  for (const p of patternPages) {
    const regex = new RegExp('^' + p.slug.replace('{{id}}', '(.+)') + '$', 'i')
    const m = pageSlug.match(regex)
    if (m) {
      matchedSlug = p.slug
      documentId = m[1]
      break
    }
  }

  // 2. 命中模式页 → 请求模板页完整数据；否则精确查找
  const pageData = matchedSlug
    ? (await getPage({ slug: matchedSlug, locale })).data[0]
    : (await getPage({ slug: pageSlug, locale })).data[0]

  if (!pageData) {
    notFound();
  }

  return (
    <div>
      {
        pageData.content?.map((section) => {
          const Cmp = CmpMap[section.payload?.renderer?.cmp];

          if (!Cmp) {
            logger.warn(`Unknown renderer: ${section.payload?.renderer?.cmp}`);
            return null;
          }

          return <Cmp key={section.id} section={section} documentId={documentId} />;
        })
      }
    </div>
  )
}
