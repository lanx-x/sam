'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function WorkShop() {
  const data = [1, 2, 3, 4, 5, 6]
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  })

  return (
    <div className="pt-5 pb-15">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row">
          {
            data.map((xs, idx) => (
              <div key={idx} className="ml-5 shrink-0 w-20/39 xl:w-100">
                <Image src={Assets.Cap} alt="" className="rounded-lg mb-5" />
                <div>
                  <p className="text-base font-semibold mb-2 leading-none xl:text-lg">Lorem ex hic sapiente adipisci.</p>
                  <p className="leading-none text-sm">Lorem minus assumenda harum natus praesentium beatae quos Molestias necessitatibus aspernatur laborum earum non eum. Odit hic consectetur nemo ex debitis Quasi iste dignissimos reiciendis beatae ipsam. Necessitatibus perspiciatis praesentium</p>
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


