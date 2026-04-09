"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Assets } from "@/assets";
import { useLocale } from "@/i18n";
import type { Broadcast as BroadcastType, Site } from "cms-types";

const languages = [
  { code: "EN", label: "English" },
  { code: "中文", label: "中文" },
] as const;

type Language = (typeof languages)[number];

function matchLang(locale: string) {
  return languages.find((l) => l.code.toLowerCase() === locale) ?? languages[0];
}

export function Broadcast(props: { data: BroadcastType[]; site: Site }) {
  const { data: items, site } = props;
  const email = site.email?.[0]?.value;
  const locale = useLocale();

  const [activeLanguage, setActiveLanguage] = useState<Language>(matchLang(locale));
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

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

  // Language dropdown close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
      <div className="bg-[#fafafa]">
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

            <div className="relative xl:ml-12.5 ml-auto" ref={langRef}>
              <button
                type="button"
                className="flex flex-row items-center"
                onClick={() => setLangOpen((c) => !c)}
              >
                <Image className="w-4 h-4 mr-1" src={Assets.Lang} alt="lang" />
                <span>{activeLanguage.code}</span>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 min-w-28 overflow-hidden rounded-md border border-[#efefef] bg-white shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-[#fafafa]"
                      onClick={() => {
                        setActiveLanguage(lang);
                        setLangOpen(false);
                      }}
                    >
                      <span>{lang.label}</span>
                      {lang.code === activeLanguage.code && <span>{lang.code}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popup overlay */}
      {popup && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
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
