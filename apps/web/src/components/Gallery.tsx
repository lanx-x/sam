import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import { mergeExtension } from "@/utils";

export function Gallery({ section }: CmpProps) {
  const extension = mergeExtension(section)
  return (
    <Section
      className="bg-[#f0f7fe] py-20"
      title={section.payload?.title!}
      desc={section.payload?.desc!}>
      <div>
        {
          section.payload?.extra_images?.map(xs => null)
        }
      </div>
    </Section>
  )

}
