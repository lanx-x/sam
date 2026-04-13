'use client';

import { getStrapiMedia } from "@/utils/strapi";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { InfiniteScroll } from "./Marquee";
import Image from "next/image";

export function WorkShop({ section }: CmpProps) {
  const data = section.payload?.data ?? [];

  if (!data.length) return null;

  return (
    <div className="pt-5 pb-15">
      <InfiniteScroll length={data.length}>
        {data.map((xs, idx) => (
          <div key={idx} className="ml-5 shrink-0 w-[51.28vw] xl:w-100 relative overflow-hidden">
            <Image width={400} height={240} src={getStrapiMedia(xs.image) ?? ""} alt="" className="rounded-lg mb-5 object-cover w-full" />
            <div>
              <p className="text-base font-semibold mb-2 leading-none xl:text-lg">{xs.title}</p>
              <p className="leading-none text-sm">{xs.desc}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}


