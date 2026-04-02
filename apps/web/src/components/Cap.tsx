'use client';

import Image from "next/image";
import { Assets } from "@/assets";
import { Hero } from "./_components/Hero";
import { OneStop } from "./_components/OneStop";
import { CustomerStory, Equipment, FAQ, SayAbout, Specification, WorkShop, WorkWith } from "./_components/Misc";
import { getHomePage, type HomePageData } from "@/api";
import { getStrapiMedia } from "@/utils/strapi";
import { defaultLocale, isLocale } from "@/i18n";
import type { CapItemData, CapSectionData, CommonSection, StatItemData } from "cms-types";
import { Section } from "./Section";

type StatDisplayItem = Pick<StatItemData, "label" | "value" | "image">;
type CapDisplayItem = Pick<CapItemData, "label" | "desc" | "image">;

export function Cap({ section }: { section: CommonSection }) {
  return (
    <Section
      title={section.title!}
      desc={section.desc!}>
      <div className="flex flex-col mt-10 xl:w-7xl xl:mx-auto xl:flex-row">
        {
          section.data?.map((xs, idx) => {
            const imageUrl = getStrapiMedia(xs.image) || Assets.Cap;
            return (
              <div key={xs.id} className="group w-full aspect-35/16 relative xl:w-80 xl:h-120">
                <Image src={imageUrl} alt="cap" fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,35,70,0)_0%,#001123_100%)]" />
                <div className="px-5 relative w-full h-full flex flex-col group-hover:hidden">
                  <h3 className="text-white text-2xl font-semibold mb-10 mt-auto truncate">{xs.title}</h3>
                </div>
                <div className="absolute inset-0 bg-[rgba(0,118,238,0.90)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="h-full w-full px-5 pt-30 pb-12 text-left flex flex-col">
                    <p className="font-semibold text-2xl/none text-white mb-8">{xs.title}</p>
                    <p className="text-white text-sm leading-4.5 flex-1">{xs.desc}</p>
                    <div className="text-white font-medium text-base flex flex-row items-center">
                      <span>{xs.label}</span>
                      <Image src={Assets.LinkWhite} alt="link" className="ml-3" />

                    </div>
                  </div>
                </div>

              </div>
            )
          })
        }
      </div>
    </Section>
  )
}
