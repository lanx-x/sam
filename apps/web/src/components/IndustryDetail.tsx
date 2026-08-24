import { CommonSection } from "cms-types";
import Image from "next/image";
import { createLocalizedApi } from "@/api";
import { getStrapiMedia } from "@/utils/strapi";
import { BetterBlocksContent } from "./BetterBlocksContent";
import { Section, SectionContainer } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { mergeExtension } from "@/utils";
import { ActionButton } from "./ActionButton";

export async function IndustryDetail({ documentId, section, locale }: CmpProps) {
  const api = createLocalizedApi(locale);
  const data = (await api.getIndustryDetail({ 'filters[documentId][$eq]': documentId })).data?.[0]

  const extension = mergeExtension(section)

  if (!data) {
    return <div className="py-30 text-3xl font-semibold text-center">Industry: {documentId} not found.</div>
  }

  return (
    <div>
      <div className="relative py-10 px-5 xl:px-0 xl:py-15">
        {data.detailPageBanner && (
          <Image fill className="object-cover" src={getStrapiMedia(data.detailPageBanner) ?? ""} alt="banner" />
        )}
        <SectionContainer className="relative z-10 text-white">
          <h1 className="text-4xl xl:text-[64px] font-black mb-3 leading-none w-1/2 xl:w-100">{data.detailPageTitle || data.name}</h1>
          <p className="text-base leading-5 xl:w-160">{data.detailPageDesc || data.desc}</p>
          <div className="mt-14 flex flex-col gap-5 xl:flex-row">
            {
              section.payload?.actions?.map((xs, idx) => (
                <ActionButton key={idx} action={xs} className="h-13 xl:w-50 xl:px-8 first:bg-accent first:text-white text-base font-medium" />
              ))
            }
          </div>
        </SectionContainer>
      </div>

      {data.detailPageFeatures?.length ? (
        <div className="">
          <Section className="" title={extension.characteristics_title.value} desc={extension.characteristics_desc.value}>
            <div className="mt-10 xl:mt-15 grid grid-cols-1 px-5 xl:px-0 gap-5 xl:grid-cols-3">
              {data.detailPageFeatures.map((xs, idx) => (
                <div key={idx} className="bg-[#fafafa] px-10 py-16 flex flex-col items-center">
                  {xs.image && (
                    <div className="w-16 h-16 relative mb-15">
                      <Image fill src={getStrapiMedia(xs.image) ?? ""} alt="" className="object-cover" />
                    </div>
                  )}
                  <p className="text-lg font-semibold leading-none mb-3">{xs.key}</p>
                  <p className="text-base leading-5">{xs.desc || xs.value}</p>
                </div>
              ))}
            </div>
          </Section>
          <SectionContainer>
          </SectionContainer>
        </div>
      ) : null}

      {data.detailPageContent && (
        <div className="px-5 xl:px-0 xl:w-7xl xl:mx-auto mb-10 prose max-w-none">
          <BetterBlocksContent content={data.detailPageContent} />
        </div>
      )}
    </div>
  )
}
