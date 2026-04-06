import { Section } from "./Section";
import { Subscribe } from "./Subscribe";
import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";

export function GetInTouch({ section }: CmpProps) {
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className="text-white"
      bg={getStrapiMedia(section.payload?.image) ?? ""}
    >
      <div className="relative w-full px-5 mt-15">
        <Subscribe className="xl:w-145 xl:mx-auto" />
      </div>
    </Section>
  )
}
