import { mergeExtension } from "@/utils";
import { getStrapiMedia, getStrapiURL } from "@/utils/strapi";
import { CommonSection } from "cms-types";
import Image from "next/image";

export function ImageHero({ section }: { section: CommonSection }) {
  const extension = mergeExtension(section)

  return (
    <div className={`${extension.style}`}>
      <div className={`px-5 py-10 text-center xl:py-20 xl:px-0 xl:w-7xl xl:mx-auto`}>
        <h2 className="text-4xl mb-5 font-black xl:text-[64px] leading-none">{section.payload?.title}</h2>
        <p className="text-base leading-none">{section.payload?.desc}</p>

        <div className="flex flex-col my-10 xl:flex-row xl:justify-center">
          {
            section.payload?.actions?.map((xs, idx) => (
              <button key={idx} className="bg-primary first:bg-accent rounded-sm text-white h-13 mb-4 xl:mb-0 xl:mr-5 xl:w-50 xl:aspect-200/52 truncate xl:px-4">{xs.label}</button>
            ))
          }
        </div>

        <div className="relative w-full aspect-207/111">
          <Image fill className="object-cover" src={getStrapiMedia(section.payload?.image) ?? ""} alt="" />
        </div>
      </div>
    </div>
  )
}
