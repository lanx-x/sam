import { CommonSection } from "cms-types";
import Image from "next/image";
import { Section } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import { getSurfaceFinish } from "@/api";
import { mergeExtension } from "@/utils";

export async function SurfaceFinishList({ section }: { section: CommonSection }) {
  const extension = mergeExtension(section)

  const data = await getSurfaceFinish({})

  const share = "grid items-center gap-10 justify-items-left grid-cols-[160px_1fr_2fr_1fr_1fr] border-b border-[#bfbfbf] text-left";
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className={extension.style}
    >
      <div>
        <div className={`text-lg font-bold py-6 text-secondary ${share}`}>
          <p>Surface Finishes</p>
          <p></p>
          <p>Description</p>
          <p>Services</p>
          <p>Applicable Materials</p>
        </div>


        {
          data.data.map((xs) => (
            <div key={xs.id} className={`group ${share} h-35 text-lg duration-300 transition-colors hover:bg-[rgba(0,118,238,0.06)]`}>
              <Image className="w-30 aspect-square object-cover" src={getStrapiMedia(xs.icon) ?? ""} width={120} height={120} alt="icon" />
              <p className="group-hover:text-accent text-left font-bold text-lg">{xs.name}</p>
              <p className="text-base">{xs.desc}</p>
              <p>{xs.services?.map(xs => xs.value).join(', ')}</p>
              <p>{xs.applicable_materials?.map(xs => xs.value).join(', ')}</p>
            </div>
          ))
        }

      </div>
    </Section>
  )
}
