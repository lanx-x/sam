import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import { Section } from "./Section";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";

export function Service({ section }: CmpProps) {
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className="bg-[#fafafa]"
    >
      <div className="text-left px-5 grid grid-cols-1 gap-5 mt-10 xl:grid-cols-3">
        {
          section.payload?.data?.map(xs => (
            <div key={xs.id} className="py-10 px-5 border border-[#bfbfbf] rounded-lg">
              <Image width={64} height={64} src={getStrapiMedia(xs.image) ?? ""} alt="icon" className="object-contain w-12 h-12 xl:w-16 xl:h-16" />
              <p className="mt-10 mb-3 text-2xl font-semibold xl:text-[32px]">{xs.title}</p>
              <p className="xl:text-base">{xs.desc}</p>

            </div>
          ))
        }
      </div>
    </Section>
  )
}
