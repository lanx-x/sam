import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import { mergeExtension } from "@/utils";
import { FormGetQuote } from "./FormGetQuote";

export function Intro({ section }: CmpProps) {
  const extension = mergeExtension(section)
  return (
    <div className="bg-[#fafafa] py-10 xl:py-20" id="profile">
      <SectionContainer className="px-5 xl:px-0 grid gap-10 xl:gap-20 grid-cols-1 xl:grid-cols-2">
        <div className="w-full aspect-35/40 xl:w-140 xl:aspect-14/16 relative">
          <Image src={getStrapiMedia(section.payload?.image) ?? ""} alt="" fill className="object-cover" />
        </div>

        <div>
          <div className="flex flex-row items-end">
            <div className="w-8 border-b-2 border-accent mb-2 mr-2"></div>
            <span className="text-lg font-semibold leading-5 text-accent">{extension.label.value}</span>
          </div>
          <h2 className="mt-3 mb-5 text-2xl xl:text-[32px] font-semibold leading-none">{section.payload?.title}</h2>
          <p className="xl:text-base xl:leading-6 leading-5.5 text-sm">{section.payload?.desc}</p>
        </div>
      </SectionContainer>
    </div>
  )

}
