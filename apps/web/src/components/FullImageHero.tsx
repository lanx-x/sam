import { mergeExtension } from "@/utils";
import { getStrapiMedia } from "@/utils/strapi";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Image from "next/image";
import { ActionButton } from "./ActionButton";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const splitNewlines = (value?: string | null) => value?.split(/\\n|\r?\n/) ?? [];

function renderHighlightedDesc(desc: string | null | undefined, highlights: string[], cl = 'text-accent text-3xl font-extrabold') {
  if (!desc || !highlights.length) return desc;

  const pattern = highlights.map(escapeRegExp).join("|");
  const highlightPattern = new RegExp(`(${pattern})`, "gi");

  return desc.split(highlightPattern).map((part, index) => {
    const isHighlighted = highlights.some((highlight) => part.toLowerCase() === highlight.toLowerCase());

    return isHighlighted ? <span key={index} className={`text-accent ${cl}`}>{part}</span> : part;
  });
}

export function FullImageHero({ section }: CmpProps) {
  const payload = section.payload!
  const extension = mergeExtension(section)
  const highlights = (section.payload?.data ?? [])
    .map((item) => item.desc?.trim())
    .filter((title): title is string => Boolean(title))
    .sort((a, b) => b.length - a.length);


  const extDesc = section.payload?.extension?.filter(xs => !['variant', 'style', 'bg_style'].includes(xs.key ?? "")) ?? []

  // t0:  cap 页面的头图, 文字限制宽度, 制作多行的效果. data中携带高亮字段
  // t1: resources页面的头图, 不限制文字长度, padding 更加紧凑
  // t2: 各页面中的非头图模块, 文字更小, padding 更小更紧凑
  // t3: about 页面的头图. desc 带格式化数据. extension 中携带多行信息
  const t = ['t0', 't1', 't2', 't3'].map(xs => (extension?.variant?.value ?? 't0') === xs)



  return (
    <div className={`relative px-5 xl:px-0 ${t[0] && 'py-20'} ${t[1] && 'py-9 xl:py-15'} ${t[2] && 'py-8 xl:py-20'} ${t[3] && 'xl:py-30'} ${extension['style']?.value}`}>
      <Image fill src={getStrapiMedia(section.payload?.image) ?? ""} alt="banner" className="object-cover -z-1" />
      <div className={`relative z-10 ${t[0] && 'text-left'} ${t[1] && 'text-center'} ${t[2] && 'text-center'} ${t[3] && 'text-left'} text-white xl:w-7xl xl:mx-auto`}>
        <div className={`${t[0] && 'xl:w-180'} ${t[3] && 'xl:w-145'}`}>
          <h1 className={`text-4xl font-black mb-5 leading-none ${t[0] && 'xl:text-[64px]'} ${t[1] && 'xl:text-[64px] xl:mb-5'} ${t[2] && 'xl:text-5xl xl:mb-3'} ${t[3] && 'xl:text-[64px] xl:mb-2'}`}>{renderHighlightedDesc(section.payload?.title, highlights, 'text-[64px]')}</h1>

          {
            splitNewlines(payload.desc).map((xs, idx) => (
              <p className="text-base" key={idx}>{renderHighlightedDesc(xs, highlights)}</p>
            ))
          }

          {
            extDesc.length > 0 && (
              <div className="xl:w-130 before:block before:w-15 before:h-1 before:bg-accent before:mb-5">
                {
                  extDesc.map((xs, idx) => (
                    <div key={idx} className="mb-3">
                      <h3 className="text-xl font-semibold text-left mb-2">{xs.key}</h3>
                      {
                        xs.value && splitNewlines(xs.value).map((s, idx) => <p key={idx} className="text-base">{s}</p>)
                      }
                    </div>
                  ))
                }

              </div>
            )
          }

          {
            ((section.payload?.actions?.length ?? 0) > 0) &&
            <div className={`flex flex-col xl:flex-row w-full mt-20 xl:mt-10 justify-center ${t[0] && 'justify-start'}`}>
              {
                section.payload?.actions?.map(xs => (
                  <ActionButton key={xs.id} action={xs} className="xl:w-50" />
                ))
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}
