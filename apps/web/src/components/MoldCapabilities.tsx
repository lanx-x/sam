'use client';

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { getStrapiMedia } from "@/utils/strapi";

type MoldCapability = {
  id: number | string;
  title?: string | null;
  desc?: string | null;
  image?: Parameters<typeof getStrapiMedia>[0];
  extension?: MoldCapabilityDetail[] | null;
};

type MoldCapabilityDetail = {
  id: number | string;
  key?: string | null;
  value?: string | null;
  desc?: string | null;
  image?: Parameters<typeof getStrapiMedia>[0];
};

type MoldCapabilitiesSection = {
  title?: string | null;
  data?: MoldCapability[] | null;
};

type MoldCapabilitiesProps = {
  section?: MoldCapabilitiesSection | null;
};

export function MoldCapabilities({ section }: MoldCapabilitiesProps) {
  const capabilities = section?.data ?? [];
  const selectId = useId();
  const categoryListRef = useRef<HTMLDivElement>(null);
  const categoryButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const safeActiveIndex = activeIndex < capabilities.length ? activeIndex : 0;
  const activeCapability = capabilities[safeActiveIndex];

  if (!section || !activeCapability) return null;

  const handleCategoryWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const categoryList = categoryListRef.current;
    if (!categoryList || categoryList.scrollWidth <= categoryList.clientWidth || event.deltaY === 0) return;

    event.preventDefault();
    categoryList.scrollLeft += event.deltaY;
  };

  const selectCategory = (index: number) => {
    setActiveIndex(index);
    categoryButtonRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div data-section="molding_capabilities" className="py-15 xl:py-25">
      <div className="px-5 xl:mx-auto xl:w-7xl xl:px-0">
        <h2 className="text-center text-3xl font-semibold xl:text-5xl">{section.title}</h2>
        <div className="mt-10 xl:mt-15">
          <div className="xl:hidden">
            <label className="sr-only" htmlFor={selectId}>Select</label>
            <div className="relative">
              <select
                id={selectId}
                value={safeActiveIndex}
                onChange={(event) => setActiveIndex(Number(event.target.value))}
                className="h-12 w-full appearance-none rounded bg-[#dfdfdf] px-5 pr-12 text-sm font-medium text-primary"
              >
                {capabilities.map((capability, index) => (
                  <option key={capability.id} value={index}>{capability.title}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-5 top-1/2 size-2 -translate-y-2/3 rotate-45 border-b border-r border-primary" />
            </div>
          </div>

          <div ref={categoryListRef} onWheel={handleCategoryWheel} className="scrollbar-hidden hidden w-full flex-row overflow-x-auto overflow-y-hidden xl:flex xl:gap-3">
            {capabilities.map((capability, index) => (
              <button
                key={capability.id}
                ref={(element) => { categoryButtonRefs.current[index] = element; }}
                type="button"
                onClick={() => selectCategory(index)}
                className={`shrink-0 h-15 px-5 text-left text-lg font-medium transition-colors border rounded-lg border-[#bfbfbf] hover:border-accent hover:bg-accent hover:text-white ${safeActiveIndex === index && "bg-accent text-white border-accent"}`}
              >
                {capability.title}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
            {activeCapability.extension?.map((detail) => (
              <div key={detail.id} className="overflow-hidden">
                {detail.image && <div className="relative aspect-350/237">
                  <Image fill src={getStrapiMedia(detail.image) ?? ""} alt={detail.key ?? ""} className="object-cover" />
                </div>}
                <h4 className="mt-5 text-xl font-bold text-primary">{detail.key}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
