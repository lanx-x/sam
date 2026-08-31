'use client';

import { Assets } from "@/assets";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getStrapiMedia } from "@/utils/strapi";
import type { CaseStudy } from "cms-types";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";

export function FeaturedMoldCase({ section }: CmpProps) {
  const payload = section.payload!
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const syncSelectedIndex = () => setSelectedIndex(emblaApi.selectedSnap());
    syncSelectedIndex();
    emblaApi.on("select", syncSelectedIndex);
    emblaApi.on("reinit", syncSelectedIndex);

    return () => {
      emblaApi.off("select", syncSelectedIndex);
      emblaApi.off("reinit", syncSelectedIndex);
    };
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden bg-white pt-15 pb-18.75 xl:pt-25 xl:pb-[77px]">
      <div className="xl:mx-auto xl:w-7xl xl:px-0">
        <div className="relative px-5 xl:px-0">
          <h2 className="text-[32px]/[38px] font-semibold text-primary xl:text-5xl/[58px]">{payload.title}</h2>
          <div className="mt-2 h-1.5 w-full bg-accent xl:mt-1.5 xl:w-120" />

          <div className="absolute right-0 top-2 hidden gap-3 xl:flex">
            <button type="button" aria-label="Previous case" onClick={() => emblaApi?.goToPrev()}>
              <Image src={Assets.BlackArrowL} alt="" className="size-12" />
            </button>
            <button type="button" aria-label="Next case" onClick={() => emblaApi?.goToNext()}>
              <Image src={Assets.BlackArrowR} alt="" className="size-12" />
            </button>
          </div>
        </div>

        <div className="mt-7.5 overflow-hidden xl:mt-15" ref={emblaRef}>
          <div className="flex gap-3 xl:gap-5">
            {payload.data?.map((caseStudy, index) => (
              <article key={index} className="w-330/390 shrink-0 xl:w-103.25">
                <div className="relative aspect-330/224 overflow-hidden rounded-lg bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] xl:h-70">
                  <Image
                    fill
                    src={getStrapiMedia(caseStudy.image) ?? ""}
                    alt={caseStudy.title ?? ""}
                    className="object-cover"
                  />
                </div>
                <p className="mt-5 text-base font-semibold leading-5 text-primary xl:text-lg xl:leading-6">{caseStudy.title}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-9 hidden justify-center gap-1.5 xl:flex">
          {payload.data?.map((caseStudy, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to case ${index + 1}`}
              onClick={() => emblaApi?.goTo(index)}
              className={`size-2 rounded-full transition-colors ${selectedIndex === index ? "bg-accent" : "bg-[#efefef]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
