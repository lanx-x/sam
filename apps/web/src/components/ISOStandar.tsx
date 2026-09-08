'use client';

import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getStrapiMedia } from "@/utils/strapi";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ISOStandard({ section }: CmpProps) {
  const [previewImage, setPreviewImage] = useState<ReturnType<typeof getStrapiMedia>>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPreviewTimer = () => {
    if (previewTimer.current) {
      clearTimeout(previewTimer.current);
      previewTimer.current = null;
    }
  };

  const clearPreviewCloseTimer = () => {
    if (previewCloseTimer.current) {
      clearTimeout(previewCloseTimer.current);
      previewCloseTimer.current = null;
    }
  };

  const openPreview = (image: NonNullable<ReturnType<typeof getStrapiMedia>>) => {
    clearPreviewTimer();
    clearPreviewCloseTimer();
    previewTimer.current = setTimeout(() => {
      setPreviewImage(image);
      requestAnimationFrame(() => setIsPreviewVisible(true));
    }, 300);
  };

  const closePreview = () => {
    clearPreviewTimer();
    clearPreviewCloseTimer();
    setIsPreviewVisible(false);
    previewCloseTimer.current = setTimeout(() => setPreviewImage(null), 200);
  };

  useEffect(() => () => {
    clearPreviewTimer();
    clearPreviewCloseTimer();
  }, []);

  return (
    <div className="py-10 xl:py-30 bg-[#fafafa]">
      <div className="px-5 xl:px-0 xl:mx-auto xl:w-7xl">
        <div className="flex flex-row items-center">
          <p className="xl:text-5xl text-[32px]/8 font-semibold flex-1 xl:pr-88">{section.payload?.title}</p>
          <Image width={100} height={100} className="w-20 xl:w-25 aspect-square object-cover" src={getStrapiMedia(section.payload?.image) ?? ""} alt="" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-10 gap-y-30 mt-35">
          {
            section.payload?.data?.map(xs => {
              const image = getStrapiMedia(xs.extension?.[0]?.image);

              return (
                <div
                  key={xs.id}
                  className={`relative flex h-70 w-full flex-col items-center justify-center rounded-xl bg-white text-center transition-transform duration-300 ${image ? "cursor-zoom-in hover:-translate-y-1" : ""}`}
                  onMouseEnter={image ? () => openPreview(image) : undefined}
                  onMouseLeave={image ? clearPreviewTimer : undefined}
                >
                  <Image className="absolute -top-20 object-cover" src={getStrapiMedia(xs.image) ?? ""} alt="" width={160} height={160} />
                  <p className="mt-10 text-[32px] font-extrabold">{xs.title}</p>
                  <p className="mt-6 text-base">{xs.desc}</p>
                </div>
              );
            })
          }
        </div>
      </div>

      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="ISO standard image preview"
          className={`fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-5 transition-opacity duration-200 ease-out ${isPreviewVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
          onClick={closePreview}
        >
          <div
            className={`relative h-[80vh] w-[50vw] cursor-zoom-out transition-transform duration-200 ease-out ${isPreviewVisible ? "scale-100" : "scale-95"}`}
            onClick={(event) => {
              event.stopPropagation();
              closePreview();
            }}
          >
            <Image
              fill
              src={previewImage}
              alt="ISO standard image preview"
              sizes="50vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )

}
