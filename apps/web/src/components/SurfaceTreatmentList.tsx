import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Image from "next/image";
import { Section } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { createLocalizedApi } from "@/api";
import { mergeExtension } from "@/utils";
import Link from "next/link";

function uniqueCate(cate: any[]) {
  const set = new Set(cate.filter(Boolean).map((xs) => xs.trim()))
  return Array.from(set).join(', ')

}

export async function SurfaceTreatmentList({ section, locale, slug, siteData }: CmpProps) {
  const api = createLocalizedApi(locale);
  const extension = mergeExtension(section)

  const data = await api.getSurfaceTreatment({})
  const basePath = ['', locale, ...slug].join('/')


  const share = "grid items-center xl:gap-10 justify-items-left grid-cols-1 xl:grid-cols-[160px_1fr_2fr_1fr_1fr] border-b border-[#bfbfbf] text-left";
  const displayText = siteData.display_text?.surface_treatment
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className={extension['style']?.value}
    >
      <div className="px-5 xl:px-0">
        <div className={`text-lg font-bold py-6 text-secondary ${share} hidden xl:grid`}>
          <p>{displayText?.surface_treatment ?? 'Surface Finishes'}</p>
          <p></p>
          <p>{displayText?.desc ?? 'Description'}</p>
          <p>{displayText?.services ?? 'Services'}</p>
          <p>{displayText?.applicable_materials ?? 'Applicable Materials'}</p>
        </div>


        {
          data.data.map((xs) => (
            <div key={xs.id} className={``}>
              <Link target="_blank" className={`block duration-300 transition-colors hover:bg-[rgba(0,118,238,0.06)] group`} href={`${basePath}/${xs.documentId}`}>
                <div className={`hidden xl:grid xl:min-h-35 my-2.5 ${share}`}>
                  <Image className="w-30 aspect-square object-cover" src={getStrapiMedia(xs.icon) ?? ""} width={120} height={120} alt="icon" />
                  <p className="group-hover:text-accent text-left font-bold text-lg">{xs.name}</p>
                  <p className="text-base">{xs.desc}</p>
                  <p>{xs.services}</p>
                  <p>{uniqueCate(xs.materials?.map(xs => xs.category?.name) ?? [])}</p>
                </div>

                <div className="xl:hidden grid grid-cols-[1fr_210px] grid-rows-4 text-left items-center border-t border-[#bfbfbf] gap-y-2 py-2.5">
                  <p className="text-base font-bold text-secondary">{displayText?.surface_treatment ?? 'Surface Finishes'}</p>
                  <div className="flex items-center gap-2">
                    <Image className="w-20 aspect-square object-cover" src={getStrapiMedia(xs.icon) ?? ""} width={80} height={80} alt="icon" />
                    <p className="group-hover:text-accent text-left font-bold text-base">{xs.name}</p>
                  </div>

                  <p className="text-base font-bold text-secondary">{displayText?.desc ?? 'Description'}</p>
                  <p className="text-sm">{xs.desc}</p>

                  <p className="text-base font-bold text-secondary">{displayText?.services ?? 'Services'}</p>
                  <p className="text-sm">{xs.services}</p>

                  <p className="text-base font-bold text-secondary">{displayText?.applicable_materials ?? 'Applicable Materials'}</p>
                  <p className="text-sm">{uniqueCate(xs.materials?.map(xs => xs.category?.name) ?? [])}</p>
                </div>
              </Link>
            </div>
          ))
        }

      </div>
    </Section>
  )
}
