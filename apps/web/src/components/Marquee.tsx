'use client';

import { Children, cloneElement, type ReactElement, type ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import { mergeExtension } from "@/utils";

/* ------------------------------------------------------------------ */
/*  InfiniteScroll — generic infinite-scroll marquee                   */
/* ------------------------------------------------------------------ */

export type InfiniteScrollProps = {
  /** Item count */
  length: number;
  /** Scroll speed in px/s, default 50 */
  speed?: number;
  className?: string;
  children: ReactNode;
}

export function InfiniteScroll({ length, speed = 20, className, children }: InfiniteScrollProps) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [repeats, setRepeats] = useState(0)
  const [duration, setDuration] = useState(0)
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
      setDuration(singleWidth / speed)
      setReady(true)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [length, speed])

  return (
    <div className={`relative transition-opacity ${ready ? 'opacity-100' : 'opacity-0'} ${className ?? ''}`}>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div className="relative flex overflow-hidden">
        <div aria-hidden className="invisible absolute flex shrink-0" ref={measureRef}>
          {children}
        </div>
        <div
          className="flex shrink-0 animate-[marquee_var(--marquee-duration)_linear_infinite] items-center"
          style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
        >
          {Array.from({ length: repeats }, (_, ri) =>
            Children.map(children, (child) =>
              child ? cloneElement(child as ReactElement, { key: `${ri}-${(child as ReactElement).key ?? ri}` }) : child
            )
          )}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Marquee — CMS-backed logo marquee using InfiniteScroll            */
/* ------------------------------------------------------------------ */

export function Marquee({ section }: CmpProps) {
  const extension = mergeExtension(section)
  const logos = section.payload?.extra_images ?? []

  const variant = extension.variant?.value === 'overlap' ? '-mt-10 bottom-5' : ''

  if (!logos.length) return null

  return (
    <InfiniteScroll length={logos.length} className={`h-10 ${variant}`}>
      {logos.map((logo, idx) => (
        <div key={`m-${logo.id}-${idx}`} className="mr-9 flex h-full flex-[0_0_auto] items-center">
          <Image width={100} height={40} src={getStrapiMedia(logo) ?? ""} alt="" className="h-6 w-auto object-contain" />
        </div>
      ))}
    </InfiniteScroll>
  )
}
