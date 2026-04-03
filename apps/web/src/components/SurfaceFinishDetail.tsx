import { getSurfaceFinish } from "@/api"
import { CommonHero } from "./CommonHero"
import { Section } from "./Section"
import { getStrapiMedia } from "@/utils/strapi"
import Image from "next/image"

export async function SurfaceFinishDetail({ documentId }: { documentId: string }) {
  const data = (await getSurfaceFinish({ 'filters[documentId][$eq]': documentId }))?.data?.[0]

  if (!data) {
    return <div className="py-30 text-3xl font-semibold text-center">Surface finish: {documentId} not found.</div>
  }

  const attrs = ['Surface Finishes', '', 'Description', 'Services', 'Applicable Materials']
  const share = "grid items-center gap-10 justify-items-left grid-cols-[160px_1fr_2fr_1fr_1fr] border-b border-[#bfbfbf] text-left";

  return (
    <div>
      <CommonHero
        section={{
          id: data.id,
          title: data.extend?.title || data.name,
          desc: data.extend?.desc || data.desc,
          actions: [{ id: 1, label: 'Get a Free Quote' }, { id: 2, label: 'Start Production Quote' }],
          image: data.extend?.image || data.icon,
          style: "bg-[#fafafa]"
        }}
      />
      <Section
        title="Sand Blasting Specifications"
        desc=""
        className="text-left"
      >
        <div>
          <div className={`${share} py-6`}>
            {attrs.map((xs, idx) => (<span key={idx} className="text-lg text-secondary font-bold">{xs}</span>))}
          </div>

          <div className={`${share} h-35 border-none text-base leading-none mb-10`}>
            <Image width={120} height={120} src={getStrapiMedia(data.icon) ?? ""} alt="icon" />
            <p className="text-lg font-bold">{data.name}</p>
            <p className="">{data.desc}</p>
            <p className="">{data.services?.map(xs => xs.value).join(', ')}</p>
            <p className="">{data.applicable_materials?.map(xs => xs.value).join(', ')}</p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {
              ['advantages', 'disadvantages', 'notes'].map(xs => {
                if (!data[xs as 'advantages' | 'notes']?.length) return null

                return (
                  <div key={xs} className="bg-[#f7fbfe] min-h-90 p-10">
                    <p className="text-2xl font-semibold capitalize">{xs}</p>
                    <ol className={`mt-5 ml-4 text-base ${xs === 'notes' ? 'list-disc' : 'list-decimal'} xlist-inside`}>
                      {data[xs as 'advantages' | 'notes']?.map((xs, idx) => (<li key={idx}>{xs.value}</li>))}
                    </ol>
                  </div>
                )
              })
            }

          </div>


        </div>

      </Section>
    </div>
  )
}
