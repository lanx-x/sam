"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Assets } from "@/assets";
import { cn } from "@/utils/cn";
import { localizePath, stripLocaleFromPath, type Locale, type LocaleItem } from "@/i18n";
import type { Broadcast as BroadcastType, Site } from "cms-types";

export function Broadcast(props: { currentLocale: Locale; defaultLocale: Locale; data: BroadcastType[]; siteData: Site; localeList: LocaleItem[] }) {
  const { currentLocale, defaultLocale, data: items, siteData, localeList } = props;
  const email = siteData.email?.[0]?.value;
  const pathname = usePathname();
  const router = useRouter();
  const currentLocaleOption = localeList.find((locale) => locale.code === currentLocale) ?? localeList[0];

  const [localeOpen, setLocaleOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const localeRef = useRef<HTMLDivElement>(null);

  // Popup
  const [popup, setPopup] = useState<BroadcastType | null>(null);

  const handleClick = useCallback(
    (item: BroadcastType) => {
      if (item.type === "popup") {
        setPopup(item);
      } else if (item.url) {
        window.open(item.url, "_blank", "noopener,noreferrer");
      }
    },
    [],
  );

  // Locale dropdown close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!localeRef.current?.contains(e.target as Node)) setLocaleOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLocaleChange = useCallback(
    (targetLocale: Locale) => {
      if (targetLocale === currentLocale) {
        setLocaleOpen(false);
        return;
      }
      const basePath = stripLocaleFromPath(pathname, localeList);
      const newPath = localizePath(targetLocale, basePath || "/");
      router.push(newPath);
      setLocaleOpen(false);
    },
    [currentLocale, defaultLocale, localeList, pathname, router],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      axis: "y",
      active: true,
      loop: items.length > 1,
    },
    [
      Autoplay({
        active: true,
        defaultInteraction: false,
      })
    ]
  );

  useEffect(() => {
    if (!emblaApi || items.length <= 1) return;
    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;

    autoplay.play()
  }, [emblaApi]);

  if (!items.length) return null;

  return (
    <>
      <div className="relative z-50 bg-[#fafafa]">
        <div className="flex flex-col py-4 xl:py-0 xl:flex-row xl:items-center px-5 xl:px-0 xl:w-7xl xl:mx-auto xl:h-10">
          {/* Broadcast carousel */}
          <div className="pr-20 mb-1 xl:mb-0 xl:max-w-230 flex xl:flex-row items-center w-full overflow-hidden">
            <Image className="w-4 h-4 mr-2 shrink-0" src={Assets.Broadcast} alt="broadcast" width={20} height={20} />
            <div className="flex-1 h-5 overflow-hidden" ref={emblaRef}>
              <div className="flex h-full flex-col">
                {items.map((item) => (
                  <div key={item.documentId} className="min-w-0 shrink-0 basis-full flex items-center">
                    <button
                      type="button"
                      className="truncate text-left w-full"
                      onClick={() => handleClick(item)}
                    >
                      {item.content}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row  xl:ml-auto">
            {email && (
              <div className="flex flex-row items-center">
                <Image className="w-4 h-4 mr-2" src={Assets.Mail} alt="mail" width={20} height={20} />
                <a href={`mailto:${email}`} className="hover:text-accent transition-colors">{email}</a>
              </div>
            )}

            <div
              className="relative xl:ml-12.5 ml-auto"
              ref={localeRef}
              onMouseEnter={() => { clearTimeout(closeTimer.current ?? 0); setLocaleOpen(true) }}
              onMouseLeave={() => { closeTimer.current = setTimeout(() => setLocaleOpen(false), 150) }}
            >
              <button
                type="button"
                className="flex flex-row items-center"
                onClick={() => setLocaleOpen((c) => !c)}
              >
                <Image className="w-4 h-4 mr-1" src={Assets.Locale} alt="locale" />
                <span>{currentLocaleOption?.name ?? currentLocale}</span>
                <svg className="w-3 h-3 ml-1" viewBox="0 0 12 12" fill="currentColor"><polygon points="2,4 6,8 10,4" /></svg>
              </button>

              <div
                className={cn(
                  "absolute right-0 top-full z-20 pt-2 transition-all duration-150",
                  localeOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                )}
              >
                <div className="min-w-28 overflow-hidden rounded-md border border-[#efefef] bg-white shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]">
                  {/* 暂时只显示en */}
                  {localeList.filter(xs => xs.code === 'en').map((locale) => (
                    <button
                      key={locale.code}
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-[#fafafa]",
                        locale.code === currentLocale && "text-accent"
                      )}
                      onClick={() => handleLocaleChange(locale.code)}
                    >
                      <span>{locale.name}</span>
                      {locale.code === currentLocale && <span className="text-xs">&#10003;</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup overlay */}
      {popup && (
        <div
          className="fixed inset-0 z-99 flex items-center justify-center bg-black/50"
          onClick={() => setPopup(null)}
        >
          <div
            className="relative mx-5 max-w-lg w-full rounded-lg bg-white p-8 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-4 right-4"
              onClick={() => setPopup(null)}
            >
              <Image src={Assets.Close} alt="close" />
            </button>
            <p className="text-base leading-relaxed text-primary whitespace-pre-wrap">{popup.content}</p>
          </div>
        </div>
      )}
    </>
  );
}
