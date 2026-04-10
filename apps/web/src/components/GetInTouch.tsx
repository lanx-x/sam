import { Section } from "./Section";
import { Subscribe } from "./Subscribe";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";

export function GetInTouch({ section, siteData }: CmpProps) {
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className="text-white"
      bg={getStrapiMedia(section.payload?.image) ?? ""}
    >
      <div className="relative w-full px-5 mt-15">
        <Subscribe className="xl:w-145 xl:mx-auto" placeholder={siteData.display_text?.subscribe?.placeholder!} label={siteData.display_text?.subscribe?.subscribe!} />
      </div>
    </Section>
  )
}
