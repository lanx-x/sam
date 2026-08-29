import { mergeExtension } from "@/utils";
import { getStrapiMedia } from "@/utils/strapi";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import Image from "next/image";
import { ActionButton } from "./ActionButton";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function renderHighlightedDesc(desc: string | null | undefined, highlights: string[]) {
  if (!desc || !highlights.length) return desc;

  const pattern = highlights.map(escapeRegExp).join("|");
  const highlightPattern = new RegExp(`(${pattern})`, "gi");

  return desc.split(highlightPattern).map((part, index) => {
    const isHighlighted = highlights.some((highlight) => part.toLowerCase() === highlight.toLowerCase());

    return isHighlighted ? <span key={index} className="text-accent text-3xl font-extrabold">{part}</span> : part;
  });
}

export function FullImageHero({ section }: CmpProps) {
  const extension = mergeExtension(section)
  const highlights = (section.payload?.data ?? [])
    .map((item) => item.desc?.trim())
    .filter((title): title is string => Boolean(title))
    .sort((a, b) => b.length - a.length);

  const variant = extension?.variant?.value ?? 't0'

  return (
    <div className={`relative py-20 px-5 xl:px-0 ${extension['style']?.value}`}>
      <Image fill src={getStrapiMedia(section.payload?.image) ?? ""} alt="banner" className="object-cover -z-1" />
      <div className={`relative z-10 ${variant === 't0' ? 'text-left' : 'text-center'} text-white xl:w-7xl xl:mx-auto`}>
        <div className={`${variant === 't0' ? 'xl:w-180' : ''}`}>
          <h1 className={`text-4xl ${variant === 't2' ? 'xl:text-5xl' : 'xl:text-[64px]'} font-black mb-5 leading-none ${variant === 't2' ? 'xl:mb-3' : 'xl:mb-10'}`}>{section.payload?.title}</h1>
          <p className="text-base">{renderHighlightedDesc(section.payload?.desc, highlights)}</p>
          <div className={`flex flex-col xl:flex-row w-full mt-20 xl:mt-10 ${variant === 't0' ? 'justify-start' : 'justify-center'}`}>
            {
              section.payload?.actions?.map(xs => (
                <ActionButton key={xs.id} action={xs} className="xl:w-70" />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
