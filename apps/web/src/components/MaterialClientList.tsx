'use client';

import Image from "next/image";
import { SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { Assets } from "@/assets";
import { useState } from "react";
import { getMaterial, getMaterialCategory } from "@/api";

type Props = {
  categories: Awaited<ReturnType<typeof getMaterialCategory>>,
  materials: Awaited<ReturnType<typeof getMaterial>>,
}

export function MaterialClientList({ categories, materials }: Props) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(undefined)

  const filtered = activeCategoryId
    ? materials.data.filter(xs => (xs.category as any)?.documentId === activeCategoryId)
    : materials.data

  // Group by category
  const grouped = filtered.reduce<Record<string, { name: string; items: typeof filtered }>>((acc, xs) => {
    const catId = (xs.category as any)?.documentId ?? 'uncategorized'
    const catName = (xs.category as any)?.name ?? 'Uncategorized'
    if (!acc[catId]) {
      acc[catId] = { name: catName, items: [] }
    }
    acc[catId].items.push(xs)
    return acc
  }, {})

  const gridOpts = "grid gap-5 xl:gap-10 grid-cols-[80px_80px_1fr] xl:grid-cols-[140px_120px_1fr]  items-center"

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-20 min-h-150">
        <div className="hidden xl:block xl:w-60 xl:-mt-16">
          {
            categories.data?.map((xs) => {
              const docId = xs.documentId
              const isAll = (xs as any).isAll
              const isActive = isAll ? !activeCategoryId : activeCategoryId === docId
              return isAll ? (
                <div
                  onClick={() => setActiveCategoryId(undefined)}
                  key={docId}
                  className="cursor-pointer relative h-16 flex justify-start items-center overflow-hidden text-base font-semibold">
                  <Image fill src={Assets.EquipListBg} alt="" />
                  <p className="relative z-10 text-white truncate px-5">{xs.name}</p>
                </div>
              ) : (
                <div
                  onClick={() => setActiveCategoryId(docId)}
                  key={docId}
                  className={`cursor-pointer text-base h-16 flex justify-start items-center border-b border-[#efefef] font-medium text-left px-5 ${isActive ? 'text-accent' : ''} duration-300 transition-colors hover:text-accent`}
                >
                  {xs.name}
                </div>
              )
            })
          }
        </div>

        <div className="pt-10 px-5 xl:px-0">
          {Object.values(grouped).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-30 text-secondary">
              <svg className="w-20 h-20 mb-6 opacity-30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="12" width="48" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
                <path d="M8 20h48" stroke="currentColor" strokeWidth="2" />
                <circle cx="14" cy="16" r="1.5" fill="currentColor" />
                <circle cx="19" cy="16" r="1.5" fill="currentColor" />
                <circle cx="24" cy="16" r="1.5" fill="currentColor" />
                <path d="M20 30h24M20 36h16M20 42h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="text-lg font-medium">No materials found</p>
              <p className="text-sm mt-2">There are no materials in this category yet.</p>
            </div>
          ) : (
            Object.values(grouped).map(({ name, items }) => (
              <div key={name} className="mb-15">
                <p className="text-2xl font-semibold leading-none mb-8.5">{name}</p>
                <div className={`bg-white h-12 text-secondary text-left text-base xl:text-lg font-bold ${gridOpts} border-[#bfbfbf] border-b`}>
                  <p className="xl:pl-5">Materials</p>
                  <p></p>
                  <p className="">Description</p>
                </div>
                {items.map((xs, idx) => (
                  <div key={xs.documentId} className={`${gridOpts} py-2.5 border-b border-[#bfbfbf] hover:bg-[#f7fbfe] duration-300 transition-colors`}>
                    <div className="xl:pl-5 aspect-square w-20 xl:w-30 relative">
                      <Image fill src={getStrapiMedia(xs.image) ?? ""} className="w-30 h-30 rounded-lg object-cover" alt="" />
                    </div>
                    <p className="text-base xl:text-lg font-bold">{xs.name}</p>
                    <p className="text-base">{xs.desc}</p>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </SectionContainer>
  )
}
