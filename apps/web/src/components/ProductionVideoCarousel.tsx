"use client";

import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Assets } from "@/assets";
import { getStrapiMedia } from "@/utils/strapi";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ProductionVideoCarousel({ section }: CmpProps) {
  const payload = section.payload!
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' }, [Autoplay({ active: true, delay: 3000 })])
  const data = payload.data ?? []
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const activeItem = activeIdx !== null ? data[activeIdx] : undefined

  useEffect(() => {
    if (!emblaRef || !emblaApi) return

    //emblaApi.plugins()?.autoplay?.play?.()

  }, [emblaRef, emblaApi])

  return (
    <div className="mt-22.5 xl:mt-20 xl:mx-30 relative">
      <div className="flex flex-row items-center px-5 mb-5 xl:mb-15 xl:mx-0 xl:px-0">
        <h2 className="text-2xl font-medium border-solid border-b-[6px] border-b-accent mr-8 xl:mr-10 xl:text-5xl/20">{payload.title}</h2>
      </div>

      <div className="wrapper overflow-hidden w-full" ref={emblaRef}>
        <div className="flex flex-row pl-5 gap-5 xl:pl-0 w-full">
          {
            data.map((xs, idx) => (
              <div className="basis-30/39 shrink-0 xl:basis-[calc((100%-3.75rem)/4)]" key={idx}>
                <button
                  onClick={() => setActiveIdx(idx)}
                  className="group relative block w-full aspect-300/208 xl:aspect-405/280 rounded-lg overflow-hidden bg-[#f5f5f5]"
                >
                  {/* #t=0.1 lets browsers render the first frame as the cover with preload="metadata" */}
                  <video
                    src={`${getStrapiMedia(xs.image) as string}#t=0.1`}
                    muted
                    playsInline
                    preload="metadata"
                    className="pointer-events-none absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image src={Assets.IconPlay} alt="icon-play" width={48} height={48} className="w-12 h-12" />
                  </div>
                </button>
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

      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setActiveIdx(null)}
        >
          <div
            className="relative w-full max-w-7xl mx-5 bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <video
              className="w-full aspect-video"
              controls
              autoPlay
              src={getStrapiMedia(activeItem.image) as string}
            />

            {activeItem.title && (
              <p className="text-white p-4 font-semibold">{activeItem.title}</p>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
