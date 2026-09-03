"use client";

import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Assets } from "@/assets";
import { getStrapiMedia } from "@/utils/strapi";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function MoldProcessCarousel({ section }: CmpProps) {
  const payload = section.payload!
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ active: true, delay: 3000 })])
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const tabs = payload.data?.slice(0, 2) ?? []
  const activeTab = tabs[activeTabIndex]
  const cards = activeTab?.extension ?? []
  // Embla disables looping when too few slides can fill the viewport during a wrap.
  const carouselCards = cards.length > 0
    ? Array.from({ length: Math.ceil(8 / cards.length) }, () => cards).flat()
    : []

  useEffect(() => {
    if (!emblaRef || !emblaApi) return

    try {
      emblaApi.plugins()?.autoplay?.play?.()
    } catch (err) {
      console.error('autoplay error', err)
    }

  }, [emblaRef, emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.reInit()
    emblaApi.goTo(0, true)
    emblaApi.plugins()?.autoplay?.play?.()
  }, [activeTabIndex, emblaApi])

  return (
    <div className="mt-22.5 xl:mt-20 xl:mx-30 relative">
      <div className="flex flex-row items-center px-5 mb-5 xl:mb-15 xl:mx-0 xl:px-0">
        <div role="tablist" aria-label="Mold process categories" className="flex flex-row items-center gap-8 xl:gap-10">
          {tabs.map((tab, index) => {
            const isActive = index === activeTabIndex

            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTabIndex(index)}
                className={`border-solid border-b-[6px] font-medium transition-all duration-300 ease-out ${isActive
                  ? "border-b-accent text-2xl xl:text-5xl/20"
                  : "border-b-transparent text-base text-secondary xl:text-3xl"}`}
              >
                {tab.title}
              </button>
            )
          })}
        </div>
      </div>

      <div className="wrapper relative overflow-hidden w-full" ref={emblaRef}>
        <div className="flex w-full flex-row gap-5 pl-5 xl:-ml-5 xl:gap-0 xl:pl-0">
          {
            carouselCards.map((item, idx) => (
              <div className="basis-30/39 shrink-0 xl:basis-[calc((100%_+_1.25rem)_/_4)] xl:pl-5" key={idx}>
                <Image alt={item.key ?? ""} src={getStrapiMedia(item.image) ?? ""} width={405} height={280} className="w-full rounded-lg aspect-405/280 object-cover" />
                <p className="mt-5 font-semibold text-sm">{item.key}</p>
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
