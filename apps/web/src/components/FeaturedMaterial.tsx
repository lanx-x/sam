'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Section } from "./Section";
import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import { collectExtend } from "@/utils";
import { Material } from "cms-types";

export function FeaturedMaterial({ section }: CmpProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  })

  const extension = collectExtend(section.payload?.extension as any, section.extension as any)

  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className={`xl:text-left ${extension['style']?.value}`}

    >
      <div className="relative mt-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex flex-row">
            {
              ((section.payload?.dynamic?.[0] as any)?.materials as Material[])?.map((xs, idx) => (
                <div key={idx} className="shrink-0 w-305/390 bg-[#fafafa] rounded-lg overflow-hidden ml-5 xl:first:ml-0  xl:w-76.25">
                  <Image className="object-cover w-full rounded-lg xl:h-40" width={305} height={160} src={getStrapiMedia(xs.icon) ?? ""} alt="" />
                  <div className="px-5 text-left">
                    <p className="my-5 text-lg font-semibold leading-none">{xs.name}</p>

                    {
                      xs.parameter?.map((item, idx) => (
                        <div key={idx} className="flex flex-col border-b-[#efefef] border-b pb-4 mb-4 last:border-none">
                          <span className="text-base">{item.key}</span>
                          <span className="text-sm">{item.value}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
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

