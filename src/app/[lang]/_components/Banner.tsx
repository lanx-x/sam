"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { Assets } from "@/assets";

const ROTATE_INTERVAL = 3000;
const partnerLogos = [
  Assets.Corp01,
  Assets.Corp02,
  Assets.Corp03,
  Assets.Corp04,
  Assets.Corp05,
] as const;
const marqueeLogos = Array.from({ length: 10 }, () => partnerLogos).flat();

const data = [
  {
    label: "CNC Machining",
    desc: "Dolor elit quis labore accusamus inventore. Doloremque dicta id similique?",
  },
  {
    label: "Sheet Machining",
    desc: "Dolor elit quis labore accusamus inventore. Doloremque dicta id similique?",
  },
  {
    label: "Stamping",
    desc: "Stamping projects move from rough blanks to production-ready parts with steady tooling, reliable lead times, and repeatable quality checks.",
  },
  {
    label: "CNC Turning",
    desc: "Dolor elit quis labore accusamus inventore. Doloremque dicta id similique?",
  },
] as const;

export function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const animationName = useMemo(
    () => `banner-progress-${activeIndex}`,
    [activeIndex],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      dragFree: true,
      loop: true,
    },
    [
      AutoScroll({
        active: true,
        speed: 0.9,
        startDelay: 0,
      }),
    ],
  );

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    autoScroll.play()

  }, [emblaApi])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % data.length);
    }, ROTATE_INTERVAL);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeIndex]);

  return (
    <div className="relative">
      <Image src={Assets.Banner} alt="banner" fill className="object-cover object-[70%_20%]" />
      <div className="absolute inset-0 bg-[linear-gradient(278deg,rgba(0,35,70,0)_31.39%,#001123_100%)]" />
      <div className="relative pt-20 px-5 lg:w-7xl lg:px-0 lg:mx-auto">
        <h2 className="text-4xl font-black text-white mb-10 max-w-87.5 lg:text-[64px] lg:max-w-140">High-Precision CNC Machining for Complex Parts.</h2>

        <div>
          <div className="flex flex-col lg:flex-row">
            <style>{`@keyframes ${animationName} { from { width: 0%; } to { width: 100%; } }`}</style>
            {data.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.label}
                  type="button"
                  className="block w-fit max-w-full text-left mb-4 lg:mb-10 lg:mr-5"
                  onClick={() => setActiveIndex(index)}
                >
                  <p className="text-secondary font-medium mb-1 leading-none lg:text-base">{item.label}</p>
                  <div className={`h-0.5 w-full overflow-hidden rounded-full bg-[#d9d9d9] transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"}`} >
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{
                        width: isActive ? "100%" : "0%",
                        animation: isActive ? `${animationName} ${ROTATE_INTERVAL}ms linear forwards` : "none",
                      }}
                    />
                  </div>
                </button>
              );
            })}

          </div>
          <p className="text-white text-sm min-h-20 lg:max-w-128 lg:min-h-0 lg:text-base">
            {data[activeIndex].desc}
          </p>
        </div>

        <div className="flex mt-20 pb-29 flex-row justify-between lg:pb-34.5 lg:justify-start lg:mt-10">
          <button className="w-16/35 h-12 bg-accent rounded-sm text-white font-medium truncate px-4 lg:w-50 lg:h-13 lg:mr-5 lg:text-base">Lorem repellendus natus obcaecati vitae?</button>
          <button className="w-16/35 h-12 bg-white rounded-sm text-fg font-medium truncate px-4 lg:w-50 lg:h-13 lg:text-base">Adipisicing voluptatum sit maiores eaque?</button>
        </div>
      </div>

      <div className="absolute bottom-5 left-0 h-10 w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full items-center">
          {marqueeLogos.map((logo, idx) => (
            <div key={`${logo.src}-${idx}`} className="mr-9 flex h-full flex-[0_0_auto] items-center">
              <Image src={logo} alt={`corp-${(idx % partnerLogos.length) + 1}`} className="h-5 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
