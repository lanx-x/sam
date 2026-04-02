import { cn } from "@/utils/cn"
import Image, { StaticImageData } from "next/image"
import { PropsWithChildren } from "react"

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
    <div className={cn(`relative text-center py-10 xl:py-20`, props.className)}>
      {props.bg ? <Image src={props.bg} fill alt="section-bg" className={cn("object-cover", props.bgClassName)} /> : null}
      <div className={`${props.bg && 'relative z-10'} xl:w-7xl xl:mx-auto`}>
        <div className="px-5 flex flex-col">
          <p className="section-title">{props.title}</p>
          <p className="section-desc">{props.desc}</p>
        </div>

        <SectionContainer>{props.children}</SectionContainer>
      </div>
    </div>
  )
}

export function SectionContainer(props: PropsWithChildren) {
  return (
    <div className="xl:w-7xl xl:mx-auto">
      {props.children}
    </div>
  )
}
