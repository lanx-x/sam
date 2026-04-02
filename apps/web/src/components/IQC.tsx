'use client';

import { Assets } from "@/assets";
import Image from "next/image";

export function IQC() {
  return (
    <div className="bg-[#fafafa] py-10 mt-23.75 xl:py-20">
      <div className="px-5  xl:px-0 xl:w-7xl xl:mx-auto">
        <h2 className="section-title">Elit eveniet nobis!</h2>
        <p className="section-desc">Amet quia doloribus praesentium asperiores impedit! Modi molestiae unde quam.</p>

        <div className="mt-10">
          <Image src={Assets.Iqc} alt="iqc" />
        </div>
      </div>
    </div>
  )
}
