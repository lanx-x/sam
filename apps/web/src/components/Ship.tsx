'use client';
import { getStrapiMedia } from "@/utils/strapi";
import { CommonSection } from "cms-types";
import Image from "next/image";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";

export function Ship({ section }: { section: CommonSection }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
  }, [
    AutoPlay({
      active: true,
      delay: 3000,

      // defaultInteraction: false,
    }),
  ])

  useEffect(() => {
    if (!emblaApi) {
      return;
    }


    const syncSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedSnap());
    };

    const onSelect = (_api: unknown, event: { detail: { targetSnap: number } }) => {
      setSelectedIndex(event.detail.targetSnap);
    };

    syncSelectedIndex();
    emblaApi.on("select", onSelect);
    emblaApi.on("reinit", syncSelectedIndex);


    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reinit", syncSelectedIndex);
    };
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi?.plugins()?.autoplay?.play) {
      console.log("emblaApi.plugins()?.autoplay.play", emblaApi.plugins()?.autoplay.play)
      // emblaApi.plugins().autoplay?.play()
    }

  }, [emblaApi])

  return (
    <div className={`${section.style}`}>
      <div className="px-5 py-10 text-center flex flex-col xl:flex-row xl:w-7xl xl:mx-auto xl:py-20 xl:text-left xl:px-0" >
        <div className="">
          <h2 className="section-title">{section.title}</h2>
          <p className="section-desc">{section.desc}</p>

          <div className="text-left mt-10 flex flex-col xl:flex-row shrink-0">
            {
              section.data?.filter(xs => xs.title && xs.desc).map((xs, idx) => (
                <div key={xs.id} className="bg-[#fafafa] mb-2 py-8 px-5 xl:mr-5">
                  <Image width={40} height={40} src={getStrapiMedia(xs.image) ?? ""} className="mb-8" alt="icon" />
                  <p className="mb-3 text-lg font-semibold">{xs.title}</p>
                  <p>{xs.desc}</p>
                </div>
              ))
            }
          </div>
        </div>

        <div className="mt-5 w-full xl:ml-25 shrink-0 overflow-hidden xl:w-135" ref={emblaRef}>
          <div className="flex flex-row">
            {
              section.data?.filter(xs => !xs.title || !xs.desc).map((xs, idx) => (
                <div key={xs.id} className="w-full aspect-350/311 shrink-0 xl:aspect-135/120">

                  <Image key={idx} fill src={getStrapiMedia(xs.image) ?? ""} alt="workshop" className="rounded-lg object-cover" />
                </div>
              ))
            }
          </div>

          <div className="flex flex-row mx-auto mt-5 justify-center">
            {
              section.data?.filter(xs => !xs.title || !xs.desc).map((xs, idx) => (
                <div key={idx} className={`w-2 h-2 rounded-full mx-1 duration-300 transition-colors ${selectedIndex === idx ? 'bg-accent' : 'bg-[#d9d9d9]'}`} onClick={() => emblaApi?.goTo(idx)}>
                </div>
              ))
            }
          </div>

        </div>
      </div>

    </div>
  )
}
