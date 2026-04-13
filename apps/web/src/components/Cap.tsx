import Image from "next/image";
import { Assets } from "@/assets";
import { getStrapiMedia } from "@/utils/strapi";
import { Section } from "./Section";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Link from "next/link";

export function Cap({ section, locale }: CmpProps) {
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}>
      <div className="flex flex-col mt-10 xl:w-7xl xl:mx-auto xl:flex-row">
        {
          section.payload?.data?.map((xs, idx) => {
            const imageUrl = getStrapiMedia(xs.image) || Assets.Cap;
            return (
              <Link key={xs.id} href={`/${locale}/${xs.target_url ?? ''}`} className="block group w-full aspect-35/16 relative xl:w-80 xl:h-120">
                <Image src={imageUrl} alt="cap" fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,35,70,0)_0%,#001123_100%)]" />
                <div className="px-5 relative w-full h-full flex flex-col group-hover:hidden">
                  <h3 className="text-white text-2xl font-semibold mb-10 mt-auto truncate">{xs.title}</h3>
                </div>
                <div className="absolute inset-0 bg-[rgba(0,118,238,0.90)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="h-full w-full px-5 pt-30 pb-12 text-left flex flex-col">
                    <p className="font-semibold text-2xl/none text-white mb-8">{xs.title}</p>
                    <p className="text-white text-sm leading-4.5 flex-1">{xs.desc}</p>
                    <div className="text-white font-medium text-base flex flex-row items-center">
                      <div className="flex items-center">
                        <span>{xs.label}</span>
                        <Image src={Assets.LinkWhite} alt="link" className="ml-3" />
                      </div>

                    </div>
                  </div>
                </div>

              </Link>
            )
          })
        }
      </div>
    </Section>
  )
}
