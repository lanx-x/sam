'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Section } from "./Section";
import { CommonSection } from "cms-types";
import { getStrapiMedia } from "@/utils/strapi";

export function Comment({ section }: { section: CommonSection }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    breakpoints: {
      "(min-width: 1280px)": {
        align: "center",
        containScroll: false,
        loop: false,
      },
    },
  })

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const syncSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedSnap());
    };

    const onSelect = (_api: unknown, event: { detail: { targetSnap: number } }) => {
      setSelectedIndex(event.detail.targetSnap);
    };

    emblaApi.goTo(1)
    syncSelectedIndex();
    emblaApi.on("select", onSelect);
    emblaApi.on("reinit", syncSelectedIndex);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reinit", syncSelectedIndex);
    };
  }, [emblaApi]);

  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      bg={Assets.Map}
      className="pb-15 xl:pb-27.25"
    >
      <div className="mt-18.5 xl:mt-25">
        <div className="relative overflow-hidden z-10 py-10 xl:max-w-420 xl:mx-auto" ref={emblaRef}>
          <div className="flex flex-row">
            {
              section.payload?.data?.map((xs, idx) => (
                <div
                  className={`basis-full min-w-0 shrink-0 flex justify-center items-center xl:basis-1/3 xl:transition-all xl:duration-300 ${selectedIndex === idx ? "xl:scale-100" : "xl:scale-70"}`}
                  key={xs.id}
                >
                  <div className={`bg-white w-87.5 h-90 rounded-lg flex flex-col shrink-0 px-5 items-center shadow-[0_8px_24px_0_rgba(0,0,0,0.08)] xl:w-full xl:max-w-none`} key={idx}>
                    <Image width={80} height={80} src={getStrapiMedia(xs.image) ?? ""} alt="avatar" className="absolute w-20 h-20 -top-10 rounded-full" />
                    <span className="mt-15 text-[18px] font-semibold mb-2">{xs.title}</span>
                    <span className="text-secondary text-xs">{xs.label}</span>
                    <Image src={Assets.QuoteL} alt="quote" className="mr-auto xl:-mb-4" />
                    <p className="text-sm font-medium px-10 my-3">{xs.desc}</p>
                    <Image className="ml-auto" src={Assets.QuoteR} alt="quote" />
                    <div className={cn("hidden absolute inset-0 bg-[rgba(250,250,250,0.8)] transition-opacity duration-300 xl:flex", selectedIndex === idx ? 'opacity-0' : 'opacity-100')}></div>
                    <div className={cn("hidden absolute w-20 h-10 -top-10 rounded-tl-full rounded-tr-full bg-[rgba(250,250,250,0.8)] transition-opacity duration-300 xl:flex", selectedIndex === idx ? 'opacity-0' : 'opacity-100')}></div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className="hidden flex-row mx-auto justify-center xl:flex">
          {
            section.payload?.data?.map((xs, idx) => (
              <div key={xs.id} className="cursor-pointer" onClick={() => emblaApi?.goTo(idx)}>
                <p className={`'text-xs ${selectedIndex === idx ? 'text-[#666]' : 'text-[#bfbfbf]'}`}>0{idx + 1}</p>
                <div className={cn("h-1 w-12 border-b border-l border-[#efefef] last:border-r", selectedIndex === idx ? 'border-secondary' : '')}></div>
              </div>
            ))
          }

        </div>

        <div className="flex flex-row justify-center relative z-10 xl:w-168 xl:mx-auto xl:-top-60 xl:justify-between">
          <button type="button" onClick={() => emblaApi?.goToPrev()}><Image className="w-12 h-12 mr-3 xl:w-10 xl:h-10 xl:mr-0" src={Assets.BlackArrowL} alt="prev" /></button>
          <button type="button" onClick={() => emblaApi?.goToNext()}><Image className="w-12 h-12 xl:w-10 xl:h-10" src={Assets.BlackArrowR} alt="next" /></button>
        </div>
      </div>


    </Section>
  )
}

