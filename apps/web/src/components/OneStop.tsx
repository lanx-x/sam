"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { Assets } from "@/assets";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Section } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";

export function OneStop({ section }: CmpProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
  }, [Fade()]);

  const [selectedIndex, setSelectedIndex] = useState(0);


  useEffect(() => {
    if (!emblaApi) return;

    const updateSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedSnap());
    };

    updateSelectedIndex();
    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reinit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reinit", updateSelectedIndex);
    };
  }, [emblaApi]);

  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className="bg-[#fafafa]"
    >
      <div className="flex-row items-center justify-center hidden xl:flex xl:visible xl:mt-16.25">
        {
          section.payload?.data?.map((xs, idx) => (
            <div key={xs.id} className="cursor-pointer flex flex-col items-center" onClick={() => emblaApi?.goTo(idx)}>
              <div className={cn("text-base font-medium w-9 h-9 rounded-full flex flex-row items-center justify-center transition-all duration-300", selectedIndex === idx ? 'bg-accent text-white' : 'text-accent')}>0{idx + 1}</div>
              <p className="mt-2 mb-3 text-base font-medium">{xs.label}</p>
              <Image src={selectedIndex === idx ? Assets.RulerOn : Assets.RulerOff} alt="ruler" />
            </div>
          ))
        }

      </div>

      <div className="mt-10 overflow-hidden xl:mt-12 xl:w-7xl xl:mx-auto" ref={emblaRef}>
        <div className="flex flex-row">
          {
            section.payload?.data?.map((xs, idx) => (
              <div
                key={xs.id}
                className="flex flex-col shrink-0 w-80 border border-[#bfbfbf] bg-[#fafafa] rounded-xl py-5 px-4 ml-5 text-left xl:ml-0 xl:px-0 xl:w-full xl:border-0 xl:flex-row-reverse">
                <Image width={480} height={300} src={getStrapiMedia(xs.image) ?? ""} className="shrink-0 object-cover w-72 h-45 xl:w-120 xl:h-75" alt="cap" />
                <div className="shrink-0 invisible xl:visible xl:w-px xl:h-full xl:bg-[#efefef] xl:mx-15"></div>
                <div>
                  <p className="text-2xl font-semibold mt-5 mb-3 xl:text-[32px] xl:mb-4">{xs.title}</p>
                  <p className="text-sm text-[rgba(34,34,34,0.66)]">{xs.desc}</p>


                  <div className="mt-5 grid grid-cols-1 xl:mt-6 xl:grid-cols-2">
                    {
                      xs.extension?.map((item, idx) => (
                        <div key={item.id} className="flex flex-row items-center shrink-0 mb-2 xl:mr-15 xl:mb-3">
                          <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                            <Image src={Assets.Check} className="w-2 " alt="check" />
                          </div>
                          <span className="font-semibold text-sm">{item.value}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="mt-4 flex flex-row justify-center xl:justify-start xl:w-7xl xl:mx-auto">
        <button type="button" onClick={() => emblaApi?.goToPrev()}><Image className="w-12 h-12 mr-3" src={Assets.GrayArrowL} alt="left" /></button>
        <button type="button" onClick={() => emblaApi?.goToNext()}><Image className="w-12 h-12 " src={Assets.GrayArrowR} alt="right" /></button>
      </div>

    </Section>
  )
}
