'use client';

import { Assets } from "@/assets";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export function SayAbout() {
  const data = [1, 2, 3, 4]

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  })

  return (
    <div className="relative text-center pt-10 pb-15">
      <Image src={Assets.Map} fill alt="map" className="object-cover" />
      <h2 className="text-[32px] font-semibold px-5 mb-2">Dolor facere nulla voluptatem eaque nulla nam aut. Ducimus mollitia!</h2>
      <p className="px-5 text-sm mb-28.5">Lorem architecto quod aperiam iste dignissimos Commodi repellat explicabo quisquam!</p>

      <div className="relative flex flex-row z-10" ref={emblaRef}>

        {
          data.map((xs, idx) => (
            <div className="w-full shrink-0 flex justify-center items-center" key={idx}>
              <div className="bg-white w-87.5 h-90 rounded-lg flex flex-col shrink-0 px-5 items-center" key={idx}>
                <Image src={Assets.Avatar} alt="avatar" className="w-20 h-20 rounded-full absolute -top-10" />
                <span className="mt-15 text-[18px] font-semibold mb-2">{idx} Ipsum ipsum dolore.</span>
                <span className="text-secondary text-xs">Sit lorem nisi doloremque debitis odio saepe Accusamus doloremque ex</span>
                <Image src={Assets.QuoteL} alt="quote" className="mr-auto" />
                <p className="text-sm font-medium px-10 my-3">Sit reiciendis dolorem laboriosam vero deserunt? Perspiciatis animi distinctio nihil reiciendis harum? Accusantium aut veniam incidunt aliquid magni Animi veritatis</p>
                <Image className="ml-auto" src={Assets.QuoteR} alt="quote" />
              </div>
            </div>
          ))
        }


      </div>

      <div>
        <button onClick={() => emblaApi?.scrollPrev()}><Image className="w-12 h-12 mr-3" src={Assets.BlackArrowL} alt="prev" /></button>
        <button onClick={() => emblaApi?.scrollNext()}><Image className="w-12 h-12" src={Assets.BlackArrowR} alt="prev" /></button>
      </div>

    </div>
  )


}
