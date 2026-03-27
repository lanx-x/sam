"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Assets } from "@/assets";

export function OneStop() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  return (
    <div className="text-center bg-[#fafafa] py-10">
      <h2 className="text-[32px] font-semibold px-5">Elit atque deleniti harum ex</h2>
      <p className="px-5 text-sm">Ipsum corporis quis ipsum earum voluptates, sed. Deserunt provident velit.</p>

      <div className="mt-10 overflow-hidden" ref={emblaRef}>
        <div className="flex flex-row">
          <div className="flex flex-col shrink-0 w-80 border border-[#bfbfbf] bg-[#fafafa] rounded-xl py-5 px-4 ml-5 text-left">
            <Image src={Assets.Cap} className="object-cover" alt="cap" />
            <p className="text-2xl font-semibold mt-5 mb-3">Consectetur dolor at repudiandae nostrum.</p>
            <p className="text-sm text-[rgba(34,34,34,0.66)]">Sit nisi blanditiis distinctio fugiat omnis ex? Magnam numquam repudiandae repellat quod odio. Velit similique praesentium eaque inventore vitae optio? Fugiat quod iusto quae qui eos! Repellendus perferendis quisquam quasi harum ex? Dolore ab esse nesciunt molestiae in! Nesciunt molestias vitae dolorem suscipit quo laboriosam Aperiam quidem sequi dolores dolorem</p>


            <div className="mt-5">
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col shrink-0 w-80 border border-[#bfbfbf] bg-[#fafafa] rounded-xl py-5 px-4 ml-5 text-left">
            <Image src={Assets.Cap} className="object-cover" alt="cap" />
            <p className="text-2xl font-semibold mt-5 mb-3">Consectetur dolor at repudiandae nostrum.</p>
            <p className="text-sm text-[rgba(34,34,34,0.66)]">Sit nisi blanditiis distinctio fugiat omnis ex? Magnam numquam repudiandae repellat quod odio. Velit similique praesentium eaque inventore vitae optio? Fugiat quod iusto quae qui eos! Repellendus perferendis quisquam quasi harum ex? Dolore ab esse nesciunt molestiae in! Nesciunt molestias vitae dolorem suscipit quo laboriosam Aperiam quidem sequi dolores dolorem</p>


            <div className="mt-5">
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
            </div>
          </div><div className="flex flex-col shrink-0 w-80 border border-[#bfbfbf] bg-[#fafafa] rounded-xl py-5 px-4 ml-5 text-left">
            <Image src={Assets.Cap} className="object-cover" alt="cap" />
            <p className="text-2xl font-semibold mt-5 mb-3">Consectetur dolor at repudiandae nostrum.</p>
            <p className="text-sm text-[rgba(34,34,34,0.66)]">Sit nisi blanditiis distinctio fugiat omnis ex? Magnam numquam repudiandae repellat quod odio. Velit similique praesentium eaque inventore vitae optio? Fugiat quod iusto quae qui eos! Repellendus perferendis quisquam quasi harum ex? Dolore ab esse nesciunt molestiae in! Nesciunt molestias vitae dolorem suscipit quo laboriosam Aperiam quidem sequi dolores dolorem</p>


            <div className="mt-5">
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
            </div>
          </div><div className="flex flex-col shrink-0 w-80 border border-[#bfbfbf] bg-[#fafafa] rounded-xl py-5 px-4 ml-5 text-left">
            <Image src={Assets.Cap} className="object-cover" alt="cap" />
            <p className="text-2xl font-semibold mt-5 mb-3">Consectetur dolor at repudiandae nostrum.</p>
            <p className="text-sm text-[rgba(34,34,34,0.66)]">Sit nisi blanditiis distinctio fugiat omnis ex? Magnam numquam repudiandae repellat quod odio. Velit similique praesentium eaque inventore vitae optio? Fugiat quod iusto quae qui eos! Repellendus perferendis quisquam quasi harum ex? Dolore ab esse nesciunt molestiae in! Nesciunt molestias vitae dolorem suscipit quo laboriosam Aperiam quidem sequi dolores dolorem</p>


            <div className="mt-5">
              <div className="flex flex-row items-center">
                <div className="w-4 h-4 flex justify-center items-center mr-2 bg-accent rounded-full">
                  <Image src={Assets.Check} className="w-2 " alt="check" />
                </div>
                <span className="font-semibold text-sm">Elit autem deserunt delectus in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button type="button" onClick={() => emblaApi?.scrollPrev()}><Image className="w-12 h-12 mx-3" src={Assets.GrayArrowL} alt="left" /></button>
        <button type="button" onClick={() => emblaApi?.scrollNext()}><Image className="w-12 h-12 mx-3" src={Assets.GrayArrowR} alt="right" /></button>
      </div>

    </div>
  )
}
