import { Assets } from "@/assets";
import Image from "next/image";
import { Section } from "./Section";
import { CommonSection } from "cms-types";
import { getStrapiMedia } from "@/utils/strapi";
import { collectExtend } from "@/utils";

export function ProcessingTech({ section }: { section: CommonSection }) {
  const extension = collectExtend(section.payload?.extension as any, section.extension as any)
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className={extension.style}
    >
      <div className="px-5 mt-10 grid grid-cols-1 gap-3 xl:grid-cols-2 xl:gap-5 xl:px-0">
        {
          section.payload?.data?.map((xs, idx) => {
            const src = getStrapiMedia(xs.image) ?? ""
            return (
              <div key={xs.id} className="group relative rounded-lg py-10 px-5 overflow-hidden  bg-[#f8f9fb] w-full xl:min-h-90 xl:h-90 xl:px-10 xl:py-15">

                <style>{`img {
                      shape-outside: url(${getStrapiMedia(xs.image) ?? ""});
                      shape-image-threshold: 0.08;
                      shape-margin: 1rem;
                    }`}</style>


                <div className="text-left">
                  <Image
                    width={560}
                    height={560}
                    src={src}
                    className={`object-contain float-right -mr-10 w-60 xl:w-85`}
                    alt="bg" />
                  <p className="text-xl font-semibold leading-none mb-10">{xs.title}</p>
                  <div className="h-1 w-16 bg-accent mb-4"></div>
                  <p className="leading-none xl:text-base">{xs.desc}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </Section>
  )
}
