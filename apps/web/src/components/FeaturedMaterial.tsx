'use client';

import Image from "next/image";
import { useState } from "react";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import type { Material } from "cms-types";

export function FeaturedMaterial({ section }: CmpProps) {
  const payload = section.payload!
  const materials = ((section.payload?.dynamic?.[0] as { materials?: Material[] } | undefined)?.materials ?? []);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMaterial = materials[activeIndex] ?? materials[0];

  return (
    <div className="py-15 bg-[#fafafa] xl:py-20">
      <div className="px-5 xl:px-0 xl:mx-auto xl:w-7xl">
        <h2 className="text-3xl font-semibold text-center xl:text-5xl xl:font-semibold">{payload.title}</h2>
        <p className="text-sm text-center mt-3 xl:mt-4 xl:text-base">{payload.desc}</p>
        <div className="mt-10 xl:mt-15">
          <div className="xl:hidden mb-10">
            <label className="sr-only" htmlFor={`material-select-${section.id}`}>Materials</label>
          <div className="relative">
            <select
              id={`material-select-${section.id}`}
              value={activeIndex}
              onChange={(event) => setActiveIndex(Number(event.target.value))}
              className="h-12 w-full appearance-none rounded bg-[#dfdfdf] px-5 pr-12 text-sm font-medium text-primary"
            >
                {materials.map((material, index) => (
                  <option key={material.id ?? index} value={index}>{material.name}</option>
                ))}
            </select>
            <span className="pointer-events-none absolute right-5 top-1/2 size-2 -translate-y-2/3 rotate-45 border-b border-r border-primary" />
          </div>
          </div>

          {activeMaterial && (
            <div className="overflow-hidden rounded-lg bg-white text-left xl:mx-auto xl:grid xl:h-185 xl:grid-cols-[320px_1fr]">
              <aside className="hidden bg-[#f1f1f1] xl:block">
                <p className="flex h-16 items-center bg-[#f1f1f1] px-5 text-xl font-bold text-primary">Materials</p>
                <div className="h-169 overflow-y-auto">
                  {materials.map((material, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={material.id ?? index}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`flex h-13 w-full items-center px-5 text-left text-lg leading-5 transition-colors ${isActive ? "bg-[#eae9e9] font-bold text-accent" : "bg-[#f1f1f1] text-primary hover:bg-[#eae9e9]"}`}
                      >
                        {material.name}
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div className="xl:grid xl:grid-rows-[100px_1fr]">
                <div className="hidden border-b border-[#efefef] px-10 xl:flex xl:items-center">
                  <span className="flex h-13 w-40 items-center rounded-lg bg-accent px-5 text-lg font-medium text-white">
                    {activeMaterial.name}
                  </span>
                </div>

                <div className="xl:grid xl:grid-cols-[440px_1fr]">
                  <div className="relative aspect-3/2 rounded-lg overflow-hidden xl:m-10 xl:aspect-auto xl:h-60 xl:w-90">
                    <Image
                      fill
                      src={getStrapiMedia(activeMaterial.image ?? activeMaterial.icon) ?? ""}
                      alt={activeMaterial.name ?? ""}
                      className="object-cover"
                    />
                  </div>
                  <div className="border-t border-[#efefef] py-10 xl:border-l xl:border-t-0 xl:border-[#efefef] xl:px-10 xl:py-10">
                    <h3 className="text-xl font-bold leading-6 text-primary">{activeMaterial.name}</h3>
                    <p className="mt-5 text-base leading-5.5 text-primary">{activeMaterial.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

}
