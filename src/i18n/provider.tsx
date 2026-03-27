"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./config";
import type { Messages } from "./dictionaries";

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: Locale;
  messages: Messages;
}) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

function useI18nContext() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("i18n hooks must be used within I18nProvider");
  }

  return context;
}

export function useI18n() {
  return useI18nContext();
}

export function useLocale() {
  return useI18nContext().locale;
}

export function useMessages() {
  return useI18nContext().messages;
}

export function useTranslations<K extends keyof Messages>(namespace: K): Messages[K] {
  return useI18nContext().messages[namespace];
}
