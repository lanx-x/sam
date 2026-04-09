"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import { ActionButton } from "./ActionButton";

const ROTATE_INTERVAL = 3000;

export function MainHero({ section, locale }: CmpProps) {
  const items = section.payload?.data ?? []

  const [activeIndex, setActiveIndex] = useState(0);

  const animationName = useMemo(
    () => `banner-progress-${activeIndex}`,
    [activeIndex],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, ROTATE_INTERVAL);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeIndex, items.length]);


  return (
    <div className="relative">
      {
        items.map((item, idx) => (
          <Image key={item.id} src={getStrapiMedia(item.image) ?? ""} alt="banner" fill className={`object-cover object-[70%_20%] transition-opacity duration-900 ${activeIndex === idx ? "opacity-100" : "opacity-0"}`} />
        ))
      }
      <div className="absolute inset-0 bg-[linear-gradient(278deg,rgba(0,35,70,0)_31.39%,#001123_100%)]" />
      <div className="relative pt-20 px-5 xl:w-7xl xl:px-0 xl:mx-auto">
        <h2 className="text-4xl font-black text-white mb-10 max-w-87.5 xl:text-[64px] xl:max-w-140">{section?.payload?.title}</h2>

        <div>
          <div className="flex flex-col xl:flex-row">
            <style>{`@keyframes ${animationName} { from { width: 0%; } to { width: 100%; } }`}</style>
            {
              items.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className="block w-fit max-w-full text-left mb-4 xl:mb-10 xl:mr-5"
                    onClick={() => setActiveIndex(index)}
                  >
                    <p className="text-secondary font-medium mb-1 leading-none xl:text-base">{item.title}</p>
                    <div className={`h-0.5 w-full overflow-hidden rounded-full bg-[#d9d9d9] transition-opacity duration-400 ${isActive ? "opacity-100" : "opacity-0"}`} >
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{
                          // width: isActive ? "100%" : "0%",
                          animation: isActive ? `${animationName} ${ROTATE_INTERVAL}ms linear forwards` : "none",
                        }}
                      />
                    </div>
                  </button>
                );
              })}

          </div>
          <p className="text-white text-sm min-h-20 xl:max-w-128 xl:min-h-0 xl:text-base">
            {items[activeIndex]?.desc}
          </p>
        </div>

        <div className="flex mt-20 pb-29 flex-row gap-3 xl:gap-5 xl:pb-34.5 xl:justify-start xl:mt-10">
          {
            section.payload?.actions?.map(xs => (
              <ActionButton locale={locale} key={xs.id} action={xs} className="w-full h-12 flex items-center justify-center bg-white first:bg-accent rounded-sm first:text-white text-primary font-medium truncate xl:w-50 xl:h-13 xl:mr-5 xl:text-base" />
            ))
          }
        </div>
      </div>

    </div>
  );
}
