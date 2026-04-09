'use client';
import { getStrapiMedia } from "@/utils/strapi";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SectionContainer } from "./Section";

function extendsListTo<T>(size: number, list: T[]) {
  let extended = []
  for (let i = 0; i < size; i++) {
    extended.push(list[i % list.length])
  }

  return extended
}

export function Partner({ section }: CmpProps) {
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

  return (
    <div className="bottom-5 left-0 h-10 w-full overflow-hidden" ref={emblaRef}>
      <div className="flex flex-row h-full items-center">
        {
          extendsListTo(20, section.payload?.data ?? [])?.map((xs, idx) => (
            <div key={idx} className="mr-9 flex h-full flex-[0_0_auto] items-center">
              <Image width={160} height={64} src={getStrapiMedia(xs.image) ?? ""} alt={xs.title ?? ""} className="h-5 w-auto object-contain" />
            </div>
          ))}
      </div>
    </div>
  )
}
