'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Spe() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8]
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  })

  const specs = [
    {
      label: 'Processability',
      value: 'Excellence',
    },
    {
      label: 'Processability',
      value: 'Excellence',
    },
    {
      label: 'Processability',
      value: 'Excellence',
    },
    {
      label: 'Processability',
      value: 'Excellence',
    },
    {
      label: 'Processability',
      value: 'Excellence',
    },
    {
      label: 'Processability',
      value: 'Excellence',
    },
    {
      label: 'Processability',
      value: 'Excellence',
    },
    {
      label: 'Processability',
      value: 'Excellence',
    },
  ]


  return (
    <div className="relative py-10 text-center xl:py-20 xl:w-7xl xl:mx-auto">
      <h2 className="px-5 section-title xl:text-left">Elit nisi itaque suscipit corrupti!</h2>
      <p className="px-5 section-desc  xl:text-left">Lorem adipisci reprehenderit debitis eveniet dolorem perferendis esse? Obcaecati amet</p>

      <div className="mt-10 overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row">
          {
            data.map((xs, idx) => (
              <div key={idx} className="shrink-0 w-305/390 bg-[#fafafa] rounded-lg overflow-hidden ml-5 xl:w-76.25">
                <Image className="object-cover rounded-lg xl:h-40" src={Assets.Cap} alt="" />
                <div className="px-5 text-left">
                  <p className="my-5 text-lg font-semibold leading-none">Ipsum placeat officiis consequatur rem.</p>

                  {
                    specs.map((xs, idx) => (
                      <div key={idx} className="flex flex-col border-b-[#efefef] border-b pb-4 mb-4 last:border-none">
                        <span className="text-base">{xs.label}</span>
                        <span className="text-sm">{xs.value}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }

        </div>
      </div>


      <div className="flex flex-row justify-center mt-10 xl:absolute xl:top-20 xl:right-0">
        <button className="mx-3" onClick={() => emblaApi?.goToPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
        <button className="mx-3" onClick={() => emblaApi?.goToNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
      </div>
    </div>
  )

}

