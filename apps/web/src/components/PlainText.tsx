import { CmpProps } from "@/app/[locale]/[[...slug]]/page";

export function PlainSection({ section }: CmpProps) {
  const payload = section.payload!
  return (
    <div className="py-20 xl:px-25">
      <div className="px-5 xl:px-0 xl:mx-auto xl:w-7xl">
        <h2 className="text-3xl font-semibold border-b-6 border-accent border-solid pb-2 xl:text-5xl inline-block">{payload.title}</h2>
        <p className="mt-10 text-base">{payload.desc}</p>

      </div>

    </div>
  )

}
