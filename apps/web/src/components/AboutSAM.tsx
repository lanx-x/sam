import Image from "next/image";
import { Assets } from "@/assets";
import { getStrapiMedia } from "@/utils/strapi";
import { Section } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Link from "next/link";

export function AboutSAM({ section, locale }: CmpProps) {
  const payload = section.payload!
  const desc = payload.desc?.replace(/\\n/g, '\n')

  return (
    <div className="flex flex-col items-center pt-15 pb-28 px-5 xl:flex-row-reverse xl:pt-25 xl:px-0 xl:mx-30 xl:pb-35 xl:justify-center xl:items-stretch">
      <div className="relative w-full xl:w-1/2 flex items-center xl:mr-10 xl:my-10">
        <div className="w-full aspect-35/16 xl:aspect-8/5 relative">
          <Image fill src={getStrapiMedia(payload.image) ?? ""} alt="company-image" className="object-cover" />
          <div className="hidden xl:block bg-accent w-55 h-5/6 absolute -right-10 -bottom-10 -z-1">
          </div>
        </div>
      </div>
      <div className="mt-5 xl:mt-0 xl:bg-[#fafafa] xl:w-1/2 xl:z-2 xl:p-20">
        <h2 className="text-lg text-accent font-semibold before:w-9 before:h-0.5 before:bg-accent before:inline-block before:mr-2 flex items-center">About SAM</h2>
        <h2 className="mt-3 mb-5 text-2xl xl:text-3xl font-semibold">{payload.title}</h2>
        <p className="text-sm whitespace-pre-line xl:text-base">{desc}</p>
      </div>
    </div>
  )
}
