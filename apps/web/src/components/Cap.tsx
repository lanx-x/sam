import Image from "next/image";
import { Assets } from "@/assets";
import { getStrapiMedia } from "@/utils/strapi";
import { Section } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Link from "next/link";

export function Cap({ section, locale }: CmpProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2">
      {
        section.payload?.data?.map((xs, idx) => {
          return (
            <Link target="_blank" key={xs.id} href={`/${locale}/${xs.target_url ?? ''}`} className="group w-full aspect-39/20 relative xl:w-full xl:h-120 nth-2:bg-[#eee] max-xl:nth-4:bg-[#eee] xl:nth-3:bg-[#eee]">
              <Image alt="icon-cap" src={getStrapiMedia(xs.image) ?? ""} className="absolute right-0 bottom-0 xl:hidden w-1/2 aspect-195/120" width={195} height={120} />
              <div className="flex flex-col h-full opacity-100 xl:group-hover:opacity-0 transition-opacity duration-300">
                <h2 className="text-xl font-semibold mt-10 mx-5 xl:mt-20 xl:mx-30 xl:text-5xl xl:font-semibold">{xs.title}</h2>

                <div className="flex flex-row items-center mx-5 mt-auto mb-8 xl:mb-27 xl:mx-30">
                  <Image src={Assets.IconArrow} alt="icon-arrow" className="w-8 mr-3 xl:mr-4 xl:w-10 aspect-square" />
                  <p className="text-sm xl:text-base">Learn More</p>
                </div>
              </div>
              <div className="absolute left-0 top-0 w-full h-full hidden xl:flex items-center justify-center">
                <Image src={getStrapiMedia(xs.image) ?? ""} alt="logo" fill className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-65 h-65 bg-accent/90 rounded-full px-8 flex items-center justify-center flex-col z-2 opacity-0 group-hover:opacity-100 duration-300 delay-300">
                  <p className="text-white text-3xl font-semibold text-center mb-5">{xs.title}</p>
                  <Image src={Assets.IconArrow2} alt="arrow-icon" width={40} height={40} className="" />
                </div>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}
