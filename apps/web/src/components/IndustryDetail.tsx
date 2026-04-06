import { CommonSection } from "cms-types";
import Image from "next/image";
import { getIndustry } from "@/api";
import { getStrapiMedia } from "@/utils/strapi";
import { BlocksContent } from "./BlocksContent";
import { Section, SectionContainer } from "./Section";
import { CmpProps } from "@/app/[lang]/[[...slug]]/page";

export async function IndustryDetail({ documentId, section, site }: CmpProps) {
  const data = (await getIndustry({ 'filters[documentId][$eq]': documentId })).data?.[0]

  console.log("### actions", section.payload?.actions);


  return (
    <div>
      <div className="relative xl:py-15">
        {data.detailPageBanner && (
          <Image fill className="object-cover" src={getStrapiMedia(data.detailPageBanner) ?? ""} alt="banner" />
        )}
        <SectionContainer className="relative z-10 text-white">
          <p className="text-4xl xl:text-[64px] font-black mb-3 leading-none xl:w-100">{data.detailPageTitle || data.name}</p>
          <p className="text-base leading-5 xl:w-160">{data.detailPageDesc || data.desc}</p>
          <div className="mt-14">
            {
              section.payload?.actions?.map((xs, idx) => (
                <button
                  key={idx}
                  className="h-13 flex items-center xl:w-50 xl:px-8 first:bg-accent first:text-white text-base font-medium">{xs.label}</button>
              ))
            }
          </div>
        </SectionContainer>

      </div>

      {data.detailPageFeatures?.length ? (
        <div className="py-20">
          <Section className="" title="" desc="">
            <div className="grid grid-cols-2 gap-5 xl:grid-cols-3">
              {data.detailPageFeatures.map((xs, idx) => (
                <div key={idx} className="rounded-lg bg-[#fafafa] p-6">
                  {xs.image && (
                    <div className="w-10 h-10 relative mb-4">
                      <Image fill src={getStrapiMedia(xs.image) ?? ""} alt="" className="object-cover" />
                    </div>
                  )}
                  <p className="text-lg font-semibold leading-none mb-2">{xs.key}</p>
                  <p className="text-sm leading-5">{xs.desc || xs.value}</p>
                </div>
              ))}
            </div>
          </Section>
          <SectionContainer>
          </SectionContainer>
        </div>
      ) : null}

      {data.detailPageContent && (
        <div className="px-5 xl:px-0 xl:w-7xl xl:mx-auto mt-15 prose max-w-none">
          <BlocksContent content={data.detailPageContent} />
        </div>
      )}
    </div>
  )
}
