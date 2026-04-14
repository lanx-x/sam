'use client';

import { Assets } from "@/assets";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Section } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import { collectExtend, mergeDisplayText, mergeExtension } from "@/utils";
import Link from "next/link";
import { Equipment } from "cms-types";

export function FeaturedEquipment({ section, locale }: CmpProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  })


  const extension = mergeExtension(section)
  const displayText = mergeDisplayText(section)
  const bg_variant = extension?.bg_variant?.value === 'gray' ? 'bg-[#fafafa]' : 'bg-white'

  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className={`text-left ${bg_variant}`}
    >
      <div className="relative mt-10 pl-5 xl:pl-0">
        <div className="overflow-hidden py-15 -my-15" ref={emblaRef}>
          <div className="flex flex-row w-full">
            {
              ((section.payload?.dynamic?.[0] as any)?.equipment as Equipment[])?.map((xs, idx) => (
                <Link target="_blank" href={`/${locale}/resources/equipment/${xs.documentId}`} key={xs.id} className="w-[78.205128vw] ml-5 shrink-0 text-left xl:w-76.25 xl:ml-0 xl:mr-5 hover:drop-shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-[#FAFAFA]">

                  <div className="relative w-76.25 h-55 shrink-0 overflow-hidden flex items-center justify-center">
                    <Image fill className="object-cover -z-10" src={Assets.EquipBase} alt="" />
                    <Image width={305} height={220} src={getStrapiMedia(xs.image) ?? ""} className="w-72 h-51 object-contain" alt="icon" />
                  </div>

                  <div className="px-5">
                    <p className="mt-6 mb-4 text-lg font-semibold">{xs.name}</p>

                    <div className="pb-6">
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

                  <div className="px-5 pt-4 pb-7  border-t border-t-[#efefef] ">
                    <div className="flex items-center">
                      <p className="text-accent text-sm font-medium flex flex-row items-center mr-3">{displayText?.view_details ?? 'View Details'}</p>
                      <Image src={Assets.Link} alt="link" />
                    </div>
                  </div>
                </Link>
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
