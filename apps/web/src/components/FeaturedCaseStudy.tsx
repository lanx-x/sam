
'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Section } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import { collectExtend } from "@/utils";
import { CaseStudy } from "cms-types";

export function FeaturedCaseStudy({ section }: CmpProps) {
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
      className={`bg-[#fafafa] ${extension['style']?.value}`}
    >
      <div className="py-10 overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row">
          {
            ((section.payload?.dynamic?.[0] as any)?.case_studies as CaseStudy[])?.map((xs, idx) => (
              <div className="w-full shrink-0 flex items-center justify-center px-5 xl:px-0" key={idx}>

                <div
                  className="flex flex-col bg-white rounded-lg overflow-hidden shadow-[0_8px_24px_0_rgba(0,0,0,0.08)] xl:flex-row xl:w-7xl xl:h-130"
                  key={idx}>
                  <Image width={640} height={520} className="object-cover w-full aspect-64/52 xl:w-160" src={getStrapiMedia(xs.image) ?? ""} alt="" />
                  <div className="flex flex-col px-5 pt-4 pb-7 text-left xl:px-10 xl:pt-6 xl:pb-8">
                    {xs.industry?.name && <span className="self-start leading-8 bg-[#e5f2ff] border border-accent h-8 px-3.5 font-semibold rounded-sm inline-block xl:text-lg xl:h-10 xl:leading-10">{xs.industry?.name}</span>}
                    <p className="my-2 font-semibold text-lg leading-none xl:mt-4 xl:mb-3 xl:text-[32px]">{xs.title}</p>
                    <p className="text-sm leading-3.5 xl:text-base xl:leading-5">{xs.desc}</p>

                    <div className="mt-6.5 xl:text-base flex-1">
                      {
                        xs.parameter?.map(item => (
                          <p key={item.id} className="">
                            <span>{item.key}: </span>
                            <span>{item.value}</span>
                          </p>
                        ))
                      }
                    </div>

                    <div className="hidden text-right text-accent text-base justify-end font-medium items-center xl:flex">
                      <p className="mr-2">{extension['open_url']?.value}</p>
                      <Image src={Assets.ArrowR} alt="arrow" />
                    </div>
                  </div>
                </div>
              </div>

            ))
          }
        </div>
      </div>

      <div className="hidden xl:flex mx-auto justify-center">
        {
          ((section.payload?.dynamic?.[0] as any)?.case_studies as CaseStudy[])?.map((xs, idx) => (
            <div key={idx} className="cursor-pointer" onClick={() => emblaApi?.goTo(idx)}>
              <p className={`text-xs ${selectedIndex === idx ? 'text-[#666]' : 'text-[#bfbfbf]'}`}>0{idx + 1}</p>
              <div className={`w-12 h-1 border-b border-l ${selectedIndex === idx ? 'border-secondary' : 'border-[#efefef]'} last:border-r`}></div>

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

