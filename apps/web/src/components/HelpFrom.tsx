'use client';

import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { SectionContainer, SectionHeaderRowDir } from "./Section";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";
import { useState } from "react";
import { Assets } from "@/assets";

export function HelpFrom({ section }: CmpProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const steps = section.payload?.data

  const gridOpts = "grid grid-cols-[600px_1fr]"

  return (
    <div className="bg-white py-20">
      <SectionContainer>
        <SectionHeaderRowDir
          title={section.payload?.title!}
          desc={section.payload?.desc!}
        />

        <div className="mt-15">
          {
            steps?.map((step: any, idx: number) => {
              const isActive = activeIndex === idx
              return (
                <div key={idx} className={`py-12.5 first:border-t border-[#bfbfbf] border-b transition-colors`}>
                  <button onClick={() => setActiveIndex(isActive ? -1 : idx)} className={`w-full cursor-pointer text-left ${gridOpts}`}>
                    <span className="text-[32px]">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="flex flex-row items-center">
                      <div className="text-[32px] font-semibold flex-1">{step.title}</div>
                      <div className="relative w-4 h-4">
                        <Image src={isActive ? Assets.Minus : Assets.Plus} fill alt="plus" />
                      </div>
                    </div>
                  </button>

                  {isActive && (
                    <div className={`mt-6 mb-10 ${gridOpts}`}>
                      <div></div>
                      <div>
                        {step.image && (
                          <div className="aspect-video relative rounded-xl overflow-hidden mb-5">
                            <Image fill src={getStrapiMedia(step.image) ?? ""} alt="" className="object-cover" />
                          </div>
                        )}
                        <p className="text-base leading-5.5">{step.desc}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </SectionContainer>
    </div>
  )
}
