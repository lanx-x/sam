import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { createLocalizedApi } from "@/api";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { BlocksContent } from "./BlocksContent";
import dayjs from "dayjs";
import { mergeDisplayText } from "@/utils";

export async function CaseStudyDetail({ documentId, section, locale, slug, siteData }: CmpProps) {
  const api = createLocalizedApi(locale)
  const data = (await api.getCaseStudyDetail({ 'filters[documentId][$eq]': documentId })).data?.[0]
  const basePath = ['', locale, ...slug].join('/')

  const displayText = siteData?.display_text


  if (!data) {
    return <div className="py-30 text-3xl font-semibold text-center">Case study: {documentId} not found.</div>
  }

  const others = (await api.getCaseStudy({
    'filters[documentId][$ne]': documentId,
    'pagination[pageSize]': 3,
  })).data

  const industryParameter = {
    key: displayText?.industry ?? 'industry',
    value: data?.industry?.name
  }

  return (
    <div className="">
      <div className="bg-[linear-gradient(180deg,#EFF2F6_0%,#FFFFFF_50%,#EFF2F6_100%)]">
        <div className="flex flex-col py-15 px-5 xl:px-0 xl:flex-row xl:w-7xl xl:mx-auto xl:py-20">
          <div className="xl:mr-40">
            {data.industry?.name && <span className="inline-block text-sm bg-[#e5f2ff] border border-accent px-2 py-1 rounded-sm font-semibold mb-5">{data.industry?.name}</span>}
            <p className="leading-none text-4xl xl:text-[64px] font-semibold mb-5">{data.title}</p>
            <p className="text-sm xl:text-base leading-5">{data.desc}</p>
            <p className="mt-10 xl:mt-20 text-sm text-secondary">{dayjs(data.date).format('YYYY-MM-DD')}</p>
          </div>

          <Image className="mt-10 xl:mt-0 w-full xl:w-160 aspect-64/52 object-cover" width={640} height={520} src={getStrapiMedia(data.image) ?? ""} alt="" />
        </div>
      </div>

      <div className="px-5 xl:px-0 xl:w-7xl xl:mx-auto py-10 xl:py-20">
        <div className="">
          <p className="text-[32px] font-semibold xl:text-5xl">{displayText?.case_study?.key_parameters ?? "Key parameters"}</p>
          <div className="mt-10 xl:hidden">
            {
              ([industryParameter, ...data.parameter ?? []])?.map((xs, idx) => (
                <div key={idx} className="border-b border-[#bfbfbf] h-20 grid grid-cols-2 items-center px-2 text-base">
                  <span className="text-lg text-secondary font-bold capitalize">{xs.key}:</span>
                  <div>
                    <span className={`text-base ${xs.key === 'industry' ? 'px-3.25 py-2 bg-[#e5f2ff] border-2 border-accent' : ''}`}>{xs.value}</span>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="hidden xl:block mt-10">
            <div className="grid grid-cols-5">
              {
                ([industryParameter, ...data.parameter ?? []]).slice(0, 5).map((xs, idx) => (
                  <div key={idx} className="border-b border-[#bfbfbf] h-20 grid grid-cols-2 items-center px-2 text-base">
                    <span className="text-lg text-secondary font-bold capitalize">{xs.key}</span>
                  </div>
                ))
              }
            </div>
            <div className="grid grid-cols-5">
              {
                ([industryParameter, ...data.parameter ?? []]).slice(0, 5).map((xs, idx) => (
                  <div key={idx} className="border-b border-[#bfbfbf] h-20 grid grid-cols-2 items-center px-2 text-base">
                    <div className={!xs.value ? 'hidden' : ''}>
                      <span className={`text-base ${xs.key === 'industry' ? 'px-3.25 py-2 bg-[#e5f2ff] border-2 border-accent' : ''}`}>{xs.value}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        {data.content && (
          <div className="mt-10 prose max-w-none">
            <BlocksContent content={data.content} />
          </div>
        )}

        {data.extra_images?.length && (
          <div className="mt-10 grid grid-cols-2 gap-5">
            {data.extra_images.map((img, idx) => (
              <div key={idx} className="relative rounded-lg overflow-hidden aspect-16/9">
                <Image fill src={getStrapiMedia(img) ?? ""} alt="" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {others.length > 0 && (
        <div className="mt-20 bg-[#fafafa] py-15 px-5 xl:px-0">
          <SectionContainer>
            <p className="text-center text-3xl font-semibold mb-10">More Success Stories</p>
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
              {others.map((xs) => (
                <Link target="_blank" key={xs.documentId} href={`/${locale}/resources/case-study/${xs.documentId}`} className="group rounded-lg overflow-hidden">
                  <div className="relative aspect-413/336 overflow-hidden rounded-lg">
                    <Image
                      fill
                      src={getStrapiMedia(xs.image) ?? ""}
                      alt=""
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-left mt-5">
                    {xs.industry?.name && <span className="inline-block text-xs text-accent border border-accent px-2 py-0.5 rounded-sm font-medium mb-2">{xs.industry?.name}</span>}
                    <p className="text-lg font-semibold leading-tight mb-2">{xs.title}</p>
                    <p className="text-sm text-secondary leading-5 line-clamp-2">{xs.desc}</p>
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
