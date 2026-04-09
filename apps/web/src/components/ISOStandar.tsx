import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import { mergeExtension } from "@/utils";

export function ISOStandard({ section }: CmpProps) {
  const extension = mergeExtension(section)
  return (
    <div className="bg-[#fafafa] py-10 xl:py-20">
      <SectionContainer className="px-5 xl:px-0">
        <div className="flex flex-row items-center">
          <p className="xl:text-5xl text-[32px]/8 font-semibold flex-1 xl:pr-88">{section.payload?.title}</p>
          <Image width={100} height={100} className="w-20 xl:w-25 aspect-square" src={getStrapiMedia(section.payload?.image) ?? ""} alt="" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-30 mt-35">
          {
            section.payload?.data?.map(xs => (
              <div key={xs.id} className="text-center flex flex-col items-center justify-center relative bg-white rounded-xl w-full xl:w-100 h-70">
                <Image className="absolute object-cover -top-20" src={getStrapiMedia(xs.image) ?? ""} alt="" width={160} height={160} />
                <p className="text-[32px] font-extrabold mt-10">{xs.title}</p>
                <p className="text-base mt-6">{xs.desc}</p>
              </div>
            ))
          }
        </div>
      </SectionContainer>
    </div>
  )

}
