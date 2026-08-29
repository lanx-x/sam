import Image from "next/image";
import { Assets } from "@/assets";
import { getStrapiMedia } from "@/utils/strapi";
import { Section } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Link from "next/link";

export function MoldMaking({ section, locale }: CmpProps) {
  const payload = section.payload!
  return (
    <div className="bg-[#fafafa] pt-37 pb-10 px-5 xl:pt-25 xl:pb-27 xl:px-0">
      <h2 className="text-3xl font-semibold text-center xl:text-5xl">{payload.title}</h2>
      <p className="text-sm text-center mt-3 mb-10 xl:text-base xl:mb-15">{payload.desc}</p>
      <div className="mx-4 flex flex-col xl:justify-center xl:flex-row xl:px-0 xl:mx-30 xl:gap-5">
        {
          payload.data?.map((xs, idx) =>
            <div key={idx} className="flex flex-col items-center mb-5 xl:mb-0 flex-1">
              <div className="w-full flex flex-col items-center -mb-10 z-1">
                <Image alt="pic" src={getStrapiMedia(xs.image) ?? ""} width={320} height={240} className="w-full aspect-32/24" />
                <Image alt="icon" src={getStrapiMedia(xs.extension?.[0]?.image) ?? ""} width={80} height={80} className="-mt-10" />
              </div>
              <div className="pt-20 min-h-70 bg-white w-full xl:pb-10 flex-1 xl:px-8">
                <p className="text-2xl font-semibold text-center mb-3">{xs.title}</p>
                <p className="text-base text-center">{xs.desc}</p>

              </div>

            </div>
          )
        }

      </div>
    </div>
  )
}
