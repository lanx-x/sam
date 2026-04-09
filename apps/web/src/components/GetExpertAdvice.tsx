import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Section } from "./Section";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";
import { collectExtend, mergeExtension } from "@/utils";

export function GetExpertAdvice({ section }: CmpProps) {

  const extension = mergeExtension(section)
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className="bg-[#fafafa]"
    >
      <div className="mt-10 px-5 xl:mt-15">
        <div className="flex flex-col justify-center items-center mb-8 xl:flex-row xl:mb-10">
          {
            section.payload?.actions?.map(xs => (
              <button key={xs.id} className="bg-primary first:bg-accent w-full h-13 text-white mb-4 xl:mb-0 xl:mr-4 xl:w-50">
                {xs.label}
              </button>
            ))
          }
        </div>

        <p className="text-secondary">{extension['declare']?.value}</p>

      </div>

    </Section>
  )
}
