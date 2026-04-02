'use client';
import { Assets } from "@/assets";
import { getStrapiMedia } from "@/utils/strapi";
import { CommonSection } from "cms-types";
import Image from "next/image";

export function Ship({ section }: { section: CommonSection }) {
  return (
    <div className="px-5 py-10 text-center flex flex-col xl:flex-row xl:w-7xl xl:mx-auto xl:py-20 xl:text-left">
      <div className="">
        <h2 className="section-title">{section.title}</h2>
        <p className="section-desc">{section.desc}</p>

        <div className="text-left mt-10 flex flex-col xl:flex-row">
          {
            section.data?.filter(xs => xs.title && xs.desc).map((xs, idx) => (
              <div key={xs.id} className="bg-[#fafafa] mb-2 py-8 px-5 xl:mr-5">
                <Image width={40} height={40} src={getStrapiMedia(xs.image) ?? ""} className="mb-8" alt="icon" />
                <p className="mb-3 text-lg font-semibold">{xs.title}</p>
                <p>{xs.desc}</p>
              </div>
            ))
          }
        </div>
      </div>

      {/* TODO: 轮播图 */}
      <div className="mt-5 xl:ml-25 shrink-0 overflow-hidden">
        {
          section.data?.filter(xs => !xs.title || !xs.desc).slice(0, 1).map((xs, idx) => (
            <Image width={540} height={480} key={idx} src={getStrapiMedia(xs.image) ?? ""} alt="workshop" className="rounded-lg object-cover xl:w-135 xl:h-120" />
          ))
        }
      </div>

    </div>
  )
}
