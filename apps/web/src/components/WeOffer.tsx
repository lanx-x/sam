import { CommonSection } from "cms-types";
import { Section } from "./Section";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";
import { Assets } from "@/assets";
import { collectExtend } from "@/utils";

export function WeOffer({ section }: { section: CommonSection }) {
  const extension = collectExtend(section.extension as any)

  const flexOpts = extension.start_from === 'right' ? 'xl:flex-row xl:even:flex-row-reverse' : 'xl:flex-row-reverse xl:even:flex-row'
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
    >
      <div className="text-left mt-10 px-5 xl:px-0 xl:mt-20">
        {
          section.payload?.data?.map((xs, index) => (
            <div key={xs.id} className={`mb-10 flex flex-col xl:mb-15 ${flexOpts}`}>
              <div className="xl:pt-10">
                <p className="text-2xl font-semibold leading-none">{xs.title}</p>
                <p className="my-5">{xs.desc}</p>
                <div className="my-5">
                  {
                    xs.items?.map(item => (
                      <div key={item.id} className="mb-5">
                        <div className="mb-2 flex flex-row items-center">
                          <Image src={Assets.CheckBlue} alt="icon" className="mr-2 w-5.5 aspect-square" />
                          <p className="text-lg font-semibold">{item.title}</p>
                        </div>

                        <p className="">{item.desc}</p>
                      </div>
                    ))
                  }

                </div>
              </div>
              <div className="w-40 shrink-0"></div>
              <div className="shrink-0 relative w-full aspect-350/283 rounded-3xl overflow-hidden xl:w-130 xl:aspect-52/42">
                <Image fill className="object-cover" src={getStrapiMedia(xs.image) ?? ""} alt="icon" />
              </div>
            </div>
          ))
        }
      </div>

    </Section>
  )
}
