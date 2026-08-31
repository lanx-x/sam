
import { Assets } from "@/assets";
import { SurfaceTreatment } from "cms-types";
import Image from "next/image";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { buildDynamicDetailPath } from "@/utils/dynamic-routes";
import { collectExtend, mergeExtension } from "@/utils";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Link from "next/link";

export function CrossList({ section }: CmpProps) {
  const payload = section.payload!
  const extension = mergeExtension(section)

  // 如果t1, 当成最简单的图文卡片来使用.
  // 小屏: 竖向排布, 图+标题+描述
  // 大屏: 横向排布, 图+标题+描述
  const variant = extension?.variant?.value ?? 't0'

  return (
    <div className={`px-5 xl:px-0 xl:w-7xl xl:mx-auto ${variant === 't1' ? 'pb-20' : 'py-20'}`}>
      <h2 className="text-3xl font-semibold text-center xl:text-5xl">{payload.title}</h2>

      <div className="mt-10 flex flex-col gap-10 xl:gap-25">
        {
          payload.data?.map(xs => (
            <div key={xs.id} className={`flex ${variant === 't1' ? 'flex-col' : 'flex-col-reverse'} gap-5 xl:flex-row xl:even:flex-row-reverse xl:gap-20`}>
              <div className="rounded-lg overflow-hidden w-full aspect-35/26 relative xl:w-150 xl:aspect-60/42 shrink-0">
                <Image alt="img" src={getStrapiMedia(xs.image) ?? ""} fill className="object-cover" />
              </div>

              <div className="xl:pt-10">
                <p className="text-2xl font-semibold mb-5">{xs.title}</p>
                <p className="text-sm">{xs.desc}</p>
                <ul className="list-disc pl-5 mt-2">
                  {xs.extension?.map(item => (<li key={item.id}>{item.key}</li>))}
                </ul>
              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}
