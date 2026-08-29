"use client";

import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Assets } from "@/assets";
import { getStrapiMedia } from "@/utils/strapi";
import { ActionButton } from "./ActionButton";

export function MainHero({ section }: CmpProps) {
  const payload = section.payload!

  return (
    <div className="relative h-dvh overflow-hidden">
      <video muted loop autoPlay playsInline className="block h-full w-full object-cover" src={getStrapiMedia(payload!.image) as string} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `url(${Assets.Dot.src})`, backgroundRepeat: "repeat" }}
      />

      <div className="absolute inset-0 z-10 flex flex-col mt-36.5 xl:mt-57 mx-5 xl:mx-30">
        <h1 className="text-white text-4xl xl:text-[64px]/[64px] max-w-218 font-extrabold">{payload.title}</h1>
        <p className="text-white text-lg xl:text-2xl mt-12.5 mb-34 xl:mt-7.25 xl:mb-15">{payload.desc}</p>

        {
          payload.actions?.map(xs =>
            <ActionButton key={xs.id} action={xs} className="w-50" />
          )
        }
      </div>
    </div>
  );
}
