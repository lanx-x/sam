import { Assets } from "@/assets";
import Image, { StaticImageData } from "next/image";
import { PropsWithChildren } from "react";
import { Section } from "./Section";
import type { SectionProps } from "./Section";
import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";

export function ImageSection({ section }: CmpProps) {
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className="bg-[#fafafa]"
    >
      <Image className="w-full mt-10 px-5 xl:px-0" width={1280} height={400} src={getStrapiMedia(section.payload?.image) ?? ""} alt="section-img" />
    </Section>
  )
}

