'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import { mergeExtension } from "@/utils";
export function Marquee({ section }: CmpProps) {
  const extension = mergeExtension(section)

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
        defaultInteraction: false,
      }),
    ],
  );

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    autoScroll.play()

  }, [emblaApi])

  const extendLogos = useMemo(() => Array.from({ length: 10 }, () => section.payload?.extra_images).flat(), [section.payload])


  return (
    <div style={{ marginTop: '-60px' }} className={`relative h-10 ${extension.style?.value}`}>
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full items-center">
          {extendLogos?.map((logo, idx) => (
            <div key={`${String(logo.id)}-${idx}`} className="mr-9 flex h-full flex-[0_0_auto] items-center">
              <Image width={100} height={40} src={getStrapiMedia(logo) ?? ""} alt="" className="h-6 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

}
