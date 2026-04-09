import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import { mergeExtension } from "@/utils";

export function Mission({ section }: CmpProps) {
  const extension = mergeExtension(section)
  return (
    <div className="py-10 xl:py-20">

      <SectionContainer className="px-5 xl:px-0">
        <div className="relative w-full px-5 xl:px-0 aspect-35/64 xl:aspect-128/48 rounded-xl overflow-hidden">
          <Image
            src={getStrapiMedia(section.payload?.image) ?? ""}
            alt=""
            fill
            className="object-cover" />
          <div className="relative z-10 py-25 xl:py-15 xl:pl-20 text-white xl:w-160">
            <p className="text-lg">{extension.label?.value}</p>
            <p className="my-5 xl:text-5xl text-[32px]/8">{section.payload?.title}</p>
            <p className="text-base leading-5">{section.payload?.desc}</p>
          </div>
        </div>
      </SectionContainer>
    </div>
  )

}
