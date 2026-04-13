import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Section } from "./Section";

export function WhySamples({ section }: CmpProps) {
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
    >
      <div className="mt-10 px-5 text-left grid grid-cols-1 gap-2 xl:grid-cols-2 xl:px-0 xl:gap-5">
        {
          section.payload?.data?.map((xs, index) => (
            <div key={xs.id} className="p-5 bg-[#fafafa] rounded-lg xl:p-10 xl:pb-7.5">
              <p className="mb-3 text-lg font-semibold">{xs.title}</p>
              <p>{xs.desc}</p>

            </div>
          ))

        }
      </div>

    </Section>
  )
}
