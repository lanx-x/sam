import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";
import { mergeExtension } from "@/utils";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";

type CommonListPayload = {
  title?: string | null;
  data?: Array<{
    id: number | string;
    title?: string | null;
    desc?: string | null;
    image?: Parameters<typeof getStrapiMedia>[0];
  }> | null;
};

type CommonListWithIconProps = {
  section?: CmpProps["section"];
  payload?: CommonListPayload | null;
};

export function CommonListWithIcon({ section, payload: providedPayload }: CommonListWithIconProps) {
  const payload = providedPayload ?? section?.payload;
  const extention = section ? mergeExtension(section) : {};

  if (!payload) return null;

  const variant = extention?.variant?.value ?? 't0'

  const gridCols = [1, 2, 4].includes(payload.data?.length ?? 0) ? 'xl:grid-cols-2' : 'xl:grid-cols-3'

  return (
    <div className={`${variant === 't1' ? 'bg-[#fafafa]' : 'bg-white'}`}>
      <div className="pt-20 pb-15 px-5 xl:pt-25 xl:px-0 xl:w-7xl xl:mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10 xl:text-5xl xl:mb-15">{payload.title}</h2>

        <div className={`w-full gap-2 grid grid-cols-1 xl:gap-5 ${gridCols}`}>
          {
            payload.data?.map(xs => (
              <div key={xs.id} className={`w-full px-5 py-8 ${variant === 't1' ? 'bg-white' : 'bg-[#fafafa]'}  xl:w-auto xl:basis-4 flex-1`}>
                <div className="w-10 h-10 relative overflow-hidden">
                  <Image alt="img" src={getStrapiMedia(xs.image) ?? ""} fill className="object-cover hover:scale-120 transition-transform duration-300" />
                </div>
                <p className="mt-8 mb-3 text-lg font-semibold">{xs.title}</p>
                <p className="text-sm">{xs.desc}</p>
              </div>
            ))
          }

        </div>
      </div>
    </div >
  )
}
