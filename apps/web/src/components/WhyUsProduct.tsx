import { CommonSection } from "cms-types";
import { Section } from "./Section";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";

export function WhyUsProduct({ section }: { section: CommonSection }) {
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
    >
      <div className="text-left mt-10 px-5 grid grid-cols-1 gap-5 xl:px-0 xl:mt-15 xl:grid-cols-3">
        {
          section.payload?.data?.map((xs, index) => (
            <div key={xs.id} className="bg-[#fafafa] rounded-xl overflow-hidden">
              <div className="relative w-full aspect-35/22">
                <Image fill className="object-cover rounded-xl" src={getStrapiMedia(xs.image) ?? ""} alt="icon" />
              </div>
              <div className="px-5 py-10">
                <p className="mb-4 text-lg font-bold leading-none">{xs.title}</p>
                <p className="text-base">{xs.desc}</p>

                {
                  xs.items?.map(item => (
                    <div key={item.id} className="mt-5">
                      <p className="text-base font-bold">{item.title}</p>
                      <p className="text-base">{item.desc}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>

    </Section>
  )
}
