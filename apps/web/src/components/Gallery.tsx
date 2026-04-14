"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { Section, SectionContainer } from "./Section";
import { getStrapiMedia } from "@/utils/strapi";

const DESKTOP_PER_GROUP = 6; // 3x2
const MOBILE_PER_GROUP = 6; // 2x3

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function Gallery({ section }: CmpProps) {
  const images = section.payload?.extra_images ?? [];

  const desktopGroups = useMemo(() => chunk(images, DESKTOP_PER_GROUP), [images]);
  const mobileGroups = useMemo(() => chunk(images, MOBILE_PER_GROUP), [images]);

  // Desktop carousel
  const [desktopRef, desktopApi] = useEmblaCarousel(
    { align: "start", loop: desktopGroups.length > 1 },
    [Autoplay({ delay: 4000 })],
  );
  const [desktopIdx, setDesktopIdx] = useState(0);

  useEffect(() => {
    if (!desktopApi) return;
    const sync = () => setDesktopIdx(desktopApi.selectedSnap());
    sync();
    desktopApi.on("select", sync);
    desktopApi.on("reinit", sync);
    return () => {
      desktopApi.off("select", sync);
      desktopApi.off("reinit", sync);
    };
  }, [desktopApi]);

  // Mobile carousel
  const [mobileRef, mobileApi] = useEmblaCarousel(
    { align: "start", loop: mobileGroups.length > 1 },
    [Autoplay({ delay: 4000 })],
  );
  const [mobileIdx, setMobileIdx] = useState(0);

  useEffect(() => {
    if (!mobileApi) return;
    const sync = () => setMobileIdx(mobileApi.selectedSnap());
    sync();
    mobileApi.on("select", sync);
    mobileApi.on("reinit", sync);
    return () => {
      mobileApi.off("select", sync);
      mobileApi.off("reinit", sync);
    };
  }, [mobileApi]);

  return (
    <div id="team">
      <Section
        className="bg-[#f0f7fe] py-10 xl:py-20"
        title={section.payload?.title!}
        desc={section.payload?.desc!}>
        {/* Mobile: 2x3 grouped carousel */}
        <div className="xl:hidden px-5 mt-10">
          <div ref={mobileRef} className="overflow-hidden">
            <div className="flex">
              {mobileGroups.map((group, gIdx) => (
                <div key={gIdx} className="min-w-0 shrink-0 basis-full">
                  <div className="grid grid-cols-2 gap-3">
                    {group.map((img, iIdx) => (
                      <div key={iIdx} className="relative aspect-[167/145] rounded-xl overflow-hidden">
                        <Image
                          src={getStrapiMedia(img) ?? ""}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 1279px) 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {mobileGroups.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {mobileGroups.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`size-2 rounded-full transition-colors duration-300 ${idx === mobileIdx ? "bg-accent" : "bg-[#d9d9d9]"}`}
                  onClick={() => mobileApi?.goTo(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop: 3x2 grouped carousel */}
        <div className="hidden xl:block mt-15">
          <div ref={desktopRef} className="overflow-hidden">
            <div className="flex">
              {desktopGroups.map((group, gIdx) => (
                <div key={gIdx} className="min-w-0 shrink-0 basis-full px-5">
                  <div className="grid grid-cols-3 gap-5">
                    {group.map((img, iIdx) => (
                      <div key={iIdx} className="relative aspect-414/360 rounded-xl overflow-hidden">
                        <Image
                          src={getStrapiMedia(img) ?? ""}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="420px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {desktopGroups.length > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {desktopGroups.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`size-2 rounded-full transition-colors duration-300 ${idx === desktopIdx ? "bg-accent" : "bg-[#d9d9d9]"}`}
                  onClick={() => desktopApi?.goTo(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
