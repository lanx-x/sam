import { CommonSection } from "cms-types";
import Image from "next/image";
import { getMaterial } from "@/api";
import { getStrapiMedia } from "@/utils/strapi";
import { BlocksContent } from "./BlocksContent";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { SectionContainer, SectionHeaderRowDir } from "./Section";
import { SurfaceTreatmentItem } from "./SurfaceFinish";

export async function MaterialDetail({ documentId, section }: { documentId: string, section: CommonSection }) {
  const data = (await getMaterial({ 'filters[documentId][$eq]': documentId })).data?.[0]

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
                  [1, 2].map((xs, idx) => (
                    <button key={idx} className="xl:min-w-50 text-base font-medium bg-accent rounded-sm px-10 py-4 text-white">Get a Free Quote</button>
                  ))
                }

              </div>

            </div>

            <div className="w-full xl:w-145 aspect-145/130 relative">
              <Image className="object-cover" src={getStrapiMedia(data.image) ?? ""} alt="icon" fill />
            </div>

          </div>



        </div>

        <div className="px-5 xl:px-0">
          {data.content && <BlocksRenderer content={data.content} />}
        </div>


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
                            <li key={idx}>{item.key}</li>
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
                      <span className="text-base xl:text-2xl font-semibold text-white">{xs.title}</span>
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
