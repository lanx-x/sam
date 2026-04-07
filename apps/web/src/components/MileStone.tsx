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
      <div className="flex flex-col xl:flex-row mt-10 xl:mt-25 xl:w-7xl xl:mx-auto px-5 xl:px-0">
        {
          section.payload?.data?.map(xs => (
            <div key={xs.id} className="relative pl-11 xl:pl-0 h-60 xl:h-auto">
              <p className="mb-7 text-[32px]">{xs.title}</p>
              <div className="absolute left-3 xl:left-0 top-2 xl:top-0 xl:relative w-64 h-2 origin-left rotate-90 xl:rotate-0">
                <Image src={Assets.RulerOn} alt="" className="object-fill" />
              </div>
              <p className="xl:mt-13 mt-3.5 xl:w-50 text-base leading-6">{xs.desc}</p>
              <div className="absolute left-0 top-1.5 xl:-left-2 xl:top-17 w-6 xl:w-8 aspect-square">
                <Image src={Assets.Milestone} fill alt="" className="object-cover" />
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )

}
