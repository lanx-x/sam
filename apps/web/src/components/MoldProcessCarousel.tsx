"use client";

import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Assets } from "@/assets";
import { getStrapiMedia } from "@/utils/strapi";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect } from "react";

export function MoldProcessCarousel({ section }: CmpProps) {
  const payload = section.payload!
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" }, [Autoplay({ active: true, delay: 3000 })])

  useEffect(() => {
    if (!emblaRef || !emblaApi) return

    try {

      emblaApi.plugins()?.autoplay?.play?.()
    } catch (err) {
      console.error('autoplay error', err)
    }

  }, [emblaRef, emblaApi])

  return (
    <div className="mt-22.5 xl:mt-20 xl:mx-30 relative">
      <div className="flex flex-row items-center px-5 mb-5 xl:mb-15 xl:mx-0 xl:px-0">
        <h2 className="text-2xl font-medium border-solid border-b-[6px] border-b-accent mr-8 xl:mr-10 xl:text-5xl/20">{payload.title}</h2>
        <p className="text-base text-secondary font-medium xl:text-3xl">{payload.desc}</p>
      </div>

      <div className="wrapper relative overflow-hidden w-full" ref={emblaRef}>
        <div className="flex w-full flex-row gap-5 pl-5 xl:pl-0">
          {
            payload.data?.map((xs, idx) => (
              <div className="basis-30/39 shrink-0 xl:basis-[calc((100%-3.75rem)/4)]" key={idx}>
                <Image alt="img" src={getStrapiMedia(xs.image) ?? ""} width={405} height={280} className="h-auto w-full rounded-lg" />
                <p className="mt-5 font-semibold text-sm">{xs.title}</p>
              </div>
            ))
          }
        </div>
      </div>


      <div className="absolute right-0 top-0 gap-3 flex-row hidden xl:flex">
        <button className="w-12 h-12 relative" onClick={() => emblaApi?.goToPrev()}>
          <Image alt="icon-left" src={Assets.BlackArrowL} fill className="object-cover" />
        </button>
        <button className="w-12 h-12 relative" onClick={() => emblaApi?.goToNext()}>
          <Image alt="icon-right" src={Assets.BlackArrowR} fill className="object-cover" />
        </button>
      </div>

    </div>
  )
}
