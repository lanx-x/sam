
'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function WorkWith() {
  const data = [1, 2, 3, 4]

  return (
    <div className="relative text-center overflow-hidden">
      <Image src={Assets.Building} alt="building" className="object-cover object-[65%_10%] scale-150 xl:object-[0%_40%]" fill />
      <div className="relative pt-10 pb-12.5 z-10 text-white bg-[rgba(0,0,0,0.5)] xl:pt-15 xl:pb-15">
        <h2 className="section-title">Lorem quas magni voluptas dolore</h2>
        <p className="px-5 mb-5 section-desc"> Sit quibusdam expedita quia veritatis neque? Suscipit consectetur alias laborum </p>

        <div className="grid grid-cols-2 px-5 gap-2.5 xl:grid-cols-4 xl:w-7xl xl:mx-auto">
          {
            data.map((xs, idx) => (
              <div className="bg-[rgba(0,0,0,0.3)] rounded-lg pt-5 pb-10 px-4 text-left min-h-16" key={idx}>
                <p className="text-accent font-semibold text-2xl mb-10">0{idx + 1}.</p>
                <p className="font-semibold text-base mb-3 leading-none: xl:text-lg xl:leading-5">Elit inventore consectetur vitae quas?</p>
                <p className="text-sm leading-none xl:text-[15px]">Dolor illo atque vero tempore iusto maxime ducimus dolorum Natus maiores minima error repellat id accusantium lorem lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem  lorem   molestiae Maxime suscipit voluptatibus</p>
              </div>
            ))
          }

        </div>
      </div>

    </div>
  )
}
