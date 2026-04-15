'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Section } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import { mergeExtension } from "@/utils";

export function FeaturedComment({ section }: CmpProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const extension = mergeExtension(section)
  const bg_variant = extension?.bg_variant?.value === 'gray' ? 'bg-[#fafafa]' : 'bg-white'


  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
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

    // emblaApi.goTo(1)
    syncSelectedIndex();
    emblaApi.on("select", onSelect);
    emblaApi.on("reinit", syncSelectedIndex);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reinit", syncSelectedIndex);
    };
  }, [emblaApi]);

  const items = section.payload?.data ?? []
  const cardStyle = useCallback((current: number, idx: number) => {
    if (idx > current) {
      return current === 0 && idx === items.length - 1 ? 'xl:scale-82 origin-left' : `xl:scale-82 origin-right`
    }

    if (idx < current) {
      return current === items.length - 1 && idx === 0 ? 'xl:scale-82 origin-right' : `xl:scale-82 origin-left`
    }

    return `xl:scale-100 shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]`


  }, [items.length])

  return (
    <div className={`xl:min-h-185 pt-10 xl:pt-10 ${bg_variant} w-full relative`} >
      <div className="flex items-center justify-center absolute w-full top-51.75 xl:top-10">
        <Image src={Assets.Map} width={1280} height={673} alt="map" className="w-full xl:w-320" />
      </div>

      <div className="text-center xl:mt-10 mb-20 xl:mb-15 px-5 xl:px-0">
        <p className="section-title">{section.payload?.title}</p>
        <p className="section-desc">{section.payload?.desc}</p>
      </div>

      <div className="xl:max-w-435 mx-auto">
        <div className="relative z-10 py-10 overflow-hidden" ref={emblaRef}>
          <div className="flex flex-row">
            {
              section.payload?.data?.map((xs, idx) => (
                <div className={`shrink-0 w-full xl:w-145 px-5 xl:px-0`} key={`${xs.id}-${idx}`}>
                  <div className={`${cardStyle(selectedIndex, idx)} bg-white rounded-lg flex flex-col transition-all duration-500 shrink-0 px-5 xl:px-10 items-center`}>
                    <div className="absolute -top-10 rounded-full overflow-hidden z-10 bg-red-200">
                      <Image width={80} height={80} src={getStrapiMedia(xs.image) ?? ""} alt="avatar" className="w-20 h-20" />
                      {/* 头像蒙层 */}
                      <div className={cn("absolute w-20 h-20  top-0 left-0 bg-[rgba(250,250,250,0.8)] transition-opacity duration-500 hidden xl:block", selectedIndex === idx ? 'opacity-0' : 'opacity-100')}></div>
                    </div>
                    <span className="mt-15 text-lg font-semibold mb-2">{xs.title}</span>
                    <span className="text-secondary text-xs">{xs.label}</span>
                    <div className="relative pt-10 pb-14.25">
                      <p className="absolute left-0 top-2.5 text-accent text-[120px] leading-none text-left">“</p>
                      <p className="text-sm font-medium px-10 my-3 xl:my-0 xl:px-15 text-center">{xs.desc}</p>
                      <p className="absolute right-0 -bottom-10 text-accent text-[120px] leading-none text-right">”</p>
                    </div>
                    {/* 卡片蒙层 */}
                    <div className={cn("absolute inset-0 bg-[rgba(250,250,250,0.8)] transition-opacity duration-300 hidden xl:block", selectedIndex === idx ? 'opacity-0' : 'opacity-100')}></div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className="hidden flex-row mx-auto justify-center xl:flex relative z-10">
          {
            section.payload?.data?.map((xs, idx) => (
              <div key={xs.id} className="cursor-pointer text-center" onClick={() => emblaApi?.goTo(idx)}>
                <p className={`'text-xs ${selectedIndex === idx ? 'text-[#666]' : 'text-[#bfbfbf]'}`}>0{idx + 1}</p>
                <div className={cn("h-1 w-12 border-b border-l border-[#efefef] last:border-r", selectedIndex === idx ? 'border-secondary' : '')}></div>
              </div>
            ))
          }

        </div>

        <div className="flex flex-row justify-center relative z-10 pb-15 xl:pb-0 xl:w-168 xl:mx-auto xl:-top-60 xl:justify-between">
          <button type="button" onClick={() => emblaApi?.goToPrev()}><Image className="w-12 h-12 mr-3 xl:w-10 xl:h-10 xl:mr-0" src={Assets.BlackArrowL} alt="prev" /></button>
          <button type="button" onClick={() => emblaApi?.goToNext()}><Image className="w-12 h-12 xl:w-10 xl:h-10" src={Assets.BlackArrowR} alt="next" /></button>
        </div>
      </div>


    </div>
  )
}
