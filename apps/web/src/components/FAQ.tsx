'use client';

import { Assets } from "@/assets";
import Image from "next/image";
import { useState } from "react";

export function FAQ() {
  const data = [1, 2, 3, 4, 5, 7, 8]
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fafafa] py-10">
      <div className="flex flex-col text-center xl:flex-row xl:w-7xl xl:mx-auto">
        <div className="xl:mr-42.5">
          <h2 className="px-5 xl:px-0 section-title">Lorem quas magni voluptas dolore</h2>
          <p className="px-5 xl:px-0 section-desc"> Sit quibusdam expedita quia veritatis neque? Suscipit consectetur alias laborum </p>
        </div>

        <div className="px-5 text-left mt-10 xl:mt-0">
          {
            data.map((xs, idx) => (
              <div className="py-5 border-b border-b-[#efefef]" key={idx}>
                <button
                  type="button"
                  className="flex flex-row items-start justify-start text-left w-full"
                  onClick={() => setOpenIndex((current) => current === idx ? null : idx)}
                >
                  <p className="text-base font-semibold">Consectetur impedit eligendi est ipsum molestias Consectetur suscipit dignissimos numquam harum ipsam, sunt nemo iusto Cupiditate nihil rerum quisquam quisquam aperiam? Aliquam voluptas molestiae dolorem cumque delectus Adipisci quis assumenda magni possimus molestias voluptas Accusantium id consectetur nemo aspernatur autem tenetur! Consequatur doloribus libero magni culpa ad. Provident blanditiis ullam?</p>
                  <Image src={openIndex === idx ? Assets.Minus : Assets.Plus} alt="plus" className="w-4 h-4 ml-5 mt-5" />
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity,margin-top] duration-300 ease-out ${openIndex === idx ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base leading-6 pr-9 pb-10">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat doloremque
                      asperiores eveniet minima laboriosam, quaerat aliquam. Ipsum architecto
                      corporis commodi, molestiae cumque nam, quas deleniti eveniet temporibus
                      officiis rem dolor.
                    </p>
                  </div>
                </div>
              </div>
            ))
          }


        </div>
      </div>
    </div >
  )
}
