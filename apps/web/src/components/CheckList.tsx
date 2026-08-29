
import { Assets } from "@/assets";
import { SurfaceTreatment } from "cms-types";
import Image from "next/image";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { buildDynamicDetailPath } from "@/utils/dynamic-routes";
import { collectExtend, mergeExtension } from "@/utils";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Link from "next/link";

export function CheckList({ section }: CmpProps) {
  const payload = section.payload!

  const extension = mergeExtension(section)

  const variant = extension.variant?.value ?? 't0'

  return (
    <div className={`${variant === 't0' ? 'bg-white pb-10' : 'bg-[#fafafa] py-25'}`}>
      <div className="px-5 xl:w-7xl xl:px-0 xl:mx-auto">
        <h2 className="text-2xl font-semibold xl:text-3xl">{payload.title}</h2>
        <p className="my-5 text-base">{payload.desc}</p>

        <div className="grid grid-cols-1 mt-10 xl:grid-cols-3 xl:gap-x-5">
          {
            payload.data?.map(xs => (
              <div key={xs.id} className="py-3 flex flex-row items-center border-b border-b-[#efefef] border-solid">
                <Image alt="icon-check" src={Assets.IconCheck} width={24} height={24} />
                <p className="text-xl font-bold ml-5">{xs.title}</p>
              </div>
            ))
          }
        </div>

        <p className="mt-15">{extension['footer']?.value}</p>
      </div>
    </div>
  )
}
