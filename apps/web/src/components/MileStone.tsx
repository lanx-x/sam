import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { Section, SectionContainer, SectionHeaderRowDir } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import { mergeExtension } from "@/utils";
import { Assets } from "@/assets";

export function MileStone({ section }: CmpProps) {
  const extension = mergeExtension(section)
  return (
    <div className="py-10 xl:py-20">
      <SectionContainer className="px-5 xl:px-0">
        <SectionHeaderRowDir title={section.payload?.title!} desc={section.payload?.desc!} />

      </SectionContainer>
      <div className="flex flex-col xl:flex-row mt-25 xl:w-7xl xl:mx-auto px-5 xl:px-0">
        {
          section.payload?.data?.map(xs => (
            <div key={xs.id} className="relative ">
              <p className="mb-7 text-[32px]">{xs.title}</p>
              <div className="relative w-64 h-2">
                <Image src={Assets.RulerOn} fill alt="" className="object-cover" />
              </div>
              <p className="mt-13 w-50 text-base leading-6">{xs.desc}</p>
              <div className="absolute -left-2 top-17 w-8 h-8">
                <Image src={Assets.Milestone} fill alt="" className="object-cover" />
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )

}
