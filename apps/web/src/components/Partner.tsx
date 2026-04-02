'use client';
import { getStrapiMedia } from "@/utils/strapi";
import { CommonSection } from "cms-types";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export function Partner({ section }: { section: CommonSection }) {
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
      setActiveIndex((current) => (current + 1) % (section.data?.length ?? 1));
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeIndex, section.data?.length]);

  return null
  return (
    <div className="bottom-5 left-0 h-10 w-full overflow-hidden" ref={emblaRef}>
      <div className="flex flex-row h-full items-center">
        {
          section.data?.map(xs => (
            <div key={xs.id} className="mr-9 flex h-full flex-[0_0_auto] items-center">
              <Image width={160} height={64} src={getStrapiMedia(xs.image) ?? ""} alt={xs.title ?? ""} className="h-5 w-auto object-contain" />
            </div>
          ))}
      </div>
    </div>
  )
}
