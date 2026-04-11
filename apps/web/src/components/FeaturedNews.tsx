import { Assets } from "@/assets";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { createLocalizedApi } from "@/api";
import Image from "next/image";
import { Section } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import dayjs from "dayjs";
import { mergeExtension } from "@/utils";
import { News } from "cms-types";
import Link from "next/link";

export async function FeaturedNews({ section, documentId, slug, locale }: CmpProps) {
  const api = createLocalizedApi(locale);
  const extension = mergeExtension(section)

  const bg_variant = extension?.bg_variant?.value === 'gray' ? 'bg-[#fafafa]' : 'bg-white'
  let news = ((section.payload?.dynamic?.[0] as any)?.news) as News[] ?? []

  if (extension.basedOnId?.value === 'true') {
    if (slug.join('/').includes('resources/material')) {
      const featured = (await api.getMaterial({ 'filters[documentId][$eq]': documentId })).data?.[0]?.featured_news
      news = featured?.length ? featured : news
    }
    if (slug.join('/').includes('solutions/surface-treatment')) {
      const featured = (await api.getSurfaceTreatment({ 'filters[documentId][$eq]': documentId })).data?.[0]?.featured_news
      news = featured?.length ? featured : news
    }
    // news = await getNews({})
  }

  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className={bg_variant}
    >

      <div className="px-5 mt-10 grid grid-cols-1 gap-5 xl:grid-cols-3 xl:px-0">
        {
          news.map((xs, idx) => (
            <Link href={`/${locale}/resources/news/${xs.documentId}`} key={xs.documentId} className="block text-left group border-b border-[#efefef] hover:border-accent">
              <div className="h-full pb-5 border-b border-transparent group-hover:border-accent">
                <Image width={413} height={232} src={getStrapiMedia(xs.image) ?? ""} alt="" className="w-full object-cover rounded-xl" />
                <p className="text-lg font-semibold mt-4 mb-2 leading-none group-hover:text-accent">{xs.title}</p>
                <span className="text-secondary leading-none">{dayjs(xs.date as string).format('YYYY-MM-DD')}</span>
                <p className="shrink-0 leading-none line-clamp-2 flex-1 mt-2">{xs.desc}</p>
              </div>
            </Link>
          ))
        }
      </div>
    </Section>
  )
}
