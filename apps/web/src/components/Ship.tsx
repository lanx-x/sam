'use client';
import { getStrapiMedia } from "@/utils/strapi";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Image from "next/image";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { collectExtend, mergeExtension } from "@/utils";

export function Ship({ section }: CmpProps) {
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

  // useEffect(() => {
  //   if (emblaApi?.plugins()?.autoplay?.play) {
  //     // emblaApi.plugins().autoplay?.play()
  //   }
  // }, [emblaApi])

  const extension = mergeExtension(section)
  const bg_variant = extension?.bg_variant?.value === 'gray' ? 'bg-[#fafafa]' : 'bg-white'
  const images = section.payload?.extra_images ?? []

  return (
    <div className={`${bg_variant}`}>
      <div className="px-5 py-10 text-center flex flex-col xl:flex-row xl:w-7xl xl:mx-auto xl:py-20 xl:text-left xl:px-0" >
        <div className="">
          <h2 className="section-title">{section.payload?.title}</h2>
          <p className="section-desc">{section.payload?.desc}</p>

          <div className="text-left mt-10 shrink-0 grid gap-5 grid-cols-1 xl:grid-cols-3">
            {
              section.payload?.data?.filter(xs => xs.title && xs.desc).map((xs, idx) => (
                <div key={xs.id} className="bg-[#fafafa] py-8 px-5">
                  <Image width={40} height={40} src={getStrapiMedia(xs.image) ?? ""} className="mb-8" alt="icon" />
                  <p className="mb-3 text-lg font-semibold">{xs.title}</p>
                  <p>{xs.desc}</p>
                </div>
              ))
            }
          </div>
        </div>

        <div className="relative mt-5 w-full xl:ml-25 shrink-0 overflow-hidden xl:w-135" ref={emblaRef}>
          <div className="flex flex-row">
            {
              images.map((xs, idx) => (
                <div key={xs.id} className="relative w-full aspect-350/311 shrink-0 xl:aspect-135/120">

                  <Image key={idx} fill src={getStrapiMedia(xs) ?? ""} alt="workshop" className="rounded-lg object-cover" />
                </div>
              ))
            }
          </div>

          <div className="flex flex-row mx-auto mt-5 justify-center">
            {
              images.map((xs, idx) => (
                <div key={idx} className={`w-2 h-2 rounded-full mx-1 duration-300 transition-colors ${selectedIndex === idx ? 'bg-accent' : 'bg-[#d9d9d9]'}`} onClick={() => emblaApi?.goTo(idx)}>
                </div>
              ))
            }

          </div>

          <div className="hidden xl:flex absolute left-0 top-55 flex-row justify-start items-center xl:px-4 w-full xl:opacity-80">
            <button type="button" onClick={() => emblaApi?.goToPrev()} className="mr-3 xl:mr-auto"><Image className="w-12 h-12" src="" alt="left" /></button>
            <button type="button" onClick={() => emblaApi?.goToNext()}><Image className="w-12 h-12 " src="" alt="right" /></button>
          </div>
        </div>
      </div>

    </div>
  )
}
