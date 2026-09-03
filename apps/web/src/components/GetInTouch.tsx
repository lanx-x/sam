import Image from "next/image";
import { Section } from "./Section";
import { Subscribe } from "./Subscribe";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import Link from "next/link";
import { Assets } from "@/assets";
import { FormGetQuote } from "./FormGetQuote";

const CJK_RE = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;

function splitAccentHead(text: string) {
  const lead = text.match(/^\s*/)?.[0] ?? "";
  const body = text.slice(lead.length);
  if (CJK_RE.test(body[0] ?? "")) {
    return { head: lead + body.slice(0, 2), rest: body.slice(2) };
  }
  const m = body.match(/^\S+(?:\s+\S+)?/);
  return { head: lead + (m?.[0] ?? ""), rest: body.slice(m?.[0].length ?? 0) };
}

export function GetInTouch(props: CmpProps) {
  const payload = props.section.payload!
  const { head, rest } = splitAccentHead(payload.desc ?? "");
  return (
    <div className="relative py-10 px-5 xl:py-20 xl:px-0">
      <Image alt="bg" src={getStrapiMedia(payload.image) ?? ""} fill className="object-cover -z-1" />

      <div className="flex flex-col xl:flex-row xl:mx-30">
        <div className="xl:mt-10 xl:max-w-164.25">
          <h2 className="text-3xl text-white font-semibold xl:text-5xl">{payload.title}</h2>
          <h2 className="text-3xl text-white font-semibold xl:text-5xl">
            <span className="text-accent">{head}</span>{rest}
          </h2>

          <div className="hidden xl:flex items-center gap-5 mt-67">
            <p className="text-3xl text-white font-medium">Contact Us</p>
            <Image alt="icon" src={Assets.IconArrow} width={40} height={40} />
          </div>
        </div>

        <div className="xl:ml-auto xl:w-210 xl:shrink-0">
          <FormGetQuote {...props} />
        </div>
      </div>


    </div>
  )
}
