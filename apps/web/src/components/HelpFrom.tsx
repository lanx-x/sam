'use client';

import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { SectionContainer, SectionHeaderRowDir } from "./Section";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";
import { useState, useRef } from "react";
import { Assets } from "@/assets";

export function HelpFrom({ section }: CmpProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const steps = section.payload?.data

  const gridOpts = "grid grid-cols-1 xl:grid-cols-[600px_1fr]"

  const handleToggle = (idx: number, isCurrentlyActive: boolean) => {
    if (!isCurrentlyActive) {
      const btnTop = itemRefs.current[idx]?.querySelector('button')?.getBoundingClientRect().top ?? 0
      setActiveIndex(idx)
      const anchor = () => {
        const newTop = itemRefs.current[idx]?.querySelector('button')?.getBoundingClientRect().top ?? 0
        if (Math.abs(newTop - btnTop) > 0.5) {
          window.scrollBy({ top: newTop - btnTop })
          requestAnimationFrame(anchor)
        }
      }
      requestAnimationFrame(anchor)
    } else {
      setActiveIndex(-1)
    }
  }

  return (
    <div className="bg-white py-20 px-5 xl:px-0">
      <div className="xl:mx-auto xl:w-7xl">
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[540px_1fr] xl:gap-15">
          <h2 className="text-3xl font-semibold">{section.payload?.title}</h2>
          <p className="text-sm before:block before:w-20 before:h-1.5 before:bg-accent before:mb-3">{section.payload?.desc}</p>
        </div>
        <div className="mt-10 xl:mt-15">
          {
            steps?.map((step: any, idx: number) => {
              const isActive = activeIndex === idx
              return (
                <div key={idx} ref={el => { itemRefs.current[idx] = el }} className={`py-5 xl:py-12.5 first:border-t border-[#bfbfbf] border-b transition-colors`}>
                  <button onClick={() => handleToggle(idx, isActive)} className={`relative w-full cursor-pointer text-left ${gridOpts}`}>
                    <span className="text-[32px]">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="flex flex-row items-center">
                      <div className="text-2xl xl:text-[32px] font-semibold flex-1">{step.title}</div>
                      <div className="absolute right-0 top-4 xl:top-0 xl:relative w-4 h-4">
                        <Image src={isActive ? Assets.Minus : Assets.Plus} fill alt="plus" />
                      </div>
                    </div>
                  </button>

                  <div className="grid transition-[grid-template-rows] duration-300 ease-in-out" style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}>
                    <div className="overflow-hidden">
                      <div className={`mt-6 mb-0 xl:mb-10 ${gridOpts}`}>
                        <div></div>
                        <div>
                          {step.image && (
                            <div className="aspect-video relative rounded-xl overflow-hidden mb-5">
                              <Image fill src={getStrapiMedia(step.image) ?? ""} alt="" className="object-cover" />
                            </div>
                          )}
                          <p className="text-sm xl:text-base leading-5.5">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

    </div>
  )
}
