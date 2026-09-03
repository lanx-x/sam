"use client";

import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Assets } from "@/assets";
import { getStrapiMedia } from "@/utils/strapi";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect } from "react";

export function CaseCarousel({ section }: CmpProps) {
  const payload = section.payload!
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" }, [Autoplay({ active: true, delay: 3000 })])

  useEffect(() => {
    if (!emblaRef || !emblaApi) return

    // FIXME 数据太少的时候报错?
    try {
      emblaApi.plugins()?.autoplay?.play?.()
    } catch (err) { }

  }, [emblaRef, emblaApi])

  return (
    <div className="my-15 xl:my-20 xl:mx-auto xl:w-7xl relative">
      <div className="flex flex-row items-center px-5 mb-8 xl:px-0">
        <h2 className="text-2xl font-semibold xl:text-5xl/20 after:block after:w-20 after:h-1.5 after:bg-accent after:mt-2">{payload.title}</h2>
        <div className="gap-3 flex-row hidden xl:flex ml-auto">
          <button className="w-12 h-12 relative" onClick={() => emblaApi?.goToPrev()}>
            <Image alt="icon-left" src={Assets.BlackArrowL} fill className="object-cover" />
          </button>
          <button className="w-12 h-12 relative" onClick={() => emblaApi?.goToNext()}>
            <Image alt="icon-right" src={Assets.BlackArrowR} fill className="object-cover" />
          </button>
        </div>
      </div>

      <div className="wrapper relative overflow-hidden w-full" ref={emblaRef}>
        <div className="flex w-full flex-row gap-5 pl-5 xl:pl-0">
          {
            payload.data?.map((xs, idx) => (
              <div className="basis-30/39 shrink-0 xl:basis-[calc((100%-3.75rem)/4)] relative aspect-square overflow-hidden" key={idx}>
                <Image alt="img" src={getStrapiMedia(xs.image) ?? ""} fill className=" aspect-square object-cover hover:scale-130 transition-transform duration-300" />
                <div className="absolute left-0 bottom-0 w-full h-13 px-5 flex items-center bg-[rgba(0,0,0,0.7)]">
                  <p className="text-white font-semibold text-2xl">{xs.title}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>



    </div>
  )
}
