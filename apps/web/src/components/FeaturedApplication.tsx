'use client';

import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Assets } from "@/assets";
import { mergeExtension } from "@/utils";
import { buildDynamicDetailPath } from "@/utils/dynamic-routes";
import { getStrapiMedia } from "@/utils/strapi";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import type { Application } from "cms-types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type ApplicationCollection = {
  applications?: Application[];
};

export function FeaturedApplication({ section, locale }: CmpProps) {
  const extension = mergeExtension(section);
  const bgVariant = extension?.bg_variant?.value === "gray" ? "bg-[#fafafa]" : "bg-white";
  const applicationCollection = section.payload?.dynamic?.[0] as unknown as ApplicationCollection | undefined;
  const applications = applicationCollection?.applications ?? [];
  const carouselApplications = applications.length > 0
    ? Array.from({ length: Math.ceil(6 / applications.length) }, () => applications).flat()
    : [];
  const autoplay = useRef(Autoplay({ active: true, delay: 3000 }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true },
    [autoplay.current],
  );

  useEffect(() => {
    emblaApi?.plugins()?.autoplay?.play?.();
  }, [emblaApi]);

  return (
    <section className={bgVariant}>
      <div className="relative pt-20 xl:mx-30 xl:pt-30">
        <div className="mb-5 flex px-5 xl:mb-15 xl:px-0">
          <div>
            <h2 className="text-2xl font-medium xl:text-5xl/20">{section.payload?.title}</h2>
            <div className="mt-1.5 h-1.5 w-full max-w-[358px] bg-accent" />
          </div>

          <div className="ml-auto hidden self-center gap-3 xl:flex">
            <button type="button" aria-label="Previous application" className="relative size-12" onClick={() => emblaApi?.goToPrev()}>
              <Image alt="" src={Assets.BlackArrowL} fill className="object-cover" />
            </button>
            <button type="button" aria-label="Next application" className="relative size-12" onClick={() => emblaApi?.goToNext()}>
              <Image alt="" src={Assets.BlackArrowR} fill className="object-cover" />
            </button>
          </div>
        </div>

        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex w-full flex-row gap-5 pl-5 xl:-ml-5 xl:gap-0 xl:pl-0">
            {carouselApplications.map((application, index) => (
              <Link
                key={index}
                href={buildDynamicDetailPath(locale, "application", application)}
                target="_blank"
                rel="noreferrer"
                className="group basis-30/39 shrink-0 xl:basis-[calc((100%_+_1.25rem)_/_3)] xl:pl-5"
              >
                <article className="relative aspect-[547/360] overflow-hidden rounded-lg bg-[#f5f5f5]">
                  <Image
                    fill
                    sizes="(min-width: 1280px) 33vw, 77vw"
                    src={getStrapiMedia(application.image) ?? ""}
                    alt={application.label ?? application.name ?? ""}
                    className="object-cover transition-transform duration-300 group-hover:scale-130"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 flex min-h-16 items-center px-5 py-3 xl:min-h-20 xl:px-10"
                    style={{ backgroundImage: `url(${Assets.Dot.src})`, backgroundRepeat: "repeat" }}
                  >
                    <p className="text-sm font-bold text-white xl:text-2xl">{application.label ?? application.name}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
