'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Section } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import { collectExtend, mergeExtension } from "@/utils";
import { Material } from "cms-types";
import Link from "next/link";

export function FeaturedMaterial({ section, siteData, locale }: CmpProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  })

  const extension = mergeExtension(section)
  const bg_variant = extension?.bg_variant?.value === 'gray' ? 'bg-[#fafafa]' : 'bg-white'

  const displayText = siteData?.display_text?.material

  const renderItem = (key: string, value: string) => (

    <div key={key} className="flex flex-col border-b-[#efefef] border-b pb-4 mb-4 last:border-none">
      <span className="text-base capitalize">{key.split('_').join(' ')}</span>
      <span className="text-sm capitalize">{value}</span>
    </div>
  )

  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className={`xl:text-left ${bg_variant}`}

    >
      <div className="relative mt-10 pl-5 xl:pl-0">
        <div className="overflow-hidden pb-15 -mb-15" ref={emblaRef}>
          <div className="flex flex-row">
            {
              ((section.payload?.dynamic?.[0] as any)?.materials as Material[])?.map((xs, idx) => (
                <Link target="_blank" href={`/${locale}/resources/material/${xs.documentId}`} key={idx} className="shrink-0 w-[78.205128vw] bg-[#fafafa] rounded-lg overflow-hidden mr-5 xl:w-76.25 hover:drop-shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                  <Image className="object-cover w-full rounded-lg xl:h-40" width={305} height={160} src={getStrapiMedia(xs.icon) ?? ""} alt="" />
                  <div className="px-5 text-left">
                    <p className="my-5 text-lg font-semibold leading-none">{xs.name}</p>

                    {(['strength', 'processability', 'corrosion_resistance'] as const).map(key => renderItem(displayText?.[key] ?? key, xs[key]?.name!))}
                    {renderItem(displayText?.typical_applications ?? 'typical_applications', xs.typical_applications!)}
                    {xs.parameter?.map((item, idx) => renderItem(item.key!, item.value!))}
                  </div>
                </Link>
              ))
            }

          </div>

        </div>

        <div className="flex flex-row justify-center mt-10 xl:absolute xl:-top-13 xl:right-0 xl:mt-0">
          <button className="ml-3" onClick={() => emblaApi?.goToPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
          <button className="ml-3" onClick={() => emblaApi?.goToNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
        </div>
      </div>

    </Section>
  )

}


