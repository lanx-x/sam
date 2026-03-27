"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Assets } from "@/assets";

const languages = [
  {
    code: "EN",
    label: "English",
    message: "Broadcast notification message content for all CNC machining updates and support notices.",
  },
  {
    code: "中文",
    label: "中文",
    message: "用于展示数控加工服务更新、通知公告以及售后支持信息的广播内容。",
  },
] as const;

type Language = (typeof languages)[number];

export function Broadcast() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<Language>(languages[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="bg-[#fafafa]">
      <div className="flex flex-col px-5 py-4.5 lg:w-320 lg:mx-auto lg:flex-row">
        <div className="flex flex-row items-center lg:flex-1">
          <Image
            className="w-4 h-4 mr-2"
            src={Assets.Broadcast}
            alt="broadcast"
            width={20}
            height={20}
          />
          <span className="truncate">{activeLanguage.message}</span>
        </div>

        <div className="flex flex-row items-center">
          <Image
            className="w-4 h-4 mr-2"
            src={Assets.Mail}
            alt="mail"
            width={20}
            height={20}
          />
          <span>elena@lwmetalmachining.com</span>

          <div className="relative ml-auto" ref={containerRef}>
            <button
              type="button"
              className="flex flex-row items-center"
              onClick={() => setIsOpen((current) => !current)}
            >
              <Image
                className="w-4 h-4 mr-1"
                src={Assets.Lang}
                alt="lang"
              />
              <span>{activeLanguage.code}</span>
            </button>

            {isOpen ? (
              <div className="absolute right-0 top-full z-20 mt-2 min-w-28 overflow-hidden rounded-md border border-[#efefef] bg-white shadow-[0_8px_24px_0_rgba(0,0,0,0.08)]">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-[#fafafa]"
                    onClick={() => {
                      setActiveLanguage(language);
                      setIsOpen(false);
                    }}
                  >
                    <span>{language.label}</span>
                    {language.code === activeLanguage.code ? <span>{language.code}</span> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
