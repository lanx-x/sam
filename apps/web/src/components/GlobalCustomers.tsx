import Image from "next/image";
import { Assets } from "@/assets";
import { getStrapiMedia } from "@/utils/strapi";
import { Section } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Link from "next/link";
import { mergeExtension } from "@/utils";

export function GlobalCustomers({ section, locale }: CmpProps) {
  const payload = section.payload!
  const extension = mergeExtension(section)
  return (
    <div>
      <div className="px-5 py-15 xl:px-0 xl:w-7xl xl:mx-auto xl:py-25">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[640px_1fr] xl:gap-39">
          <div>
            <h2 className="text-3xl font-medium border-b-6 border-accent inline-block pb-2 xl:text-5xl">{payload.title}</h2>
            <p className="text-sm mt-5 xl:text-base xl:mt-3">{payload.desc}</p>
          </div>

          <div className="grid grid-cols-4 gap-8.75">
            {
              payload.data?.map((xs, idx) => (
                <div key={idx} className="text-3xl text-accent font-semibold xl:text-[40px]">
                  <p>{xs.desc}</p>
                  <p className="text-sm xl:text-base">{xs.title}</p>
                </div>
              ))
            }
          </div>
        </div>

        <div className="relative w-full aspect-2/1 mt-10 xl:mt-15">
          <Image alt="map" src={getStrapiMedia(payload.image) ?? ""} fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}
