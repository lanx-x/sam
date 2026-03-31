"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Assets } from "@/assets";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export function OneStop() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);


  useEffect(() => {
    if (!emblaApi) return;

    const updateSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedSnap());
    };

    updateSelectedIndex();
    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reinit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reinit", updateSelectedIndex);
    };
  }, [emblaApi]);

  return (
    <div className="text-center bg-[#fafafa] py-10">
      <h2 className="px-5 section-title">Elit atque deleniti harum ex</h2>
      <p className="px-5 section-desc">Ipsum corporis quis ipsum earum voluptates, sed. Deserunt provident velit.</p>

      <div className="flex-row items-center justify-center hidden xl:flex xl:visible xl:mt-16.25">
        {
          [1, 2, 3, 4].map((xs, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={cn("text-base font-medium w-9 h-9 rounded-full flex flex-row items-center justify-center transition-all duration-300", selectedIndex === idx ? 'bg-accent text-white' : 'text-accent')}>0{idx + 1}</div>
              <p className="mt-2 mb-3 text-base font-medium">Ipsum ipsum</p>
              <Image src={selectedIndex === idx ? Assets.RulerOn : Assets.RulerOff} alt="ruler" />
            </div>
          ))
        }

      </div>

      <div className="mt-10 overflow-hidden xl:mt-12 xl:w-7xl xl:mx-auto" ref={emblaRef}>
        <div className="flex flex-row">
          {
            [1, 2, 3, 4].map((xs, idx) => (
              <div
                key={idx}
                className="flex flex-col shrink-0 w-80 border border-[#bfbfbf] bg-[#fafafa] rounded-xl py-5 px-4 ml-5 text-left xl:ml-0 xl:px-0 xl:w-full xl:border-0 xl:flex-row-reverse">
                <Image src={Assets.Cap} className="object-cover xl:w-120 xl:h-75" alt="cap" />
                <div className="shrink-0 invisible xl:visible xl:w-px xl:h-full xl:bg-[#efefef] xl:mx-15"></div>
                <div>
                  <p className="text-2xl font-semibold mt-5 mb-3 xl:text-[32px] xl:mb-4">Consectetur dolor at repudiandae nostrum.</p>
                  <p className="text-sm text-[rgba(34,34,34,0.66)]">Sit nisi blanditiis distinctio fugiat omnis ex? Magnam numquam repudiandae repellat quod odio. Velit similique praesentium eaque inventore vitae optio? Fugiat quod iusto quae qui eos! Repellendus perferendis quisquam quasi harum ex? Dolore ab esse nesciunt molestiae in! Nesciunt molestias vitae dolorem suscipit quo laboriosam Aperiam quidem sequi dolores dolorem</p>


                  <div className="mt-5 flex flex-col xl:mt-6 xl:flex-row xl:flex-wrap">
                    {
                      [1, 2, 3, 4, 5].map((xs, idx) => (
                        <div key={idx} className="flex flex-row items-center shrink-0 mb-2 xl:mr-15 xl:mb-3">
                          <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                            <Image src={Assets.Check} className="w-2 " alt="check" />
                          </div>
                          <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="mt-4 flex flex-row justify-center xl:justify-start xl:w-7xl xl:mx-auto">
        <button type="button" onClick={() => emblaApi?.goToPrev()}><Image className="w-12 h-12 mr-3" src={Assets.GrayArrowL} alt="left" /></button>
        <button type="button" onClick={() => emblaApi?.goToNext()}><Image className="w-12 h-12 " src={Assets.GrayArrowR} alt="right" /></button>
      </div>

    </div>
  )
}
