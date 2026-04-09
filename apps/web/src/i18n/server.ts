import "server-only";

import { cache } from "react";
import { globalApi } from "@/api";
import { getDefaultLocale, getLocale, type LocaleItem } from "./config";

export const getLocaleList = cache(async (): Promise<LocaleItem[]> => {
  return globalApi.getI18nLocales();
});

export const getRuntimeLocale = cache(async (routeLocale: string) => {
  const localeList = await getLocaleList();
  const defaultLocale = getDefaultLocale(localeList);
  const locale = getLocale(routeLocale, localeList);

  return {
    locale,
    localeList,
    defaultLocale,
  };
});
