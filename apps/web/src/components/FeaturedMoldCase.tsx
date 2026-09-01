'use client';

import { Assets } from "@/assets";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getStrapiMedia } from "@/utils/strapi";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Autoplay from "embla-carousel-autoplay";

type FeaturedMoldCasePayload = {
  title?: string | null;
  data?: Array<{
    image?: Parameters<typeof getStrapiMedia>[0];
    title?: string | null;
  }> | null;
};

type FeaturedMoldCaseProps = {
  section?: CmpProps["section"];
  payload?: FeaturedMoldCasePayload | null;
};

export function FeaturedMoldCase({ section, payload: providedPayload }: FeaturedMoldCaseProps) {
  const payload = providedPayload ?? section?.payload;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    breakpoints: {
      "(min-width: 1280px)": { slidesToScroll: 3 },
    },
  }, [Autoplay({ active: true, delay: 3000 })]);

  useEffect(() => {
    if (!emblaApi || !emblaRef) return;

    const syncCarouselState = () => {
      setSelectedIndex(emblaApi.selectedSnap());
      setSnapCount(emblaApi.snapList().length);
    };
    syncCarouselState();
    emblaApi.on("select", syncCarouselState);
    emblaApi.on("reinit", syncCarouselState);

    try {
      emblaApi?.plugins()?.autoplay?.play?.()
    } catch (err) { console.log('autoplay error', err) }

    return () => {
      emblaApi.off("select", syncCarouselState);
      emblaApi.off("reinit", syncCarouselState);
    };
  }, [emblaApi]);

  if (!payload) return null;

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
          {Array.from({ length: snapCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to case group ${index + 1}`}
              onClick={() => emblaApi?.goTo(index)}
              className={`size-2 rounded-full transition-colors ${selectedIndex === index ? "bg-accent" : "bg-[#efefef]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
