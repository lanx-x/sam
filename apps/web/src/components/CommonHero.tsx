import { getStrapiMedia, } from "@/utils/strapi";
import { CommonSection } from "cms-types";
import Image from "next/image";

export function CommonHero({ section }: { section: CommonSection }) {

  return (
    <div className={`${section.style}`}>
      <div className={`px-5 py-10 text-center xl:text-left xl:px-0 xl:w-7xl xl:mx-auto`}>
        <div className="relative flex flex-col xl:flex-row">
          <div className="mb-10 xl:mr-50 text-left xl:mb-30">
            <h2 className="text-4xl mb-5 font-black xl:text-[64px] leading-none">{section.title}</h2>
            <p className="text-base leading-none">{section.desc}</p>
          </div>

          <Image width={540} height={320} className="w-full rounded-2xl xl:rounded-3xl xl:w-135 xl:h-80 object-cover" src={getStrapiMedia(section.image) ?? ""} alt="" />


          <div className="flex flex-col mt-10 xl:flex-row xl:absolute xl:left-0 xl:bottom-0">
            {
              section.actions?.map((xs, idx) => (

                <button key={idx} className="bg-primary first:bg-accent rounded-sm text-white h-13 mb-4 xl:mb-0 xl:mr-5 xl:w-50 xl:aspect-200/52 truncate xl:px-4">{xs.label}</button>
              ))
            }
          </div>
        </div>


      </div>
    </div>
  )
}
