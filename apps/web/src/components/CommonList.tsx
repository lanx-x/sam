
import { Assets } from "@/assets";
import { SurfaceTreatment } from "cms-types";
import Image from "next/image";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { buildDynamicDetailPath } from "@/utils/dynamic-routes";
import { collectExtend, mergeExtension } from "@/utils";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Link from "next/link";

export function CommonList({ section }: CmpProps) {
  const payload = section.payload!
  const extention = mergeExtension(section)

  const variant = extention?.variant?.value ?? 't0'
  return (
    <div className={`${variant === 't0' ? 'bg-white' : 'bg-[#fafafa]'}`}>
      < div className="pt-20 pb-15 px-5 xl:pt-25 xl:px-0 xl:w-7xl xl:mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10 xl:text-5xl xl:mb-15">{payload.title}</h2>

        <div className="w-full gap-10 flex flex-col xl:flex-row xl:gap-5">
          {
            payload.data?.map(xs => (
              <div key={xs.id} className="w-full xl:w-auto xl:basis-4 flex-1">
                <div className="aspect-3/2 relative overflow-hidden">
                  <Image alt="img" src={getStrapiMedia(xs.image) ?? ""} fill className="object-cover hover:scale-130 transition-transform duration-300" />
                </div>
                <p className="mt-10 mb-3 text-xl font-bold">{xs.title}</p>
                <p className="text-base">{xs.desc}</p>
              </div>
            ))
          }

        </div>
      </div>
    </div >
  )
}
