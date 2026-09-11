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
  const data = payload?.data ?? [];
  // Embla disables looping when too few slides can fill the viewport during a wrap.
  const carouselData = data.length > 0
    ? Array.from({ length: Math.ceil(6 / data.length) }, () => data).flat()
    : [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
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

        <div className="mt-7.5 flow-root xl:mt-15">
          <div className="-my-4 overflow-hidden py-4" ref={emblaRef}>
            <div className="flex">
              {carouselData.map((caseStudy, index) => (
                <article key={index} className="mr-3 w-[84.6153846%] shrink-0 xl:mr-5 xl:w-[calc((100%_-_2.5rem)_/_3)]">
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
        </div>

      </div>
    </div>
  );
}
