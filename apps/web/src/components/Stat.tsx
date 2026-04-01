
import Image from "next/image";
import { Assets } from "@/assets";
import { Hero } from "./_components/Hero";
import { OneStop } from "./_components/OneStop";
import { CustomerStory, Equipment, FAQ, SayAbout, Specification, WorkShop, WorkWith } from "./_components/Misc";
import { getHomePage, type HomePageData } from "@/api";
import { getStrapiMedia } from "@/utils/strapi";
import { defaultLocale, isLocale } from "@/i18n";
import type { CapItemData, CapSectionData, StatItemData } from "cms-types";

type StatDisplayItem = Pick<StatItemData, "label" | "value" | "image">;
type CapDisplayItem = Pick<CapItemData, "label" | "desc" | "image">;

export function Stat({ stats }: { stats?: StatItemData[] }) {
  const data: StatDisplayItem[] = stats ?? []

  return (
    <div className="pt-10  border-b border-[#efefef] xl:py-9">
      <div className="flex flex-row flex-wrap xl:w-7xl xl:mx-auto">
        {
          data.map((xs, idx) => {
            const iconUrl = getStrapiMedia(xs.image);
            return (
              <div key={idx} className="flex flex-col overflow-hidden px-5 text-left w-1/2 truncate mb-10 xl:mb-0 xl:w-60 xl:mx-2 xl:items-center">
                {iconUrl ? <Image className="w-12.75 h-10.5 xl:w-17 xl:h-14" src={iconUrl} alt="icon" width={68} height={56} /> : <p className="leading-none text-4xl font-semibold truncate shrink-0 xl:text-5xl xl:h-14">{xs.value}</p>}
                <p className="truncate font-medium mt-4 shrink-0 xl:text-base xl:mt-3">{xs.label}</p>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}
