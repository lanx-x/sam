import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { createLocalizedApi } from "@/api";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";
import { BlocksContent } from "./BlocksContent";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { SectionContainer, SectionHeaderRowDir } from "./Section";
import { SurfaceTreatmentItem } from "./FeaturedSurfaceTreatment";
import { ActionButton } from "./ActionButton";

export async function MaterialDetail({ documentId, section, locale }: CmpProps) {
  const api = createLocalizedApi(locale);
  const data = (await api.getMaterial({ 'filters[documentId][$eq]': documentId })).data?.[0]

  const dict = {
    tensile_strength: 'Tensile Strength, Yield (MPa)',
    fatigue_strength: 'Fatigue Strength (MPa)',
    elongation_at_break: 'Elongation at Break (%)',
    hardness: 'Hardness (Brinell)',
    density: 'Density (g/cm³)'
  } as const

  return (
    <div>
      <div>
        <div className="bg-[rgba(0,118,238,0.06)]">
          <div className="xl:w-7xl xl:mx-auto grid grid-cols-1 xl:grid-cols-2 px-5 xl:px-0 py-10 xl:py-15 gap-10 xl:gap-25">
            <div className="xl:mt-10">
              <p className="text-[64px] font-black mb-5 leading-none">Copper CNC Machining Service</p>
              <p className="text-base leading-5">Get high-quality copper CNC machining services with advanced machinery and an experienced team that ensures precision and efficiency. Exceptional results that meet your specifications, whether you need prototypes or large-scale production runs.</p>

              <div className="mt-11.25 flex flex-col xl:flex-row gap-5">
                {
                  section.payload?.actions?.map((xs, idx) => (
                    <ActionButton key={idx} action={xs} className="xl:min-w-50 text-base font-medium bg-accent rounded-sm px-10 py-4 text-white" />
                  ))
                }

              </div>

            </div>

            <div className="w-full xl:w-145 aspect-145/130 relative">
              <Image className="object-cover" src={getStrapiMedia(data.image) ?? ""} alt="icon" fill />
            </div>

          </div>



        </div>

        <div className="px-5 xl:px-0 grid grid-cols-1 xl:grid-cols-[480px_1fr] gap-10 xl:gap-30 xl:w-7xl xl:mx-auto py-10 xl:py-20">
          <Image width={480} height={480} src={getStrapiMedia(data.icon) ?? ""} className="w-full xl:w-120 object-cover" alt="" />
          <div>
            {data.content && <BlocksRenderer content={data.content} />}

            <div className="mt-10">
              {
                [
                  ...(['strength', 'processability', 'corrosion_resistance'] as const).map(key => ({ key, value: data[key]?.name })),
                  { key: 'Typical applications', value: data.typical_applications },
                ].map(({ key, value }) => (
                  <div key={key} className="flex w-full xl:w-67 flex-col border-b-[#efefef] border-b pb-4 mb-4 last:border-none">
                    <span className="text-base capitalize mb-2">{key?.split('_').join(' ')}</span>
                    <span className="text-sm capitalize">{value}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>


        {/*specifications */}
        <SectionContainer className="px-5 xl:px-0">
          {
            data.specification?.map(xs => (
              <div key={xs.id} className="py-10">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 xl:gap-30 mb-10">
                  <h3 className="text-5xl font-semibold">{xs.name}</h3>
                  <p className="text-base">{xs.desc}</p>
                </div>

                <div>
                  <div className="grid grid-cols-5 items-center">
                    {
                      Object.entries(dict).map(([key, value]) => <span key={key} className="xl:text-lg text-sm font-bold text-secondary">{value}</span>)
                    }
                  </div>

                  <div className="grid grid-cols-5 border-t border-b border-secondary min-h-20 items-center mt-4">
                    {
                      Object.entries(dict).map(([key, value]) => <span key={key} className="text-sm xl:text-base">{xs[key as keyof typeof dict]}</span>)
                    }
                  </div>

                </div>

              </div>
            ))
          }

        </SectionContainer>


        <SectionContainer className="mt-15 mb-10 xl:mb-25 px-5 xl:px-0">
          <SectionHeaderRowDir
            title="Surface Finishing Options for Copper"
            desc="RapidDirect offers extensive surface finishing services that enhance the aesthetic appeal, functionality, and durability of copper parts. As part of our copper CNC machining service, these surface finishes include sandblasting, tumbling, electropolishing, alodine, teflon coating, electrophoresis, painting, and more. Each finish delivers superior coatings or adds layers to enhance the appearance and improve the physical properties of machined copper parts. Some unique finishes help hide minor imperfections on copper components. "
            className="text-center xl:text-left"
          />

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-1.5 gap-y-2 xl:gap-5 mt-10">

            {
              data?.surface_treatments?.map((xs, idx) => (
                <SurfaceTreatmentItem item={xs} key={xs.id} />

              ))
            }
          </div>

        </SectionContainer>



        <div className="bg-[#fafafa] py-10 xl:py-26.25">
          <SectionContainer className="px-5 xl:px-0">
            <SectionHeaderRowDir
              className="text-center xl:text-left"
              title="Pros and Cons ofCopper CNC Machining"
              desc="Copper has numerous advantages that make it well-suited for CNC machining processes. Nevertheless, it is important to consider certain drawbacks of aluminum parts machining before deciding to use it for any project. " />

            <div className="grid xl:grid-cols-2 gap-5 mt-10">
              {
                ['pros', 'cons'].map((xs, idx) => {
                  if (!data?.[xs as 'pros' | 'cons'] || data?.[xs as 'pros' | 'cons']?.length === 0)
                    return null

                  return (
                    <div className="p-5 bg-white" key={idx}>
                      <p className="leading-none text-2xl font-semibold">{xs}</p>
                      <ul className="text-base leading-6 list-disc ml-5 mt-5">
                        {
                          data?.[xs as 'pros' | 'cons']?.map((item, idx) => (
                            <li key={idx}>{item.value}</li>
                          ))

                        }
                      </ul>


                    </div>
                  )

                })
              }

            </div>
          </SectionContainer>
        </div>


        <div className="py-10 xl:py-20">
          <SectionContainer className="px-5 xl:px-0">
            <SectionHeaderRowDir
              className="text-center xl:text-left"
              title="Pros and Cons ofCopper CNC Machining"
              desc="Copper has numerous advantages that make it well-suited for CNC machining processes. Nevertheless, it is important to consider certain drawbacks of aluminum parts machining before deciding to use it for any project. " />

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-5 mt-10">
              {
                data.industries?.map((xs, idx) => (
                  <div className="relative" key={idx}>
                    <div className="relative aspect-305/300">
                      <Image fill src={getStrapiMedia(xs.image) ?? ""} alt="icon" />
                    </div>

                    <div className="px-3 py-1 xl:py-3.5 xl:px-5 w-full bg-[rgba(0,0,0,0.7)] absolute left-0 bottom-0 z-10">
                      <span className="text-base xl:text-2xl font-semibold text-white">{xs.name}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </SectionContainer>
        </div>



      </div>
    </div>
  )
}
