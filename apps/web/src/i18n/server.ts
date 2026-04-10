import "server-only";

import { cache } from "react";
import { notFound } from "next/navigation";
import { globalApi } from "@/api";
import { getDefaultLocale, isLocale, getLocale, type LocaleItem } from "./config";

export const getLocaleList = async (): Promise<LocaleItem[]> => {
  return globalApi.getI18nLocales();
};

export const getRuntimeLocale = cache(async (routeLocale: string) => {
  const localeList = await getLocaleList();

  if (!isLocale(routeLocale, localeList)) {
    notFound();
  }

  const defaultLocale = getDefaultLocale(localeList);
  const locale = getLocale(routeLocale, localeList);

  return {
    locale,
    localeList,
    defaultLocale,
  };
});
