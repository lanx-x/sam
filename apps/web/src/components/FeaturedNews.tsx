'use client';
import { Assets } from "@/assets";
import { CommonSection } from "cms-types";
import Image from "next/image";
import { Section } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";
import dayjs from "dayjs";

export function FeaturedNews({ section }: { section: CommonSection }) {
  return (
    <Section
      title={section.payload?.title!}
      desc={section.payload?.desc!}
    >

      <div className="px-5 mt-10 grid grid-cols-1 gap-5 xl:grid-cols-3 xl:px-0">
        {
          section.payload?.dynamic?.[0]?.news?.map((xs, idx) => (
            <div key={xs.documentId} className="text-left group border-b border-[#efefef] hover:border-accent">
              <div className="h-full pb-5 border-b border-transparent group-hover:border-accent">
                <Image width={413} height={232} src={getStrapiMedia(xs.image) ?? ""} alt="" className="w-full object-cover rounded-xl" />
                <p className="text-lg font-semibold mt-4 mb-2 leading-none group-hover:text-accent">{xs.title}</p>
                <span className="text-secondary leading-none">{dayjs(xs.date as string).format('YYYY-MM-DD')}</span>
                <p className="shrink-0 leading-none line-clamp-2 flex-1 mt-2">{xs.desc}</p>
              </div>
            </div>
          ))
        }
      </div>
    </Section>
  )
}
