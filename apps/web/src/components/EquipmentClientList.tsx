'use client';

import { CommonSection, EquipmentCategoryList } from "cms-types";
import Image from "next/image";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { getEquipment, getEquipmentCategory, getSurfaceFinish } from "@/api";
import { mergeExtension } from "@/utils";
import { Assets } from "@/assets";
import { getEnabledCategories } from "trace_events";
import { useState } from "react";

type Props = {
  categories: Awaited<ReturnType<typeof getEquipmentCategory>>,
  equipments: Awaited<ReturnType<typeof getEquipment>>,
}
export function EquipmentClientList(props: Props) {

  const { categories, equipments } = props
  const [category, setCategory] = useState<null | number>(null)
  return (
    <SectionContainer>
      <div className="grid grid-cols-[240px_1fr] gap-20">
        <div className="w-60 -mt-16">
          <div
            onClick={() => setCategory(null)}
            className="cursor-pointer relative h-16 flex justify-start items-center overflow-hidden text-base font-semibold">
            <Image fill src={Assets.EquipListBg} alt="" />
            <p className="relative z-10 text-white truncate px-5">All Equipment</p>
          </div>

          {
            categories.data?.map((xs, idx) => (
              <div onClick={() => setCategory(Number(xs.id))} key={idx} className={`cursor-pointer text-base h-16 flex justify-start items-center border-b border-[#efefef] font-medium text-left px-5 ${category === xs.id ? 'text-accent' : ''} duration-300 transition-colors hover:text-accent`}>
                {xs.name}
              </div>
            ))
          }
        </div>


        <div>
          {
            equipments.data.filter(xs => category ? xs.category?.id === category : true).map((xs, idx) => (
              <div key={idx} className="relative flex flex-row justify-start py-7.5 pr-10 hover:bg-[#f0f7fe] border-b border-b-[#efefef] hover:border-b-[#f0f7fe] duration-300 transition-colors">
                <Image width={360} height={260} src={getStrapiMedia(xs.image) ?? ""} className="w-90 h-65" alt="icon" />
                <div className="ml-10 pb-10 relative">
                  <p className="leading-none text-2xl font-semibold mb-2">{xs.title}</p>
                  <p className="text-base leading-5">{xs.desc}</p>


                  <div className="mt-2 text-sm">
                    {
                      xs.parameter?.map((item, idx) => (
                        <div key={idx}>
                          <span className="text-secondary">{item.key}: </span>
                          <span>{item.value}</span>

                        </div>
                      ))
                    }
                  </div>

                  <div className="flex items-center absolute bottom-0 left-0">
                    <p className="mr-3 text-sm text-accent font-medium">View Details</p>
                    <Image src={Assets.LinkCircle} alt="arrow" />
                  </div>
                </div>

              </div>
            ))
          }

        </div>
      </div>
    </SectionContainer>
  )
}
