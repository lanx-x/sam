import { CommonHero } from "./CommonHero"
import { getStrapiMedia } from "@/utils/strapi"
import Image from "next/image"
import { BlocksContent } from "./BlocksContent"
import { CmpProps } from "@/app/[locale]/[[...slug]]/page"
import { getSurfaceTreatment } from "@/api"

export async function SurfaceTreatmentDetail({ documentId, section }: CmpProps) {
  const data = (await getSurfaceTreatment({ 'filters[documentId][$eq]': documentId }))?.data?.[0]

  if (!data) {
    return <div className="py-30 text-3xl font-semibold text-center">Surface finish: {documentId} not found.</div>
  }

  const attrs = ['Surface Finishes', '', 'Description', 'Services', 'Applicable Materials']
  const share = "flex flex-col xl:grid items-center gap-10 justify-items-left xl:grid-cols-[160px_1fr_2fr_1fr_1fr] border-b border-[#bfbfbf] text-left";

  const mobileShare = "grid grid-cols-[130px_1fr] gap-2 items-center min-h-25"

  return (
    <div>
      <CommonHero
        section={{
          id: data.id,
          payload: {
            documentId,
            id: data.id,
            title: data.extend?.title || data.name,
            desc: data.extend?.desc || data.desc,
            actions: section.payload?.actions,
            image: data.extend?.image || data.icon,
          },
          extension: [{ id: 0, key: 'style', value: 'bg-[#fafafa]' }]

        }}
      />
      <div className="xl:w-7xl xl:mx-auto">
        <div>
          <div className="flex px-5 xl:px-0 flex-col xl:flex-row xl:items-start">
            <Image width={480} height={252} src={getStrapiMedia(data.icon) ?? ""} alt="" className="w-120 h-63 object-cover mr-30" />
            {data.extend?.content && (
              <div className="mt-10 prose max-w-none flex-1">
                <BlocksContent content={data.extend.content} />
              </div>
            )}
          </div>

          <div className="mt-20 xl:mt-39 px-5 xl:px-0">
            <p className="leading-none text-[32px] xl:text-5xl font-semibold">{data.name} Specifications</p>

            <div className="hidden xl:block">
              <div className={`${share} py-6`}>
                {attrs.map((xs, idx) => (<span key={idx} className="text-lg text-secondary font-bold">{xs}</span>))}
              </div>

              <div className={`${share} h-35 border-none text-base leading-none mb-10`}>
                <Image width={120} height={120} src={getStrapiMedia(data.icon) ?? ""} alt="icon" />
                <p className="text-lg font-bold">{data.name}</p>
                <p className="">{data.desc}</p>
                <p className="">{data.services}</p>
                <p className="">{data.materials?.map(xs => xs.name).join(', ')}</p>
              </div>
            </div>

            <div className="xl:hidden flex flex-col mb-10 mt-13.75">
              <div className={`${mobileShare} border-t border-t-[#bfbfbf]`}>
                <span className="text-base text-secondary font-bold">Surface Finishes</span>
                <div className="flex items-center">
                  <Image width={80} height={80} className="object-cover" src={getStrapiMedia(data.icon) ?? ""} alt="icon" />
                  <span className="text-base font-bold">{data.name}</span>
                </div>
              </div>
              <div className={`${mobileShare}`}>
                <span className="text-sm text-secondary font-bold">Description</span>
                <span className="text-base">{data.desc}</span>
              </div>
              <div className={`${mobileShare}`}>
                <span className="text-sm text-secondary font-bold">Services</span>
                <span className="text-base">{data.services}</span>
              </div>
              <div className={`${mobileShare}`}>
                <span className="text-sm text-secondary font-bold">Applicable Materials</span>
                <span className="text-base">{data.materials?.map(xs => xs.name).join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-20 px-5 xl:px-0">
            {
              ['pros', 'cons', 'notes'].map(xs => {
                if (!data[xs as 'pros' | 'cons' | 'notes']?.length) return null

                return (
                  <div key={xs} className="bg-[#f7fbfe] min-h-90 p-10">
                    <p className="text-2xl font-semibold capitalize">{xs}</p>
                    <ol className={`mt-5 ml-4 text-base ${xs === 'notes' ? 'list-disc' : 'list-decimal'} xlist-inside`}>
                      {data[xs as 'pros' | 'notes']?.map((xs, idx) => (<li key={idx}>{xs.value}</li>))}
                    </ol>
                  </div>
                )
              })
            }

          </div>
        </div>
      </div>
    </div>
  )
}
