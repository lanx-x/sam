'use client';

import { Assets } from "@/assets";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Section } from "./Section";
import { CommonSection } from "cms-types";
import { getStrapiMedia } from "@/utils/strapi";
import { collectExtend } from "@/utils";

export function FeaturedEquipment({ section }: { section: CommonSection }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  })

  const extension = collectExtend(section.payload?.extension as any)


  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className="text-left"
    >
      <div className="relative mt-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex flex-row w-full">
            {
              section.payload?.dynamic?.[0]?.equipment?.map((xs, idx) => (
                <div key={xs.id} className="w-305/390 ml-5 shrink-0 text-left xl:w-76.25 xl:ml-0 xl:mr-5">
                  <Image src={getStrapiMedia(xs.image) ?? ""} width={305} height={220} className="object-cover w-full xl:h-55" alt="" />

                  <div className="">
                    <p className="mt-6 mb-4 text-lg font-semibold">Dolor unde dolorem.</p>

                    <div className="border-b border-b-[#efefef] pb-6 mb-4">
                      {
                        xs.parameter?.map((item, idx) => (
                          <p className="text-sm" key={item.id}>
                            <span className="text-secondary mr-1">{item.key}:</span>
                            <span>{item.value}</span>
                          </p>
                        ))

                      }
                    </div>

                  </div>

                  <div className="flex items-center">

                    <p className="text-accent text-sm font-medium flex flex-row items-center mr-3">{extension.open_label}</p>
                    <Image src={Assets.Link} alt="link" />
                  </div>
                </div>
              ))
            }

          </div>
        </div>

        <div className="flex flex-row justify-center mt-10 xl:mt-0 xl:absolute xl:-top-13 xl:right-0">
          <button className="ml-3" onClick={() => emblaApi?.goToPrev()}><Image src={Assets.BlackArrowL} alt="prev" /></button>
          <button className="ml-3" onClick={() => emblaApi?.goToNext()}><Image src={Assets.BlackArrowR} alt="next" /></button>
        </div>
      </div>
    </Section >
  )

}
