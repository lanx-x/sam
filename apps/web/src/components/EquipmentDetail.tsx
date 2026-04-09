import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import Image from "next/image";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { getEquipment, getEquipmentCategory, getSurfaceFinish } from "@/api";
import { mergeExtension } from "@/utils";
import { Assets } from "@/assets";
import { getEnabledCategories } from "trace_events";
import { EquipmentClientList } from "./EquipmentClientList";
import { BlocksContent } from "./BlocksContent";

export async function EquipmentDetail({ documentId, section }: CmpProps) {
  const extension = mergeExtension(section)

  const data = (await getEquipment({ 'filters[documentId][$eq]': documentId })).data?.[0]

  return (
    <div className="">
      <div className="bg-[linear-gradient(180deg,#EFF2F6_0%,#FFFFFF_50%,#EFF2F6_100%)]">
        <div className="flex flex-col py-15 px-5 xl:px-0 xl:flex-row xl:w-7xl xl:mx-auto xl:py-20">
          <div className="xl:mr-40">
            <p className="leading-none text-4xl xl:text-[64px] font-semibold mb-5">{data.title}</p>
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

          <Image className="mt-10 xl:mt-0 w-full xl:w-140 aspect-56/48 object-cover" width={560} height={480} src={getStrapiMedia(data.image) ?? ""} alt="icon" />

        </div>
      </div>

      <div className="px-5 xl:px-0 xl:w-7xl xl:mx-auto">
        {data?.content && (
          <div className="mt-10 prose max-w-none">
            <BlocksContent content={data.content} />
          </div>
        )}
      </div>
    </div>
  )
}
