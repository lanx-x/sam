import { CommonSection } from "cms-types";
import { Section } from "./Section";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";

export function WhyUs({ section }: { section: CommonSection }) {
  return (
    <Section
      title={section.title!}
      desc={section.desc!}
    >
      <div className="text-left mt-10 px-5 grid grid-cols-1 gap-5 xl:px-0 xl:mt-15 xl:grid-cols-3">
        {
          section.data?.map((xs, index) => (
            <div key={xs.id} className="bg-[#fafafa] min-h-55 py-8 px-5 xl:px-10 xl:py-10">
              <Image className="object-cover w-10 aspect-square xl:w-16" width={68} height={68} src={getStrapiMedia(xs.image) ?? ""} alt="icon" />
              <p className="mt-8 mb-3 text-lg font-semibold leading-none xl:mt-10 xl:mb-4">{xs.title}</p>
              <p className="text-sm">{xs.desc}</p>
            </div>
          ))
        }
      </div>

    </Section>
  )
}
