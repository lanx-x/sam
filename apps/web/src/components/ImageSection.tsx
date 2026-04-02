'use client';

import { Assets } from "@/assets";
import Image, { StaticImageData } from "next/image";
import { PropsWithChildren } from "react";
import { Section } from "./Section";
import type { SectionProps } from "./Section";

type Props = SectionProps & {
  src: string | StaticImageData

}
export function ImageSection(props: PropsWithChildren<Props>) {
  return (
    <Section {...props}>
      <Image src={props.src} alt="section-img" />
    </Section>
  )
}

