'use client';

import { Assets } from "@/assets";
import Image from "next/image";
import { useState } from "react";
import { SectionContainer } from "./Section";
import { CommonSection, FAQSection } from "cms-types";

export function FAQ({ section }: { section: FAQSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fafafa] py-10 xl:py-20">
      <SectionContainer>
        <div className="w-full flex flex-col text-center xl:text-left xl:flex-row">
          <div className="shrink-0 xl:mr-42.5 xl:w-76.75">
            <h2 className="px-5 xl:px-0 section-title">{section.title}</h2>
            <p className="px-5 xl:px-0 section-desc">{section.desc}</p>
          </div>

          <div className="px-5 text-left mt-10 xl:mt-0 xl:px-0">
            {
              section.faqs?.map((xs, idx) => (
                <div className="py-5 border-b border-b-[#efefef]" key={idx}>
                  <button
                    type="button"
                    className="cursor-pointer flex flex-row items-center justify-start text-left w-full"
                    onClick={() => setOpenIndex((current) => current === idx ? null : idx)}
                  >
                    <p className="text-base font-semibold flex-1">{xs.q}</p>
                    <Image src={openIndex === idx ? Assets.Minus : Assets.Plus} alt="plus" className="w-4 h-4" />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity,margin-top] duration-300 ease-out ${openIndex === idx ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-base leading-6 pr-9 pb-10">{xs.a}</p>
                    </div>
                  </div>
                </div>
              ))
            }


          </div>
        </div>
      </SectionContainer>
    </div >
  )
}
