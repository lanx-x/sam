import { notFound } from "next/navigation";
import { createLocalizedApi } from "@/api";
import { logger } from "@/utils/logger";
import { CmpMap } from "@/components";
import { CommonSection, Site } from "cms-types";
import { getRuntimeLocale } from "@/i18n/server";

// TODO: 
// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string; slug: string[] }>;
// }): Promise<Metadata> {
//   const { locale: routeLocale, slug } = await params;
//   const locale = getLocale(routeLocale);
//   const api = createLocalizedApi(locale);
//   const page = await api.getPage({ slug: slug.join("/") });
//
//   if (!page) return {};
//
//   const seo = page.seo as { title?: string; desc?: string } | null;
//   return {
//     title: seo?.title || slug.join("/"),
//     description: seo?.desc,
//   };
// }

export default async function CatchAllPage({ params, searchParams, }: { params: Promise<{ locale: string; slug: string[] }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { locale: routeLocale, slug = [] } = await params
  const sp = await searchParams
  logger.debug('page params:', { locale: routeLocale, slug });

  const { locale } = await getRuntimeLocale(routeLocale);
  const api = createLocalizedApi(locale);
  const site = await api.getSite()
  const pageSlug = ['/', ...slug].join('/').replace(/^\/\//, '/')

  // 1. 只拿 slug 列表，判断是否命中 {{id}} 模式
  const { data: patternPages } = await api.getPatternPages()
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
    ? (await api.getPage({ slug: matchedSlug })).data[0]
    : (await api.getPage({ slug: pageSlug })).data[0]

  if (!pageData) {
    notFound();
  }

  return (
    <div>
      {
        pageData.content?.map((section, idx) => {
          const rendererName = section.payload?.renderer?.cmp;
          if (!rendererName) {
            logger.warn("Section renderer is missing.");
            return null;
          }

          const Cmp = CmpMap[rendererName];
          if (!Cmp) {
            logger.warn(`Unknown renderer: ${rendererName}`);
            return null;
          }

          return <Cmp
            key={idx}
            site={site}
            section={section}
            documentId={documentId}
            searchParams={sp}
            slug={slug}
            locale={locale} />;
        })
      }
    </div>
  )
}

export type CmpProps = {
  site: Site,
  section: CommonSection,
  documentId: string | null,
  searchParams: { [key: string]: string | string[] | undefined },
  slug: string[],
  locale: string
}
