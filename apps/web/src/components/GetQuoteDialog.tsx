"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { FormGetQuote } from "./FormGetQuote";

type GetQuoteDialogContextValue = {
  open: () => void;
};

const GetQuoteDialogContext = createContext<GetQuoteDialogContextValue | null>(null);

export function GetQuoteDialogProvider({ children, siteData }: { children: ReactNode; siteData: CmpProps["siteData"] }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <GetQuoteDialogContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-5"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Get a free quote"
            className="relative w-full xl:w-210"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close quote form"
              className="absolute -right-9.5 -top-8 z-10 flex size-10 items-center justify-center rounded-full text-2xl leading-none text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span aria-hidden="true" className="text-4xl text-white">&times;</span>
            </button>
            <div className="max-h-[calc(100vh-5rem)] overflow-y-auto">
              <FormGetQuote siteData={siteData} onSuccess={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </GetQuoteDialogContext.Provider>
  );
}

export function useGetQuoteDialog() {
  const context = useContext(GetQuoteDialogContext);

  if (!context) {
    throw new Error("useGetQuoteDialog must be used within GetQuoteDialogProvider");
  }

  return context;
}
