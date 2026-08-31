import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import { mergeExtension } from "@/utils";

export function PartnerStory({ section }: CmpProps) {
  const extension = mergeExtension(section)
  return (
    <Section
      className="xl:py-20 py-10"
      title={section.payload?.title!}
      desc={""}>
      <div className="px-5 xl:px-0 grid grid-cols-2 xl:grid-cols-6 gap-4 xl:mt-12 mt-10">
        {
          section.payload?.extra_images?.map(xs => (
            <div key={xs.id} className="relative flex justify-center items-center border border-[#bfbfbf] bg-[#fafafa] rounded-xl h-16.5 xl:h-20">
              <div className="w-8/10 h-8/10 relative overflow-hidden">
                <Image src={getStrapiMedia(xs) ?? ""} alt="" fill className="object-contain transition-transform duration-300 hover:scale-120" />
              </div>
            </div>
          ))
        }
      </div>
    </Section>
  )

}
