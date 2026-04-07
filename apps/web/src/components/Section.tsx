'use client';
import { cn } from "@/utils/cn"
import Image, { StaticImageData } from "next/image"
import { PropsWithChildren } from "react"
import { twMerge } from 'tailwind-merge'



export type SectionProps = {
  title: string
  desc: string
  direction?: 'col' | 'row'
  className?: string
  bg?: string | StaticImageData
  bgClassName?: string
}
export function Section(props: PropsWithChildren<SectionProps>) {
  return (
    <div className={twMerge(`relative text-center py-10 xl:py-20`, props.className)}>
      {props.bg ? <Image src={props.bg} fill alt="section-bg" className={cn("object-cover", props.bgClassName)} /> : null}
      <div className={`${props.bg && 'relative z-10'} xl:w-7xl xl:mx-auto`}>
        <div className="px-5 flex flex-col xl:px-0">
          <p className="section-title">{props.title}</p>
          <p className="section-desc">{props.desc}</p>
        </div>

        <SectionContainer>{props.children}</SectionContainer>
      </div>
    </div>
  )
}

export function SectionContainer(props: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`xl:w-7xl xl:mx-auto ${props.className}`}>
      {props.children}
    </div>
  )
}


export function SectionHeaderRowDir(props: { title: string, desc: string, className?: string }) {
  return (
    <div className={`grid grid-cols-1 gap-2 xl:grid-cols-2 xl:gap-8 ${props.className}`}>
      <h2 className="section-title mb-0">{props.title}</h2>
      <div className="">
        <div className="h-1 w-16 bg-accent my-3 xl:block"></div>
        <p className="section-desc">{props.desc}</p>
      </div>
    </div>
  )

}
