import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { createLocalizedApi } from "@/api";
import Image from "next/image";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { mergeExtension } from "@/utils";
import { Assets } from "@/assets";
import { getEnabledCategories } from "trace_events";
import { EquipmentClientList } from "./EquipmentClientList";
import { BlocksContent } from "./BlocksContent";

export async function EquipmentDetail({ documentId, section, locale }: CmpProps) {
  const api = createLocalizedApi(locale);
  const extension = mergeExtension(section)

  const data = (await api.getEquipmentDetail({ 'filters[documentId][$eq]': documentId })).data?.[0]

  return (
    <div className="">
      <div className="bg-[linear-gradient(180deg,#EFF2F6_0%,#FFFFFF_50%,#EFF2F6_100%)]">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-35 py-15 px-5 xl:px-0 xl:w-7xl xl:mx-auto xl:py-20">
          <div className="">
            <p className="leading-none text-4xl xl:text-[64px] font-semibold mb-5">{data.name}</p>
            <p className="text-sm xl:text-base leading-5">{data.desc}</p>
            <div className="mt-7.5 xl:mt-9 xl:w-120">
              {
                data.parameter?.map((xs, idx) => (
                  <div key={idx} className="border-b border-[#bfbfbf] h-10 grid grid-cols-2 items-center first:border-t px-2 text-base">
                    <span>{xs.key}:</span>
                    <span>{xs.value}</span>
                  </div>
                ))
              }

            </div>

          </div>

          <Image className="mt-10 xl:mt-0 w-full xl:w-145 aspect-58/48 object-cover" width={580} height={480} src={getStrapiMedia(data.image) ?? ""} alt="icon" />

        </div>
      </div>

      <div className="px-5 xl:px-0 xl:w-7xl xl:mx-auto">
        {data?.content && (
          <div className="mt-15 mb-20 prose max-w-none xl:mt-35 xl:mb-58">
            <BlocksContent content={data.content} />
          </div>
        )}
      </div>
    </div>
  )
}
