
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";
import type { StatItemData } from "cms-types";
import { SectionContainer } from "./Section";
import { PropsWithChildren } from "react";

type StatDisplayItem = Pick<StatItemData, "label" | "value" | "image">;

type Props = {
  border?: boolean
  data: StatDisplayItem[]
}

export function Stat(props: PropsWithChildren<Props>) {
  const data = [...props.data, ...props.data].slice(0, 8)
  return (
    <div className="py-10  border-b border-[#efefef] xl:py-9">
      <SectionContainer>
        <div className={`grid grid-cols-2 overflow-hidden xl:grid-cols-${Math.min(5, data.length)} gap-y-10`}>
          {
            data.map((xs, idx) => {
              const iconUrl = getStrapiMedia(xs.image);
              return (
                <div key={idx} className="group relative flex flex-row items-center justify-center">
                  <div className="w-full flex flex-col  px-5 text-left justify-center truncate xl:items-center">
                    {iconUrl ? <Image className="w-12.75 h-10.5 xl:w-17 xl:h-14" src={iconUrl} alt="icon" width={68} height={56} /> : <p className="leading-none text-4xl font-semibold truncate shrink-0 xl:text-5xl xl:h-14">{xs.value}</p>}
                    <p className="truncate font-medium mt-4 shrink-0 xl:text-base xl:mt-3">{xs.label}</p>
                  </div>
                  {props.border ? <div className="absolute -right-px invisible xl:visible xl:border-r xl:h-12 group-[5]:invisible border-[#efefef] group-last:invisible"></div> : null}
                </div>
              )
            })
          }
        </div>
      </SectionContainer>

    </div>
  )
}
