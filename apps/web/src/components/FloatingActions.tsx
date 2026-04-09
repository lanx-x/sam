'use client'

import { useState, useEffect, useCallback } from "react"
import { Assets } from "@/assets"
import Image from "next/image"
import { Site } from "cms-types"

export function FloatingActions({ site }: { site: Site }) {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="fixed items-center right-4 bottom-20 z-40 flex flex-col gap-3 xl:bottom-24 w-14">
      <div className=" rounded-[100px] shadow-[0_4px_8px_0_rgba(0,0,0,.06)] bg-white pb-7.5">
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center transition-transform hover:scale-110"
        >
          <div className="bg-[rgba(0,195,0,0.3)] w-14 h-14 shrink-0 flex items-center justify-center rounded-full mb-3">
            <div className="bg-[rgba(0,195,0,0.3)] w-12 h-12 flex items-center justify-center rounded-full">
              <Image className="w-10 h-10 object-cover" src={Assets.Whatsapp} alt="WhatsApp" width={24} height={24} />
            </div>
          </div>

          <span className="text-xs">whatsapp</span>
        </a>

        <div className="mx-2.5 border-b border-[#efefef] my-5"></div>
        <a
          href={`mailto:${site.email?.[0]?.value}`}
          className="flex flex-col items-center justify-center transition-transform hover:scale-110"
        >
          <Image className="w-6 h-6" src={Assets.EmailBlue} alt="Email" width={24} height={24} />
          <span className="text-xs mt-3">Email</span>
        </a>
      </div>

      <button
        onClick={scrollToTop}
        className={`flex w-14 h-14 items-center justify-center transition-all hover:scale-110 ${showTop ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image className="w-14 h-14 object-cover" src={Assets.Top} alt="Back to top" width={56} height={56} />
      </button>
    </div>
  )
}
