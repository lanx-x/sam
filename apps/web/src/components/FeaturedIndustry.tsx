'use client';

import { Assets } from "@/assets";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { buildDynamicDetailPath } from "@/utils/dynamic-routes";
import { getStrapiMedia } from "@/utils/strapi";
import { mergeExtension } from "@/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import type { Industry } from "cms-types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type IndustryCollection = {
  industries?: Industry[];
};

export function FeaturedIndustry({ section, locale }: CmpProps) {
  const extension = mergeExtension(section);
  // t0: featured industry carousel with three wide cards.
  // t1: constrained content layout with four portrait cards and a description.
  const t = ["t0", "t1"].map((item) => (extension.variant?.value ?? "t0") === item);
  const bgVariant = extension?.bg_variant?.value === "gray" ? "bg-[#fafafa]" : "bg-white";
  const industryCollection = section.payload?.dynamic?.[0] as unknown as IndustryCollection | undefined;
  const industries = industryCollection?.industries ?? [];
  const carouselIndustries = industries.length > 0
    ? Array.from({ length: Math.ceil((t[1] ? 8 : 6) / industries.length) }, () => industries).flat()
    : [];
  const imageSizes = t[1] ? "(min-width: 1280px) 25vw, 77vw" : "(min-width: 1280px) 33vw, 77vw";
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
      <div className={`relative w-full pt-20 ${t[0] && "xl:mx-30 xl:pt-30"} ${t[1] && "xl:mx-auto xl:w-7xl xl:py-25"}`}>
        <div className="mb-5 flex px-5 xl:mb-15 xl:px-0">
          <div>
            <h2 className="text-2xl font-medium xl:text-5xl/20">{section.payload?.title}</h2>
            <div className={`mt-1.5 h-1.5 bg-accent ${t[0] && "w-full max-w-[358px]"} ${t[1] && "w-20"}`} />
            {t[1] && section.payload?.desc && <p className="mt-3 text-sm leading-5 xl:text-base">{section.payload.desc}</p>}
          </div>

          <div className="ml-auto hidden self-center gap-3 xl:flex">
            <button type="button" aria-label="Previous industry" className="relative size-12" onClick={() => emblaApi?.goToPrev()}>
              <Image alt="" src={Assets.BlackArrowL} fill className="object-cover" />
            </button>
            <button type="button" aria-label="Next industry" className="relative size-12" onClick={() => emblaApi?.goToNext()}>
              <Image alt="" src={Assets.BlackArrowR} fill className="object-cover" />
            </button>
          </div>
        </div>

        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex w-full flex-row gap-5 pl-5 xl:-ml-5 xl:gap-0 xl:pl-0">
            {carouselIndustries.map((industry, index) => (
              <Link
                key={index}
                href={buildDynamicDetailPath(locale, "industry", industry)}
                target="_blank"
                rel="noreferrer"
                className={`group basis-30/39 shrink-0 xl:pl-5 ${t[0] && "xl:basis-[calc((100%_+_1.25rem)_/_3)]"} ${t[1] && "xl:basis-[calc((100%_+_1.25rem)_/_4)]"}`}
              >
                <article className={`relative overflow-hidden bg-[#f5f5f5] ${t[0] && "aspect-[547/360] rounded-lg"} ${t[1] && "aspect-305/300"}`}>
                  <Image
                    fill
                    sizes={imageSizes}
                    src={getStrapiMedia(industry.image) ?? ""}
                    alt={industry.name ?? ""}
                    className="object-cover transition-transform duration-300 group-hover:scale-130"
                  />
                  <div
                    className={`absolute inset-x-0 bottom-0 flex items-center px-5 ${t[0] && "min-h-16 py-3 xl:min-h-20 xl:px-10"} ${t[1] && "h-13 bg-black/70 xl:px-5"}`}
                    style={t[0] ? { backgroundImage: `url(${Assets.Dot.src})`, backgroundRepeat: "repeat" } : undefined}
                  >
                    <p className={`text-sm font-bold text-white xl:text-2xl ${t[1] && "w-full truncate"}`}>{industry.name}</p>
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
