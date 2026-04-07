import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import { mergeExtension } from "@/utils";

export function WhatWeDo({ section }: CmpProps) {
  const extension = mergeExtension(section)
  return (
    <div className="py-10 xl:py-20">
      <SectionContainer className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-23.5 px-5 xl:px-0">
        <div>
          <div className="flex flex-row items-center">
            <div className="w-9 border-b-2 border-accent mr-2 mb-0.5"></div>
            <p className="text-accent text-lg font-semibold leading-none">{extension.label.value}</p>
          </div>
          <p className="mt-4 text-2xl/8 xl:text-[32px]/10 font-semibold">{section.payload?.title}</p>

          <div className="relative mt-10 w-full xl:w-145 aspect-145/100">
            <Image src={getStrapiMedia(section.payload?.image) ?? ""} alt="" fill className="object-cover" />
          </div>
        </div>



        <div>
          {
            section.payload?.data?.map(xs => (
              <div key={xs.id} className="grid grid-cols-2 border-t border-[#efefef] h-32.5 pt-9 items-start">
                <p className="text-5xl font-semibold">{xs.desc}</p>
                <p className="text-secondary text-base font-medium">{xs.title}</p>

              </div>
            ))

          }

        </div>
      </SectionContainer>
    </div>
  )

}
