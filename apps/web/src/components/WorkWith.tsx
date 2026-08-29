import { Section, SectionContainer } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";

export function WorkWith({ section }: CmpProps) {
  const payload = section.payload!
  return (
    <div className="relative pt-15 pb-15 px-5 xl:pt-20 xl:pb-40 xl:px-0">
      <Image alt="bg" src={getStrapiMedia(payload.image) ?? ""} fill className="object-cover -z-1" />
      <div className="text-center mb-10 xl:mb-20">
        <h2 className="text-3xl text-white font-semibold mb-5 xl:text-5xl xl:mb-4">{payload.title}</h2>
        <p className="text-sm text-white xl:text-base">{payload.desc}</p>
      </div>
      <div className="text-white grid grid-cols-2 gap-2.5 xl:grid-cols-4 xl:mx-30">
        {
          section.payload?.data?.map((xs, idx) => (
            <div className="bg-[rgba(0,0,0,0.3)] rounded-lg pt-5 pb-10 px-4 text-left min-h-16" key={xs.id}>
              <p className="text-accent font-semibold text-2xl mb-10">0{idx + 1}.</p>
              <p className="font-semibold text-base mb-3 leading-none: xl:text-lg xl:leading-5">{xs.title}</p>
              <p className="text-sm leading-none xl:text-[15px]">{xs.desc}</p>
            </div>
          ))
        }

      </div>
    </div>
  )
}
