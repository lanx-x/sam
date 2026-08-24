'use client';

import { Assets } from "@/assets";
import { getStrapiMedia } from "@/utils/strapi";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Image from "next/image";
import { Industry } from "cms-types";
import { mergeExtension } from "@/utils";
import { buildDynamicDetailPath } from "@/utils/dynamic-routes";
import Link from "next/link";

export function FeaturedIndustry({ section, locale }: CmpProps) {
  const extension = mergeExtension(section)
  const bg_variant = extension?.bg_variant?.value === 'gray' ? 'bg-[#fafafa]' : 'bg-white'

  return (
    <div className={`px-5 py-10 text-center xl:text-left xl:py-20 xl:px-0 xl:w-7xl xl:mx-auto ${bg_variant}`}>
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-2 xl:gap-8">
        <h2 className="section-title mb-0">{section.payload?.title}</h2>
        <div className="">
          <div className="hidden h-1 w-16 bg-accent my-3 xl:block"></div>
          <p className="section-desc">{section.payload?.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 text-left gap-2 mt-10 xl:grid-cols-4 xl:gap-5">
        {
          ((section.payload?.dynamic?.[0] as any)?.industries as Industry[])?.map((xs, idx) => (
            <Link target="_blank" href={buildDynamicDetailPath(locale, "industry", xs)} className="relative" key={idx}>
              <div className="overflow-hidden">
                <Image width={305} height={300} src={getStrapiMedia(xs.image) ?? ""} className="object-cover w-full  transition-transform duration-300 hover:scale-105" alt="" />
              </div>
              <div className="bg-[rgba(0,0,0,0.7)] absolute w-full bottom-0 z-10 px-3 py-2">
                <p className="text-white font-semibold xl:text-2xl">{xs.name}</p>
              </div>

            </Link>
          ))
        }


      </div>

    </div>
  )
}
