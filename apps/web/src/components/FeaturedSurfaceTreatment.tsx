import { Assets } from "@/assets";
import { SurfaceTreatment } from "cms-types";
import Image from "next/image";
import { Section } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { collectExtend } from "@/utils";
import { CmpProps } from "@/app/[lang]/[[...slug]]/page";

export function FeaturedSurfaceTreatment({ section }: CmpProps) {
  const extension = collectExtend(section.payload?.extension as any, section.extension as any)
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className={`${extension['style']?.value}`}
    >

      <div className="text-left grid grid-cols-2 gap-1.5 mt-10 xl:grid-cols-4 xl:gap-5">
        {
          section.payload?.dynamic?.[0]?.surface_treatments?.map((xs, idx) => (
            <SurfaceTreatmentItem item={xs} key={xs.id} />
          ))
        }


      </div>
    </Section>
  )
}

export function SurfaceTreatmentItem({ item }: { item: SurfaceTreatment }) {

  return (

    <div className="rounded-lg overflow-hidden bg-[#fafafa] min-h-80 border border-transparent hover:border-accent cursor-pointer">
      <div className="w-full aspect-305/160 relative">
        <Image fill src={getStrapiMedia(item.icon) ?? ""} alt="" className="w-full object-cover" />
      </div>
      <div className="py-6 px-5">
        <p className="text-lg font-semibold leading-none mb-2">{item.name}</p>
        <p className="leading-none xl:text-base">{item.desc}</p>
      </div>
    </div>
  )
}
