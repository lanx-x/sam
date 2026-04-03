import { Section } from "./Section";
import { Subscribe } from "./Subscribe";
import { CommonSection } from "cms-types";
import { getStrapiMedia } from "@/utils/strapi";

export function GetInTouch({ section }: { section: CommonSection }) {
  return (
    <Section
      title={section.title!}
      desc={section.desc!}
      className="text-white"
      bg={getStrapiMedia(section.image) ?? ""}
    >
      <div className="relative w-full px-5 mt-15">
        <Subscribe className="xl:w-145 xl:mx-auto" />
      </div>
    </Section>
  )
}
