import { Assets } from "@/assets";
import { CmpProps } from "@/app/[lang]/[[...slug]]/page";
import Image from "next/image";
import { Section } from "./Section";

export function Tolerance({ section }: CmpProps) {
  const data = section.payload?.data ?? []
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
      className="bg-[#fafafa]"
    >
      <div className="px-5 grid grid-cols-1 mt-10 xl:grid-cols-2 xl:px-0">
        {
          data?.map((xs, idx) => (
            <div key={idx} className={`border-b border-secondary flex flex-row items-start py-5 min-h-21 first:border-t xl:odd:border-r xl:odd:last:border-r-0 xl:nth-[2]:border-t ${data.length % 2 ? 'xl:last:col-span-2' : ''} min-h-21`}>
              <span className="text-base font-bold px-5 w-30 leading-none xl:w-42.5 xl:text-lg">{xs.title}</span>
              <div className="flex-1 leading-none">
                {
                  xs.extension?.map(xs => (
                    <div key={xs.id} className="xl:text-base">
                      <span>{xs.key}: </span>
                      <span>{xs.value}</span>
                    </div>
                  ))

                }
              </div>
            </div>
          ))
        }
      </div>

    </Section >
  )
}
