import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Image from "next/image";
import { Section } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { getSurfaceTreatment } from "@/api";
import { mergeExtension } from "@/utils";
import Link from "next/link";

export async function SurfaceTreatmentList({ section, locale, slug }: CmpProps) {
  const extension = mergeExtension(section)

  const data = await getSurfaceTreatment({})
  const basePath = ['', locale, ...slug].join('/')


  const share = "grid items-center xl:gap-10 justify-items-left grid-cols-1 xl:grid-cols-[160px_1fr_2fr_1fr_1fr] border-b border-[#bfbfbf] text-left";
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className={extension['style']?.value}
    >
      <div className="px-5 xl:px-0">
        <div className={`text-lg font-bold py-6 text-secondary ${share} hidden xl:grid`}>
          <p>Surface Finishes</p>
          <p></p>
          <p>Description</p>
          <p>Services</p>
          <p>Applicable Materials</p>
        </div>


        {
          data.data.map((xs) => (
            <div key={xs.id} className={``}>
              <Link className={`block duration-300 transition-colors hover:bg-[rgba(0,118,238,0.06)] group`} href={`${basePath}/${xs.documentId}`}>
                <div className={`hidden xl:grid xl:h-35 ${share}`}>
                  <Image className="w-30 aspect-square object-cover" src={getStrapiMedia(xs.icon) ?? ""} width={120} height={120} alt="icon" />
                  <p className="group-hover:text-accent text-left font-bold text-lg">{xs.name}</p>
                  <p className="text-base">{xs.desc}</p>
                  <p>{xs.services}</p>
                  <p>{xs.materials?.map(xs => xs.name).join(', ')}</p>
                </div>

                <div className="xl:hidden grid grid-cols-[1fr_210px] grid-rows-4 text-left items-center border-t border-[#bfbfbf] gap-y-2 py-2.5">
                  <p className="text-base font-bold text-secondary">Surface Finishes</p>
                  <div className="flex items-center gap-2">
                    <Image className="w-20 aspect-square object-cover" src={getStrapiMedia(xs.icon) ?? ""} width={80} height={80} alt="icon" />
                    <p className="group-hover:text-accent text-left font-bold text-base">{xs.name}</p>
                  </div>

                  <p className="text-base font-bold text-secondary">Description</p>
                  <p className="text-sm">{xs.desc}</p>

                  <p className="text-base font-bold text-secondary">Services</p>
                  <p className="text-sm">{xs.services}</p>

                  <p className="text-base font-bold text-secondary">Applicable Materials</p>
                  <p className="text-sm">{xs.materials?.map(xs => xs.name).join(', ')}</p>
                </div>
              </Link>
            </div>
          ))
        }

      </div>
    </Section>
  )
}
