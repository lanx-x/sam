'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import { getStrapiMedia } from "@/utils/strapi";
import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function WorkShop({ section }: CmpProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  })

  return (
    <div className="pt-5 pb-15">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row">
          {
            section.data?.map((xs, idx) => (
              <div key={idx} className="ml-5 shrink-0 w-20/39 xl:w-100">
                <Image width={400} height={240} src={getStrapiMedia(xs.image) ?? ""} alt="" className="rounded-lg mb-5" />
                <div>
                  <p className="text-base font-semibold mb-2 leading-none xl:text-lg">{xs.title}</p>
                  <p className="leading-none text-sm">{xs.desc}</p>
                </div>

              </div>
            ))
          }

        </div >
        <div className="flex flex-row justify-center mt-10">
          <button className="mx-3" onClick={() => emblaApi?.goToPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
          <button className="mx-3" onClick={() => emblaApi?.goToNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
        </div>
      </div>
    </div >
  )

}


