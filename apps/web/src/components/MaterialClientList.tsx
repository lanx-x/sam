'use client';

import Image from "next/image";
import Link from "next/link";
import { SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { Assets } from "@/assets";
import { getMaterial, getMaterialCategory } from "@/api";
import { Site } from "cms-types";

type Props = {
  categories: Awaited<ReturnType<typeof getMaterialCategory>>,
  materials: Awaited<ReturnType<typeof getMaterial>>,
  basePath: string,
  emptyText?: string,
  siteData: Site
}

export function MaterialClientList({ categories, materials, basePath, emptyText, siteData }: Props) {
  // Group all materials by category
  const grouped = materials.data.reduce<Record<string, { name: string; items: typeof materials.data }>>((acc, xs) => {
    const catId = (xs.category as any)?.documentId ?? 'uncategorized'
    const catName = (xs.category as any)?.name ?? 'Uncategorized'
    if (!acc[catId]) {
      acc[catId] = { name: catName, items: [] }
    }
    acc[catId].items.push(xs)
    return acc
  }, {})

  const categoryList = categories.data?.filter(xs => !xs.isAll) ?? []

  const displayText = siteData.display_text?.material

  const scrollToCategory = (id: string) => {
    document.getElementById(`material-category-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToAll = () => {
    document.getElementById('material-category-all')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const gridOpts = "grid gap-5 xl:gap-10 grid-cols-[80px_80px_1fr] xl:grid-cols-[140px_120px_1fr]  items-center"

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-20 min-h-150">
        <div className="hidden xl:block xl:w-60 xl:-mt-16">
          {
            categories.data?.filter(xs => xs.isAll)?.map(xs => (
              <div
                onClick={scrollToAll}
                key={xs.documentId}
                className="cursor-pointer relative h-16 flex justify-start items-center overflow-hidden text-base font-semibold">
                <Image fill src={Assets.EquipListBg} alt="" />
                <p className="relative z-10 text-white truncate px-5">{xs.name}</p>
              </div>
            ))
          }
          {
            categoryList.map((xs) => (
              <div
                onClick={() => scrollToCategory(xs.documentId)}
                key={xs.documentId}
                className="cursor-pointer text-base h-16 flex justify-start items-center border-b border-[#efefef] font-medium text-left px-5 duration-300 transition-colors hover:text-accent"
              >
                {xs.name}
              </div>
            ))
          }
        </div>

        <div className="pt-10 px-5 xl:px-0">
          <div id="material-category-all">
            {categoryList.map((cat) => {
              const items = grouped[cat.documentId]
              return (
                <div key={cat.documentId} id={`material-category-${cat.documentId}`} className="mb-15 scroll-mt-30">
                  <p className="text-2xl font-semibold leading-none mb-8.5">{cat.name}</p>
                  {!items || items.items.length === 0 ? (
                    <div className="flex items-center justify-center py-15 text-secondary/50 text-base">
                      {emptyText ?? 'No materials in this category'}
                    </div>
                  ) : (
                    <>
                      <div className={`bg-white h-12 text-secondary text-left text-base xl:text-lg font-bold ${gridOpts} border-[#bfbfbf] border-b`}>
                        <p className="xl:pl-5">{displayText?.materials ?? 'Materials'}</p>
                        <p></p>
                        <p className="">{displayText?.desc ?? 'Description'}</p>
                      </div>
                      {items.items.map((xs) => (
                        <Link key={xs.documentId} href={`${basePath}/${xs.documentId}`} className={`${gridOpts} py-2.5 border-b border-[#bfbfbf] hover:bg-[#f7fbfe] duration-300 transition-colors cursor-pointer`}>
                          <div className="xl:pl-5 aspect-square w-20 xl:w-30 relative">
                            <Image fill src={getStrapiMedia(xs.icon) ?? ""} className="w-30 h-30 rounded-lg object-cover" alt="" />
                          </div>
                          <p className="text-base xl:text-lg font-bold">{xs.name}</p>
                          <p className="text-base">{xs.desc}</p>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
