import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { createLocalizedApi } from "@/api";
import Image from "next/image";
import Link from "next/link";
import { SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { BetterBlocksContent } from "./BetterBlocksContent";
import dayjs from "dayjs";
import { extractBlockText } from "@/utils";

export async function NewsDetail({ documentId, section, slug, locale }: CmpProps) {
  const api = createLocalizedApi(locale);
  const basePath = ['', locale, ...slug.slice(0, -1)].join('/')
  const data = (await api.getNews({ 'filters[documentId][$eq]': documentId })).data?.[0]

  if (!data) {
    return <div className="py-30 text-3xl font-semibold text-center">News: {documentId} not found.</div>
  }

  const currentDate = data.date as string

  // Get next (newer) and previous (older) news by date
  const [nextItems, prevItems] = await Promise.all([
    api.getNews({
      'filters[documentId][$ne]': documentId,
      'filters[date][$gt]': currentDate,
      'pagination[pageSize]': 2,
      'sort[0]': 'date:asc',
    }),
    api.getNews({
      'filters[documentId][$ne]': documentId,
      'filters[date][$lt]': currentDate,
      'pagination[pageSize]': 2,
      'sort[0]': 'date:desc',
    }),
  ])

  const hasNext = (nextItems.data?.length ?? 0) > 0
  const hasPrev = (prevItems.data?.length ?? 0) > 0

  // If both exist: show 1 prev + 1 next
  // If no prev: show 2 next
  // If no next: show 2 prev
  const relatedNews = !hasPrev
    ? nextItems.data!.slice(0, 2)
    : !hasNext
      ? prevItems.data!.slice(0, 2)
      : [prevItems.data![0], nextItems.data![0]]

  return (
    <div className="px-5 xl:px-0">
      <SectionContainer className="xl:w-211.5">
        <div className="pt-15 xl:pt-20 pb-28 border-b border-b-[#efefef]">
          <span className="text-sm text-secondary">{dayjs(data.date as string).format('YYYY-MM-DD HH:mm')}</span>
          <h1 className="leading-none text-2xl xl:text-4xl font-medium mt-2 mb-5">{data.title}</h1>
          {data.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <Image fill src={getStrapiMedia(data.image) ?? ""} alt="" className="w-full object-cover" />
            </div>
          )}
          {data.content && (
            <div className="mt-5 xl:mt-10 prose max-w-none">
              <BetterBlocksContent content={data.content} />
            </div>
          )}
        </div>
      </SectionContainer>

      {relatedNews.length > 0 && (
        <div className="pt-10 pb-10 xl:pb-35">
          <SectionContainer className="xl:w-211.5">
            <p className="text-left text-[32px] font-medium mb-5 leading-none">Next</p>
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 mx-auto">
              {relatedNews.map(xs => (
                <Link target="_blank" key={xs.documentId} href={`${basePath}/${xs.documentId}`} className="group overflow-hidden">

                  <div className="border-b border-[#efefef] hover:border-accent">
                    <div className="h-full pb-5 border-b border-transparent group-hover:border-accent">
                      <div className="aspect-162/91 relative">
                        <Image fill src={getStrapiMedia(xs.image) ?? ""} alt="" className="w-full object-cover rounded-xl" />
                      </div>
                      <p className="text-lg font-semibold mt-4 mb-2 leading-none group-hover:text-accent">{xs.title}</p>
                      <span className="text-secondary leading-none">{dayjs(xs.date as string).format('YYYY-MM-DD')}</span>
                      <p className="shrink-0 leading-none line-clamp-2 flex-1 mt-2">{xs.desc || extractBlockText(xs.content)}</p>
                    </div>
                  </div>

                </Link>
              ))}
            </div>
          </SectionContainer>
        </div>
      )}
    </div>
  )
}
