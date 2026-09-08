import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { mergeExtension } from "@/utils";
import { CountUpNumber } from "./CountUpNumber";

const splitNewlines = (value?: string | null) => value?.split(/\\n|\r?\n/) ?? [];

export function AboutSAMWithStats({ section }: CmpProps) {
  const payload = section.payload!
  const extension = mergeExtension(section)
  return (
    <div>
      <div className="px-5 py-15 grid grid-cols-1 gap-9 xl:w-7xl xl:mx-auto xl:gap-30 xl:grid-cols-[520px_1fr] xl:py-25">
        <div>
          {
            payload.data?.map((xs, idx) => (
              <div key={idx} className="py-5 border-b border-solid border-[#efefef] first:border-t">
                <p className="text-5xl font-semibold"><CountUpNumber text={xs.desc ?? ""} /></p>
                <p className="mt-2 text-base font-medium text-secondary">{xs.title}</p>
              </div>
            ))
          }

        </div>

        <div>
          <div className="flex flex-row items-center mb-3">
            <div className="w-9 h-0.5 bg-accent mr-2"></div>
            <span className="text-accent text-lg font-semibold">{extension?.label?.value ?? 'Who We Are'}</span>
          </div>
          <h2 className="text-2xl font-semibold xl:text-4xl">{payload.title}</h2>
          <div className="mt-5 text-base">
            {payload.desc && splitNewlines(payload.desc).map((xs, idx) => <p key={idx}>{xs}</p>)}
          </div>
        </div>
      </div>
    </div>
  )
}
