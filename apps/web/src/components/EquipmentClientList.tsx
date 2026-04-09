'use client';

import { CommonSection, EquipmentCategory } from "cms-types";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { getEquipment, getEquipmentCategory } from "@/api";
import { mergeExtension } from "@/utils";
import { Assets } from "@/assets";
import { getEnabledCategories } from "trace_events";
import { useState } from "react";

type Props = {
  categories: Awaited<ReturnType<typeof getEquipmentCategory>>,
  equipments: Awaited<ReturnType<typeof getEquipment>>,
  basePath: string,
}
export function EquipmentClientList(props: Props) {

  const { categories, equipments, basePath } = props
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(undefined)
  return (
    <SectionContainer>
      <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-20">
        <div className="hidden xl:block w-60 -mt-16">
          {
            categories.data?.filter(xs => xs.isAll)?.map(xs => (
              <div
                onClick={() => setActiveCategoryId(undefined)}
                key={xs.documentId}
                className="cursor-pointer relative h-16 flex justify-start items-center overflow-hidden text-base font-semibold">
                <Image fill src={Assets.EquipListBg} alt="" />
                <p className="relative z-10 text-white truncate px-5">{xs.name}</p>
              </div>
            ))
          }
          {
            categories.data?.filter(xs => !xs.isAll)?.map((xs) => {
              const docId = xs.documentId
              const isAll = (xs as any).isAll
              const isActive = isAll ? !activeCategoryId : activeCategoryId === docId
              return (
                <div
                  onClick={() => setActiveCategoryId(docId)}
                  key={docId}
                  className={`cursor-pointer text-base h-16 flex justify-start items-center border-b border-[#efefef] font-medium text-left px-5 ${isActive ? 'text-accent' : ''} duration-300 transition-colors hover:text-accent`}>
                  {xs.name}
                </div>
              )
            })
          }
        </div>


        <div className="px-5 pb-10 xl:px-0">
          {
            equipments.data.filter(xs => activeCategoryId ? (xs.category as any)?.documentId === activeCategoryId : true).map((xs, idx) => (
              <Link key={xs.documentId} href={`${basePath}/${xs.documentId}`} className="relative flex flex-col xl:flex-row justify-start py-7.5 xl:pr-10 hover:bg-[#f0f7fe] border-b border-b-[#efefef] hover:border-b-[#f0f7fe] duration-300 transition-colors cursor-pointer">
                <div className="relative w-90 h-65 shrink-0 overflow-hidden">
                  <Image fill className="object-cover -z-10" src={Assets.EquipBase} alt="" />
                  <Image width={360} height={260} src={getStrapiMedia(xs.image) ?? ""} className="w-90 h-65 object-contain" alt="icon" />
                </div>
                <div className="mt-5 xl:mt-0 xl:ml-10 pb-10 relative">
                  <p className="leading-none text-2xl font-semibold mb-2">{xs.name}</p>
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

              </Link>
            ))
          }

        </div>
      </div>
    </SectionContainer>
  )
}
