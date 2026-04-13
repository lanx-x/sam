import { Assets } from "@/assets";
import { SurfaceTreatment } from "cms-types";
import Image from "next/image";
import { Section } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { collectExtend, mergeExtension } from "@/utils";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Link from "next/link";

export function FeaturedSurfaceTreatment({ section, locale }: CmpProps) {
  const extension = mergeExtension(section)
  const bg_variant = extension?.bg_variant?.value === 'gray' ? 'bg-[#fafafa]' : 'bg-white'

  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className={`${bg_variant}`}
    >

      <div className="text-left grid grid-cols-2 gap-1.5 mt-10 xl:grid-cols-4 xl:gap-5 px-5 xl:px-0">
        {
          ((section.payload?.dynamic?.[0] as any)?.surface_treatments as SurfaceTreatment[])?.map((xs, idx) => (
            <SurfaceTreatmentItem item={xs} key={xs.id} locale={locale} />
          ))
        }


      </div>
    </Section>
  )
}

export function SurfaceTreatmentItem({ item, locale }: { item: SurfaceTreatment, locale: string }) {

  return (
    <Link href={`/${locale}/solutions/surface-treatment/${item.documentId}`} className="duration-300 rounded-lg overflow-hidden bg-[#fafafa] min-h-80 border border-transparent hover:border-accent cursor-pointer hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]">
      <div className="w-full aspect-305/160 relative">
        <Image fill src={getStrapiMedia(item.icon) ?? ""} alt="" className="w-full object-cover" />
      </div>
      <div className="py-6 px-5">
        <p className="text-lg font-semibold leading-none mb-2">{item.name}</p>
        <p className="leading-none xl:text-base">{item.desc}</p>
      </div>
    </Link>
  )
}
