'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Section } from "./Section";
import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import { collectExtend } from "@/utils";

export function IndustrySolution({ section }: CmpProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({

    align: "start",
    containScroll: "trimSnaps",
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

    syncSelectedIndex();
    emblaApi.on("select", onSelect);
    emblaApi.on("reinit", syncSelectedIndex);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reinit", syncSelectedIndex);
    };
  }, [emblaApi]);

  const extension = collectExtend(section.payload?.extension as any, section.extension as any)

  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
    >
      <div className="py-10 overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row">
          {
            section.payload?.dynamic?.[0]?.industries?.map((xs, idx) => (
              <div className="w-full flex shrink-0 px-5 flex-col items-center justify-center xl:flex-row" key={xs.id}>

                <Image width={860} height={540} className="object-cover w-full shrink-0 aspect-35/22 rounded-xl xl:w-215 xl:aspect-86/54" src={getStrapiMedia(xs.image) ?? ""} alt="" />
                <div className="relative flex flex-col px-5 py-12 text-left shadow-[0_8px_24px_0_rgba(0,0,0,0.08)] mx-3 min-h-90 -mt-7 bg-white xl:mt-0 xl:-ml-35 xl:px-15">
                  <div className="hidden absolute w-18 h-2 bg-accent top-14 -left-9 xl:block">

                  </div>
                  <p className="font-semibold text-2xl leading-none mb-5">{xs.title}</p>
                  <p className="flex-1 text-sm leading-3.5 xl:text-base xl:leading-5">{xs.desc}</p>

                  <div className="flex flex-row text-accent text-base font-medium items-center">
                    <p className="mr-2">{section.label}</p>
                    <Image src={Assets.Link} alt="arrow" />
                  </div>
                </div>
              </div>

            ))
          }
        </div>
      </div>

      <div className="hidden xl:flex mx-auto justify-center">
        {
          section.payload?.dynamic?.[0]?.industries?.map((xs, idx) => (
            <div key={idx} className={`w-2 h-2 rounded-full mx-1 duration-300 transition-colors ${selectedIndex === idx ? 'bg-accent' : 'bg-[#d9d9d9]'}`} onClick={() => emblaApi?.goTo(idx)}>
            </div>
          ))
        }
      </div>

      <div className="flex w-full flex-row justify-center xl:left-0 xl:absolute xl:top-110">
        <div className="flex flex-row xl:w-355 xl:justify-between">
          <button className="mx-3" onClick={() => emblaApi?.goToPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
          <button className="mx-3" onClick={() => emblaApi?.goToNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
        </div>
      </div>

    </Section>
  )
}

