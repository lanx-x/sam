'use client';

import { Assets } from "@/assets";
import Image, { StaticImageData } from "next/image";
import { PropsWithChildren } from "react";
import { Section } from "./Section";
import type { SectionProps } from "./Section";
import { CommonSection } from "cms-types";
import { getStrapiMedia } from "@/utils/strapi";

export function ImageSection({ section }: { section: CommonSection }) {
  return (
    <Section
      title={section.title!}
      desc={section.desc!}
      className="bg-[#fafafa]"
    >
      <Image className="w-full mt-10 px-5 xl:px-0" width={1280} height={400} src={getStrapiMedia(section.image) ?? ""} alt="section-img" />
    </Section>
  )
}

