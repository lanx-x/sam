
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";
import { mergeExtension } from "@/utils";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";

type CrossListPayload = {
  title?: string | null;
  desc?: string | null;
  data?: Array<{
    id: number | string;
    title?: string | null;
    desc?: string | null;
    image?: Parameters<typeof getStrapiMedia>[0];
    extension?: Array<{
      id: number | string;
      key?: string | null;
    }> | null;
  }> | null;
};

type CrossListProps = {
  section?: CmpProps["section"];
  payload?: CrossListPayload | null;
  styles?: string
};

const normalizeNewlines = (value?: string | null) => value?.replace(/\\n/g, '\n');

export function CrossList({ section, payload: providedPayload, styles }: CrossListProps) {
  const payload = providedPayload ?? section?.payload;
  const extension = section ? mergeExtension(section) : {};

  if (!payload) return null;

  // 如果t1, 当成最简单的图文卡片来使用.
  // 小屏: 竖向排布, 图+标题+描述
  // 大屏: 横向排布, 图+标题+描述
  //
  const variant = extension?.variant?.value ?? 't0'

  return (
    <div className={styles}>
      <div className={`px-5 xl:px-0 xl:w-7xl xl:mx-auto ${variant === 't1' ? 'pb-20' : 'py-20'}`}>
        <h2 className="text-3xl font-semibold text-center xl:text-5xl">{payload.title}</h2>
        {payload.desc && <p className="section-desc mt-3 text-center whitespace-pre-line">{normalizeNewlines(payload.desc)}</p>}

        <div className="mt-10 flex flex-col gap-10 xl:gap-25">
          {
            payload.data?.map(xs => (
              <div key={xs.id} className={`flex ${variant === 't1' ? 'flex-col' : 'flex-col-reverse'} gap-5 xl:flex-row xl:even:flex-row-reverse xl:gap-20`}>
                <div className="rounded-lg overflow-hidden w-full aspect-35/26 relative xl:w-150 xl:aspect-60/42 shrink-0">
                  <Image alt="img" src={getStrapiMedia(xs.image) ?? ""} fill className="object-cover" />
                </div>

                <div className="xl:pt-10">
                  <p className="text-2xl font-semibold mb-5">{xs.title}</p>
                  <p className="text-sm whitespace-pre-line">{normalizeNewlines(xs.desc)}</p>
                  <ul className="list-disc pl-5 mt-2">
                    {xs.extension?.map(item => (<li key={item.id}>{item.key}</li>))}
                  </ul>
                </div>

              </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}
