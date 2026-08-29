import { Assets } from "@/assets";
import Image, { StaticImageData } from "next/image";
import { PropsWithChildren } from "react";
import { Section } from "./Section";
import type { SectionProps } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";

export function ImageSection({ section }: CmpProps) {
  const payload = section.payload!

  return (
    <div className="px-5 py-0 xl:w-7xl xl:mx-auto xl:pt-25">
      <h2 className="text-3xl font-semibold text-center">{payload.title}</h2>
      <div className="relative w-full aspect-128/94 mt-15">
        <Image fill unoptimized className="object-contain" src={getStrapiMedia(section.payload?.image) ?? ""} alt="section-img" />
      </div>
    </div>
  )
}

