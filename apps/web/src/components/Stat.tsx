
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";
import type { CommonSection } from "cms-types";
import { SectionContainer } from "./Section";
import { PropsWithChildren } from "react";

type Props = {
  border?: boolean
  section: CommonSection
}

const colsMap: Record<number, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
};


export function Stat({ border, section }: PropsWithChildren<Props>) {
  return (
    <div className="py-10  border-b border-[#efefef] xl:py-9">
      <SectionContainer>
        <div className={`grid grid-cols-2 overflow-hidden ${colsMap[Math.min(5, section.data?.length ?? 1)]}  gap-y-10`}>
          {
            section.data?.map(xs => {
              const iconUrl = getStrapiMedia(xs.image);
              return (
                <div key={xs.id} className="group relative flex flex-row items-center justify-center">
                  <div className="w-full flex flex-col  px-5 text-left justify-center truncate xl:items-center">
                    {iconUrl ? <Image className="w-12.75 h-10.5 xl:w-17 xl:h-14" src={iconUrl} alt="icon" width={68} height={56} /> : <p className="leading-none text-4xl font-semibold truncate shrink-0 xl:text-5xl xl:h-14">{xs.desc}</p>}
                    <p className="truncate font-medium mt-4 shrink-0 xl:text-base xl:mt-3">{xs.title}</p>
                  </div>
                  {border ? <div className="absolute -right-px invisible xl:visible xl:border-r xl:h-12 group-[5]:invisible border-[#efefef] group-last:invisible"></div> : null}
                </div>
              )
            })
          }
        </div>
      </SectionContainer>

    </div>
  )
}
