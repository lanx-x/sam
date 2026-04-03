import { Assets } from "@/assets";
import { CommonSection, SurfaceFinishSection } from "cms-types";
import Image from "next/image";
import { Section } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";

export function SurfaceFinish({ section }: { section: SurfaceFinishSection }) {
  return (
    <Section
      title={section.title!}
      desc={section.desc!}
      className={`${section.style}`}
    >

      <div className="text-left grid grid-cols-2 gap-1.5 mt-10 xl:grid-cols-4 xl:gap-5">
        {
          section.surface_finishes?.map((xs, idx) => (
            <div key={xs.id} className="rounded-lg overflow-hidden bg-[#fafafa]">
              <Image width={305} height={160} src={getStrapiMedia(xs.icon) ?? ""} alt="" className="w-full aspect-172/90" />
              <div className="py-6 px-5">
                <p className="text-lg font-semibold leading-none mb-2">{xs.name}</p>
                <p className="leading-none xl:text-base">{xs.desc}</p>
              </div>
            </div>
          ))
        }


      </div>
    </Section>
  )
}
