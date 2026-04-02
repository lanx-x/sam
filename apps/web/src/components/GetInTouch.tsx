'use client';

import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Section } from "./Section";
import { Subscribe } from "./Subscribe";

export function GetInTouch() {
  return (
    <Section
      title="Efficient Success quality development premium solution Customer modern Future smart"
      desc="Development solution experience professional Future success future premium premium Technology technology digital Service customer factory development Quality modern Platform development"
      className="text-white"
      bg={Assets.Contact}
      bgClassName="object-[20%_center] xl:object-[center_center]"

    >
      <div className="relative w-full px-5 mt-15">
        <Subscribe className="xl:w-145 xl:mx-auto" />
      </div>
    </Section>
  )
}
