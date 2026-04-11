'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import { mergeExtension } from "@/utils";

const marqueeStyle = `@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`;

export function Marquee({ section }: CmpProps) {
  const extension = mergeExtension(section)
  const logos = section.payload?.extra_images ?? []
  const measureRef = useRef<HTMLDivElement>(null)
  const [repeats, setRepeats] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const measure = measureRef.current
    const parent = measure?.parentElement
    if (!measure || !parent) return
    const update = () => {
      const singleWidth = measure.scrollWidth
      const parentWidth = parent.clientWidth
      if (!singleWidth || !parentWidth) return
      const needed = Math.ceil(2 * parentWidth / singleWidth)
      setRepeats(Math.max(2, needed + (needed % 2)))
      setReady(true)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [logos.length])

  const variant = extension.variant?.value === 'overlap' ? '-mt-10 bottom-5' : ''

  if (!logos.length) return null

  const duration = logos.length * repeats

  return (
    <div className={`relative h-10 transition-opacity ${ready ? 'opacity-100' : 'opacity-0'} ${variant}`}>
      <style>{marqueeStyle}</style>
      <div className="flex h-full overflow-hidden">
        <div aria-hidden className="invisible absolute flex shrink-0" ref={measureRef}>
          {logos.map((logo, idx) => (
            <div key={`m-${logo.id}-${idx}`} className="mr-9 flex h-full flex-[0_0_auto] items-center">
              <Image width={100} height={40} src={getStrapiMedia(logo) ?? ""} alt="" className="h-6 w-auto object-contain" />
            </div>
          ))}
        </div>
        <div className="flex h-full shrink-0 animate-[marquee_var(--marquee-duration)_linear_infinite] items-center" style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}>
          {Array.from({ length: repeats }, (_, ri) =>
            logos.map((logo, idx) => (
              <div key={`${ri}-${logo.id}-${idx}`} className="mr-9 flex h-full flex-[0_0_auto] items-center">
                <Image width={100} height={40} src={getStrapiMedia(logo) ?? ""} alt="" className="h-6 w-auto object-contain" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
