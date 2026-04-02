"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { Assets } from "@/assets";
import { CommonSection } from "cms-types";
import { getStrapiMedia } from "@/utils/strapi";

const ROTATE_INTERVAL = 3000;
const partnerLogos = [
  Assets.Corp01,
  Assets.Corp02,
  Assets.Corp03,
  Assets.Corp04,
  Assets.Corp05,
] as const;
const marqueeLogos = Array.from({ length: 10 }, () => partnerLogos).flat();

export function MainHero({ section }: { section: CommonSection }) {
  const items = section.data ?? []

  const [activeIndex, setActiveIndex] = useState(0);

  const animationName = useMemo(
    () => `banner-progress-${activeIndex}`,
    [activeIndex],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      dragFree: true,
      loop: true,
    },
    [
      AutoScroll({
        active: true,
        speed: 0.9,
        startDelay: 0,
      }),
    ],
  );

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    autoScroll.play()

  }, [emblaApi])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, ROTATE_INTERVAL);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeIndex, items.length]);


  return (
    <div className="relative">
      {
        items.map((item, idx) => (
          <Image key={item.id} src={getStrapiMedia(item.image) ?? ""} alt="banner" fill className={`object-cover object-[70%_20%] transition-opacity duration-900 ${activeIndex === idx ? "opacity-100" : "opacity-0"}`} />
        ))
      }
      <div className="absolute inset-0 bg-[linear-gradient(278deg,rgba(0,35,70,0)_31.39%,#001123_100%)]" />
      <div className="relative pt-20 px-5 xl:w-7xl xl:px-0 xl:mx-auto">
        <h2 className="text-4xl font-black text-white mb-10 max-w-87.5 xl:text-[64px] xl:max-w-140">{section.title}</h2>

        <div>
          <div className="flex flex-col xl:flex-row">
            <style>{`@keyframes ${animationName} { from { width: 0%; } to { width: 100%; } }`}</style>
            {
              items.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className="block w-fit max-w-full text-left mb-4 xl:mb-10 xl:mr-5"
                    onClick={() => setActiveIndex(index)}
                  >
                    <p className="text-secondary font-medium mb-1 leading-none xl:text-base">{item.title}</p>
                    <div className={`h-0.5 w-full overflow-hidden rounded-full bg-[#d9d9d9] transition-opacity duration-400 ${isActive ? "opacity-100" : "opacity-0"}`} >
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{
                          // width: isActive ? "100%" : "0%",
                          animation: isActive ? `${animationName} ${ROTATE_INTERVAL}ms linear forwards` : "none",
                        }}
                      />
                    </div>
                  </button>
                );
              })}

          </div>
          <p className="text-white text-sm min-h-20 xl:max-w-128 xl:min-h-0 xl:text-base">
            {items[activeIndex]?.desc}
          </p>
        </div>

        <div className="flex mt-20 pb-29 flex-row justify-between xl:pb-34.5 xl:justify-start xl:mt-10">
          {
            section.actions?.map(xs => (
              <button key={xs.id} className="w-16/35 h-12 bg-white first:bg-accent rounded-sm first:text-white font-medium truncate xl:w-50 xl:h-13 xl:mr-5 xl:text-base">{xs.label}</button>
            ))
          }
        </div>
      </div>

      <div className="absolute bottom-5 left-0 h-10 w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full items-center">
          {marqueeLogos.map((logo, idx) => (
            <div key={`${logo.src}-${idx}`} className="mr-9 flex h-full flex-[0_0_auto] items-center">
              <Image src={logo} alt={`corp-${(idx % partnerLogos.length) + 1}`} className="h-5 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
