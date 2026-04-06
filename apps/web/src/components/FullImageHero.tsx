import { mergeExtension } from "@/utils";
import { getStrapiMedia, getStrapiURL } from "@/utils/strapi";
import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import Image from "next/image";

export function FullImageHero({ section }: CmpProps) {
  const extension = mergeExtension(section)

  return (
    <div className={`relative py-8.75 xl:py-16.25 flex justify-center items-center ${extension['style']?.value}`}>
      <Image fill src={getStrapiMedia(section.payload?.image) ?? ""} alt="banner" className="object-cover" />
      <div className="relative z-10 text-center text-white xl:w-7xl">
        <p className="text-[64px] font-black mb-5 leading-none">{section.payload?.title}</p>
        <p className="text-base">{section.payload?.desc}</p>
      </div>
    </div>
  )
}
