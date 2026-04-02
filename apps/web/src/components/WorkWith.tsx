
'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Section, SectionContainer } from "./Section";
import { CommonSection } from "cms-types";
import { getStrapiMedia } from "@/utils/strapi";

export function WorkWith({ section }: { section: CommonSection }) {
  return (
    <Section
      title={section.title!}
      desc={section.desc!}
      bg={getStrapiMedia(section.image) ?? ""}
      className="text-white"
    >

      <div className="text-white pt-10 grid grid-cols-2 px-5 gap-2.5 xl:grid-cols-4 xl:pt-15">
        {
          section.data?.map((xs, idx) => (
            <div className="bg-[rgba(0,0,0,0.3)] rounded-lg pt-5 pb-10 px-4 text-left min-h-16" key={xs.id}>
              <p className="text-accent font-semibold text-2xl mb-10">0{idx + 1}.</p>
              <p className="font-semibold text-base mb-3 leading-none: xl:text-lg xl:leading-5">{xs.title}</p>
              <p className="text-sm leading-none xl:text-[15px]">{xs.desc}</p>
            </div>
          ))
        }

      </div>

    </Section>
  )
}
