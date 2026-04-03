'use client';

import { CommonSection } from "cms-types";
import { Section } from "./Section";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";
import { Assets } from "@/assets";
import { collectExtend } from "@/utils";

export function EverythingForManufacturing({ section }: { section: CommonSection }) {
  const args = collectExtend(section.extend as any)

  const flexOpts = args.start_from === 'left' ? 'xl:flex-row xl:group-even:flex-row-reverse' : 'xl:flex-row-reverse xl:group-even:flex-row'

  return (
    <Section
      title={section.title!}
      desc={section.desc!}
    >
      <div className="text-left mt-10 px-5 xl:px-0 xl:mt-20">
        {
          section.data?.map((xs, index) => (
            <div key={xs.id} className={`group mb-10 flex flex-col xl:mb-15`}>
              <div className={`flex flex-col ${flexOpts} xl:mb-10`}>
                <div className="shrink-0 relative w-full aspect-350/242 rounded-2xl overflow-hidden xl:w-130 xl:aspect-52/36">
                  <Image fill className="object-cover" src={getStrapiMedia(xs.image) ?? ""} alt="icon" />
                </div>

                <div className="hidden xl:flex w-40 shrink-0"></div>

                <div>
                  <p className="text-accent text-lg font-semibold mt-5">{xs.label}</p>
                  <p className="mt-2 mb-4 text-2xl font-semibold">{xs.title}</p>
                  <p className="text-base">{xs.desc}</p>

                  {
                    xs.actions?.map(action => (
                      <button key={action.id} className="w-full px-10 mt-9 mb-5 h-13 bg-accent text-white xl:w-auto text-base font-medium">{action.label}</button>
                    ))
                  }

                </div>

              </div>

              <div className="grid grid-cols-2 gap-2 xl:grid-cols-4 xl:gap-5">
                {
                  xs.items?.map(item => (
                    <div key={item.id} className="bg-[#fafafa] rounded-lg py-5 px-4">
                      <Image width={64} height={64} src={getStrapiMedia(item.image) ?? ""} alt="icon" className="mr-2 w-12 aspect-square" />
                      <p className="text-lg mt-5 mb-3 font-semibold leading-none">{item.title}</p>

                      <p className="">{item.desc}</p>
                    </div>
                  ))
                }

              </div>
            </div>
          ))
        }
      </div>

    </Section>
  )
}
