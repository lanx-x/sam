'use client';

import { CommonSection } from "cms-types";
import { Section } from "./Section";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/strapi";
import { collectExtend } from "@/utils";

export function GetExpertAdvice({ section }: { section: CommonSection }) {

  const args = collectExtend(section.extend as any)
  return (
    <Section
      title={section.title!}
      desc={section.desc!}
      className="bg-[#fafafa]"
    >
      <div className="mt-10 px-5 xl:mt-15">
        <div className="flex flex-col justify-center items-center mb-8 xl:flex-row xl:mb-10">
          {
            section.actions?.map(xs => (
              <button key={xs.id} className="bg-primary first:bg-accent w-full h-13 text-white mb-4 xl:mb-0 xl:mr-4 xl:w-50">
                {xs.label}
              </button>
            ))
          }
        </div>

        <p className="text-secondary">{args.declare}</p>

      </div>

    </Section>
  )
}
