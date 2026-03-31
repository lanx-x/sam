import { Assets } from "@/assets";
import Image from "next/image";

export function Industry() {
  return (
    <div className="px-5 py-10 xl:w-7xl xl:mx-auto">
      <div className="flex flex-col xl:flex-row">
        <h2 className="section-title xl:w-1/2 xl:text-left xl:mr-4">Consectetur vero inventore distinctio consequuntur modi Minus accusantium similique repudiandae!</h2>
        <div className="xl:w-1/2">
          <div className="invisible h-1 w-16 bg-accent my-3 xl:visible"></div>
          <p className="section-desc  xl:text-left">Elit ducimus voluptate doloribus veritatis repudiandae at. Aliquid magnam ducimus dolore deserunt exercitationem eum Aliquid rem voluptate facilis qui voluptatem</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-10 xl:grid-cols-4 xl:gap-5">
        {
          [1, 2, 3, 5].map((xs, idx) => (
            <div className="relative h-42.5 aspect-square xl:h-75" key={idx}>
              <Image src={Assets.Cap} className="object-cover w-75 aspect-square" alt="" />
              <div className="bg-[rgba(0,0,0,0.7)] absolute w-full bottom-0 z-10 px-3 py-2">
                <p className="text-white font-semibold">Dolor cum</p>
              </div>

            </div>
          ))
        }


      </div>

    </div>
  )
}
