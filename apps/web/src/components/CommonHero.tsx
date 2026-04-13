import { collectExtend } from "@/utils";
import { getStrapiMedia, } from "@/utils/strapi";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Image from "next/image";
import { ActionButton } from "./ActionButton";

export function CommonHero({ section }: CmpProps) {
  const extension = collectExtend(section.extension as any)

  return (
    <div className={`${extension['style']?.value}`}>
      <div className={`px-5 py-10 xl:py-15 text-center xl:text-left xl:px-0 xl:w-7xl xl:mx-auto`}>
        <div className="relative flex flex-col xl:flex-row xl:gap-27.5">
          <div className="mb-10 text-left xl:mb-30 flex-1">
            <h2 className="text-4xl mb-5 font-black xl:text-[64px] leading-none">{section.payload?.title}</h2>
            <p className="text-base leading-none">{section.payload?.desc}</p>
          </div>

          <Image width={580} height={420} className="shrink-0 w-full rounded-2xl xl:rounded-3xl xl:w-145 xl:h-105 object-cover" src={getStrapiMedia(section.payload?.image) ?? ""} alt="" />


          <div className="flex flex-col mt-10 xl:flex-row xl:absolute xl:left-0 xl:bottom-0">
            {
              section.payload?.actions?.map((xs, idx) => (
                <ActionButton key={idx} className="bg-primary first:bg-accent rounded-sm text-white h-13 mb-4 xl:mb-0 xl:mr-5 xl:w-50 xl:aspect-200/52 truncate xl:px-4" action={xs} />
              ))
            }
          </div>
        </div>


      </div>
    </div>
  )
}
