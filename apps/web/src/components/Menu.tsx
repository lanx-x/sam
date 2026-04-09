'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Assets } from "@/assets";
import { localizePath, type Locale, type Messages } from "@/i18n";

const menuGroups = [
  {
    titleKey: "capabilities",
    items: [
      {
        labelKey: "cncMachining",
        link: "/capabilities/cnc-machining",
      },
      {
        labelKey: "sheetMetalFabrication",
        link: "/capabilities/sheet-metal-fabrication",
      },
      {
        labelKey: "capabilityExtra",
        link: "/capabilities/sheet-metal-fabrication",
      },
    ],
  },
  {
    titleKey: "solutions",
    items: [
      {
        labelKey: "solution1",
        link: "/solutions/amet-cum-voluptates-sit-voluptatem",
      },
      {
        labelKey: "solution2",
        link: "/solutions/amet-cum-voluptates-sit-voluptatem",
      },
      {
        labelKey: "solution3",
        link: "/solutions/amet-cum-voluptates-sit-voluptatem",
      },
      {
        labelKey: "solution4",
        link: "/solutions/amet-cum-voluptates-sit-voluptatem",
      },
    ],
  },
  {
    titleKey: "stamping",
    items: [
      {
        labelKey: "stamping1",
        link: "/stamping/amet-cum-voluptates-sit-voluptatem",
      },
      {
        labelKey: "stamping2",
        link: "/stamping/amet-cum-voluptates-sit-voluptatem",
      },
      {
        labelKey: "stamping3",
        link: "/stamping/amet-cum-voluptates-sit-voluptatem",
      },
      {
        labelKey: "stamping4",
        link: "/stamping/amet-cum-voluptates-sit-voluptatem",
      },
    ],
  },
] as const;

const standaloneItems = [
  {
    labelKey: "about",
    link: "/about",
  },
] as const;

type MenuProps = {
  locale: Locale;
  menu: Messages["menu"];
};

export function Menu({ locale, menu }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const measurePanelTop = () => {
    if (!buttonRef.current) {
      return;
    }

    const navRoot = buttonRef.current.closest("[data-nav-root]");
    const { bottom } = (navRoot ?? buttonRef.current).getBoundingClientRect();
    setPanelTop(bottom);
  };

  useEffect(() => {
    window.addEventListener("resize", measurePanelTop);

    return () => {
      window.removeEventListener("resize", measurePanelTop);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [isOpen]);

  const handleNavigate = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!isOpen) {
      measurePanelTop();
    }

    setIsOpen((current) => !current);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={handleToggle}
      >
        <Image src={isOpen ? Assets.Close : Assets.Menu} alt="" />
      </button>

      <div
        className={`fixed left-0 z-50 w-full overflow-hidden border-t border-[#efefef] bg-white shadow-[0_8px_24px_0_rgba(0,0,0,0.08)] transition-all duration-300 ease-out ${isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}
        style={{
          top: panelTop,
          height: `calc(100dvh - ${panelTop}px)`,
        }}
      >
        <div className="h-full overflow-y-auto px-5 py-5">
          <div className="grid gap-10">
            {menuGroups.map((group, index) => (
              <div
                key={index}
                className={`transition-all duration-300 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                style={{ transitionDelay: isOpen ? `${index * 60}ms` : "0ms" }}
              >
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-secondary">
                  {menu.groups[group.titleKey]}
                </p>
                <div className="grid gap-4">
                  {group.items.map((item, idx) => (
                    <Link
                      key={idx}
                      href={localizePath(locale, item.link)}
                      className="text-2xl font-semibold leading-none"
                      onClick={handleNavigate}
                    >
                      {menu.items[item.labelKey]}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div
              className={`grid gap-4 transition-all duration-300 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
              style={{ transitionDelay: isOpen ? `${menuGroups.length * 60}ms` : "0ms" }}
            >
              {standaloneItems.map((item) => (
                <Link
                  key={item.link}
                  href={localizePath(locale, item.link)}
                  className="text-2xl font-semibold leading-none"
                  onClick={handleNavigate}
                >
                  {menu.items[item.labelKey]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
