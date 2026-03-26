"use client";

import Image from "next/image";
import { Assets } from "../assets";

export function OneStop() {
  return (
    <div className="text-center bg-[#fafafa] py-10">
      <h2 className="text-[32px] font-semibold px-5">Elit atque deleniti harum ex</h2>
      <p className="px-5 text-sm">Ipsum corporis quis ipsum earum voluptates, sed. Deserunt provident velit.</p>

      <div className="flex flex-row mt-10">
        <div className="flex flex-col shrink-0 w-80 h-145 border border-[#bfbfbf] bg-[#fafafa] rounded-xl py-5 px-4 ml-5 text-left">
          <Image src={Assets.Cap} alt="cap" />
          <p>Consectetur dolor at repudiandae nostrum.</p>
          <p>Sit nisi blanditiis distinctio fugiat omnis ex? Magnam numquam repudiandae repellat quod odio. Velit similique praesentium eaque inventore vitae optio? Fugiat quod iusto quae qui eos! Repellendus perferendis quisquam quasi harum ex? Dolore ab esse nesciunt molestiae in! Nesciunt molestias vitae dolorem suscipit quo laboriosam Aperiam quidem sequi dolores dolorem</p>

        </div>
        <div className="flex flex-col shrink-0 w-80 h-145 border border-[#bfbfbf] bg-[#fafafa] rounded-xl py-5 px-4 ml-5 text-left">
          <Image src={Assets.Cap} alt="cap" />
          <p>Consectetur dolor at repudiandae nostrum.</p>
          <p>Sit nisi blanditiis distinctio fugiat omnis ex? Magnam numquam repudiandae repellat quod odio. Velit similique praesentium eaque inventore vitae optio? Fugiat quod iusto quae qui eos! Repellendus perferendis quisquam quasi harum ex? Dolore ab esse nesciunt molestiae in! Nesciunt molestias vitae dolorem suscipit quo laboriosam Aperiam quidem sequi dolores dolorem</p>

        </div>
        <div className="flex flex-col shrink-0 w-80 h-145 border border-[#bfbfbf] bg-[#fafafa] rounded-xl py-5 px-4 ml-5 text-left">
          <Image src={Assets.Cap} alt="cap" />
          <p>Consectetur dolor at repudiandae nostrum.</p>
          <p>Sit nisi blanditiis distinctio fugiat omnis ex? Magnam numquam repudiandae repellat quod odio. Velit similique praesentium eaque inventore vitae optio? Fugiat quod iusto quae qui eos! Repellendus perferendis quisquam quasi harum ex? Dolore ab esse nesciunt molestiae in! Nesciunt molestias vitae dolorem suscipit quo laboriosam Aperiam quidem sequi dolores dolorem</p>

        </div>
        <div className="flex flex-col shrink-0 w-80 h-145 border border-[#bfbfbf] bg-[#fafafa] rounded-xl py-5 px-4 ml-5 text-left">
          <Image src={Assets.Cap} alt="cap" />
          <p>Consectetur dolor at repudiandae nostrum.</p>
          <p>Sit nisi blanditiis distinctio fugiat omnis ex? Magnam numquam repudiandae repellat quod odio. Velit similique praesentium eaque inventore vitae optio? Fugiat quod iusto quae qui eos! Repellendus perferendis quisquam quasi harum ex? Dolore ab esse nesciunt molestiae in! Nesciunt molestias vitae dolorem suscipit quo laboriosam Aperiam quidem sequi dolores dolorem</p>

        </div>
      </div>

      <div className="mt-4">
        <button><Image className="w-12 h-12 mx-3" src={Assets.GrayArrowL} alt="left" /></button>
        <button><Image className="w-12 h-12 mx-3" src={Assets.GrayArrowR} alt="right" /></button>
      </div>

    </div>
  )
}
