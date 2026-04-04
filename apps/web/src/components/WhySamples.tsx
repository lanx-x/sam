import { CommonSection } from "cms-types";
import { Section } from "./Section";

export function WhySamples({ section }: { section: CommonSection }) {
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
    >
      <div className="mt-10 px-5 text-left grid grid-cols-1 gap-2 xl:grid-cols-2">
        {
          section.payload?.data?.map((xs, index) => (
            <div key={xs.id} className="p-5 bg-[#fafafa] rounded-lg">
              <p className="mb-3 text-lg font-semibold">{xs.title}</p>
              <p>{xs.desc}</p>

            </div>
          ))

        }
      </div>

    </Section>
  )
}
