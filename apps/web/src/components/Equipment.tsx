'use client';

import { Assets } from "@/assets";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Section } from "./Section";

export function Equipment() {
  const data = [1, 2, 3, 4]
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  })


  return (
    // <div className="text-center pt-10 pb-12.5 bg-[#fafafa] xl:text-left xl:pt-20 xl:pb-20">
    //   <div className="relative xl:text-left xl:w-7xl xl:mx-auto">
    //     <h2 className="px-5 section-title xl:px-0">Ipsum quod consequatur</h2>
    //     <p className="px-5 section-desc xl:px-0">Amet beatae totam expedita quae fugiat, voluptatum? A cupiditate cumque?</p>

    <Section
      title="Reliable growth Growth Solution advanced Management Sustainable Smart Platform Success"
      desc="Modern creative modern smart factory Solution modern Advanced expert global partner growth innovative premium management Smart global Solution Reliable sustainable"
      className="text-left"
    >
      <div className="relative mt-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex flex-row w-full">
            {
              data.map((xs, idx) => (
                <div key={idx} className="w-305/390 ml-5 shrink-0 text-left xl:w-76.25 xl:ml-0 xl:mr-5">
                  <Image src={Assets.Cap} className="object-cover xl:h-55" alt="" />

                  <div className="">
                    <p className="mt-6 mb-4 text-lg font-semibold">Dolor unde dolorem.</p>

                    <div className="border-b border-b-[#efefef] pb-6 mb-4">
                      {
                        data.map((xs, idx) => (
                          <p className="text-sm" key={idx}><span className="text-secondary">{idx}Brand: </span>lorem fdasfas fsdfsda vdsvdsv</p>
                        ))

                      }
                    </div>

                  </div>

                  <p className="text-accent text-sm font-medium flex flex-row items-center">View Product <Image className="ml-3 w-4 h-4" src={Assets.Link} alt="link" /></p>
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
